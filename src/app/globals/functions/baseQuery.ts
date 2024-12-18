'use server';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { createServerActionProcedure } from 'zsa';
import z from 'zod';
import show from './console';

import { redirect } from 'next/navigation';

interface baseQueryProps {
	baseURL?: string;
	url: string;
	method?: string;
	data?: string;
	headers?: object;
	timeout?: number;
	signal?: AbortSignal;
	preQuery?: () => void;
}

let autoLogout: NodeJS.Timeout;
/**
 * Encrypts an access token and stores it in a cookie.
 *
 * This function is responsible for encrypting an access token,
 * setting an expiration time, and storing the encrypted token in a cookie.
 * It also sets up an auto-logout mechanism that will delete the access token cookie
 * and redirect the user to the login page when the token expires.
 *
 * @param token - The access token to be encrypted and stored.
 */
const encryptToken = async (token: string) => {
	try {
		if (token) {
			const secret = new TextEncoder().encode(
				process.env.NEXT_PUBLIC_JWT_SECRET
			);
			const { iat, exp } = jwtDecode(token);
			const cookieStore = await cookies();
			if (exp) {
				if (autoLogout) {
					clearTimeout(autoLogout);
				}
				autoLogout = setTimeout(
					() => {
						cookieStore.delete('accessToken');
						redirect('/login');
					},
					Math.min(((exp as number) - (iat as number)) / 1000)
				);

				const jwt = await new SignJWT({ accessToken: token })
					.setProtectedHeader({ alg: 'HS256' })
					.setExpirationTime(exp?.toString())
					.sign(new TextEncoder().encode(secret.toString()));

				cookieStore.set('accesstoken', jwt, {
					httpOnly: true,
					sameSite: 'strict',
					/**
					 * When a cookie expires, the browser stops sending the cookie
					 * to the server and usually deletes it.
					 *
					 * *** THIS IS NOT A SESSION COOKIE ***
					 *
					 * Session cookies are removed when the client shuts down.
					 * Cookies are session cookies if they do not specify the Expires
					 * or Max-Age attribute.
					 *
					 * Permanent cookies are removed at a specific date (Expires)
					 * or after a specific length of time (Max-Age) and not when the
					 * client is closed.
					 **/
					expires: new Date(exp * 1000),
					secure: process.env.NODE_ENV === 'production'
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};
/**
 * Decrypts a JWT token using the application's secret key.
 *
 * @param token - The JWT token to decrypt.
 * @returns The decrypted payload of the JWT token.
 */
const decryptToken = async (token: string) => {
	try {
		const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);
		return payload;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Adds an interceptor to the Axios request pipeline that attaches the user's
 * access token to the request headers.
 *
 * If an access token is present in the cookie store, it is decrypted
 * and added to the 'Authorization' header of the request.
 * This ensures that authenticated requests include the necessary authorization credentials.
 *
 * The interceptor also handles any errors that occur during the request,
 * rejecting the promise with the error.
 */
axios.interceptors.request.use(
	async (config) => {
		const cookieStore = await cookies();
		config.headers.set({ 'Content-Type': 'application/json' });
		const accessToken = cookieStore.get('accesstoken');
		if (accessToken) {
			const payload = decryptToken(accessToken.value);
			// config.headers['Authorization'] = `Bearer ${payload}`;
			config.headers.set({ Authorization: `Bearer ${payload}` });
		} else {
			show.log('Access Token Not Found! *** redirecting to login page');
			redirect('/login');
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

/**
 * Adds an interceptor to the Axios response pipeline that handles the response
 * from the server.
 *
 * If the response status is 'OK', it checks if an access token is present in the
 * response data and encrypts it using the application's secret key.
 *
 * If the response status is 401 (Unauthorized), it deletes the access token from
 * the cookie store and redirects the user to the login page.
 *
 * The interceptor also handles any errors that occur during the response,
 * rejecting the promise with the error.
 */
axios.interceptors.response.use(
	async (response) => {
		const cookieStore = await cookies();
		if (response.statusText.toLowerCase() === 'ok') {
			const { accessToken } = response.data;
			if (accessToken) {
				encryptToken(accessToken);
			}
		} else if (response.status === 401) {
			cookieStore.delete('accessToken');
			redirect('/login');
		}
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

/**
 * Performs a base query using the Axios library.
 *
 * @param {object} props - The properties for the base query.
 * @param {string} props.url - The URL for the API endpoint.
 * @param {string} [props.method='post'] - The HTTP method to use for the request.
 * @param {object} [props.data] - The data to send in the request body.
 * @param {object} [props.headers] - The headers to include in the request.
 * @param {number} [props.timeout=10000] - The timeout for the request in milliseconds.
 * @param {AbortSignal} [props.signal] - An AbortSignal to cancel the request.
 * @returns {Promise<AxiosResponse>} - The response from the API.
 */
export const baseQuery = async ({
	url,
	method = 'post',
	data,
	headers,
	timeout = 10000,
	signal
}: baseQueryProps) => {
	try {
		const response = await axios({
			baseURL: process.env.NEXT_APP_API_BASE_URL,
			url,
			method,
			data,
			headers,
			timeout,
			responseType: 'json',
			signal,
			transformRequest: [
				(data) => {
					return data;
				}
			],
			transformResponse: [
				(data) => {
					return data;
				}
			]
		});

		return response;
	} catch (e) {
		console.log(e);
		throw e;
	}
};
/**
 * authedProcedure is a server action procedure that runs just before the server action.
 * You can do important tasks which should run before the server action, In our case,
 * we are getting the access token from the cookie store and returning it as a Bearer token.
 * This is just an EXAMPLE. You can do whatever you want to do here.
 *
 * This is a static method.
 *
 * @returns {Promise<{ accessToken: string }>} - The access token wrapped in a Bearer token.
 * @throws {Error} - If the access token is not found in the cookie store.
 */
const authedProcedure = createServerActionProcedure().handler(async () => {
	const cookieStore = await cookies();
	try {
		const accessToken = cookieStore.get('accessToken');
		if (!accessToken) {
			show.log('Access Token Not Found!');
			// redirect('/login');
		}
	} catch (error: unknown) {
		console.log(error);

		// throw new Error('There is an erro!');
	}
});

export const Query = authedProcedure
	.createServerAction()
	.input(
		z.object({
			url: z.string(),
			data: z.record(z.any())
		})
	)
	.handler(async ({ input, ctx }) => {
		// const { accessToken } = ctx;
		show.log(ctx, 'This is coming from authProcedure');
		try {
			const response = await baseQuery({
				url: input.url,
				data: JSON.stringify(input.data),
				method: 'get'
			});
			// if (!response) {
			// 	throw new Error('No response received');
			// }
			const data = await response?.data;
			return data;
		} catch (error) {
			return {
				message: `Login failed due to ${error}`
			};
		}
	});
