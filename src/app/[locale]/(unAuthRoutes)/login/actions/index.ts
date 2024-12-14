'use server';
import { createServerActionProcedure } from 'zsa';
import baseQuery from '@/app/globals/functions/baseQuery';
import z from 'zod';
import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

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

export const login = authedProcedure
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
