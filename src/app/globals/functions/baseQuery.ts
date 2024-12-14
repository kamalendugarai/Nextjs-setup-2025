import axios from 'axios';

axios.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		console.log({ config }, 'axios request interceptor');
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	(response) => {
		console.log({ response }, 'axios request interceptor');
		if (response.statusText.toLowerCase() === 'ok') {
			console.log('')
		}
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
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
	data?: any;
	headers?: object;
	timeout?: number;
	signal?: AbortSignal;
}

const baseQuery = async ({
	url,
	method = 'post',
	data,
	headers,
	timeout = 10000,
	signal
}: baseQueryProps) => {
	try {
		const response = axios({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
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

export default baseQuery;
