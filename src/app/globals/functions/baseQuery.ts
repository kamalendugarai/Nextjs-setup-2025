'use server';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SignJWT, jwtVerify } from 'jose';
import { cookies, headers } from 'next/headers';
import { createServerActionProcedure } from 'zsa';
import z from 'zod';
// import { redirect } from 'next/navigation';

const encryptToken = async (token: string) => {
	try {
		const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
		const { exp } = jwtDecode(token);
		if (exp) {
			const jwt = await new SignJWT({ accessToken: token })
				.setProtectedHeader({ alg: 'HS256' })
				.setExpirationTime(exp?.toString())
				.sign(new TextEncoder().encode(secret.toString()));

			const cookieStore = await cookies();
			cookieStore.set('accessToken', jwt);
		}
	} catch (error) {
		console.log(error);
	}
};

const decryptToken = async (token: string) => {
	try {
		const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);
		return payload;
	} catch (error) {
		console.log(error);
	}
};

axios.interceptors.request.use(
	async (config) => {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get('accesstoken');
		if (accessToken) {
			let payload = decryptToken(accessToken.value);
			config.headers['Authorization'] = `Bearer ${payload}`;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Added response interceptor
axios.interceptors.response.use(
	(response) => {
		console.log({ response }, 'axios request interceptor');
		if (response.statusText.toLowerCase() === 'ok') {
			const { accessToken } = response.data;
			if (accessToken) {
				encryptToken(accessToken);
			}
		}
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

interface baseQueryProps {
	baseURL?: string;
	url: string;
	method?: string;
	data?: string;
	headers?: object;
	timeout?: number;
	signal?: AbortSignal;
}

export const baseQuery = async ({
	url,
	method = 'post',
	data,
	headers,
	timeout = 10000,
	signal
}: baseQueryProps) => {
	console.log(
		process.env.NEXT_APP_API_BASE_URL,
		'process.env.NEXT_APP_API_BASE_URL'
	);
	try {
		const response = axios({
			baseURL: process.env.NEXT_APP_API_BASE_URL,
			url,
			method,
			data,
			headers,
			timeout,
			responseType: 'json',
			signal,
			transformRequest: [
				(data, headers) => {
					return data;
				}
			]
		});

		return response;
	} catch (e) {
		console.log(e);
	}
};

const authedProcedure = createServerActionProcedure().handler(async () => {
	const cookieStore = await cookies();
	try {
		const accessToken = cookieStore.get('accessToken');
		return {
			accessToken: 'Bearer ' + accessToken?.value
		};
	} catch {
		throw new Error('Access Token Not Fount!');
	}
});

/**
 *
 * Need to handle 400 and 401 error optionally global error handling though one can opt out of it
 *
 */

export const query = authedProcedure
	.createServerAction()
	.input(z.object({ url: z.string(), data: z.record(z.any()) }))
	.handler(async ({ input, ctx }) => {
		const { accessToken } = ctx;
		console.log(accessToken, 'accessToken from ');
		try {
			const response = await baseQuery({
				url: input.url,
				data: JSON.stringify(input.data),
				method: 'get'
			});
			if (!response) {
				throw new Error('No response received');
			}
			const data = await response.data;
			return data;
		} catch (error) {
			return {
				message: `Login failed due to ${error}`
			};
		}
	});
