import * as React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Alegreya } from 'next/font/google';

const alegreya = Alegreya({
	subsets: ['latin'],
	display: 'swap',
	weight: '600'
});

const NotFound = () => {
	return (
		<main className='items-center justify-center flex min-h-screen'>
			<Card className='max-w-[600px] flex-1 items-center text-center rounded-xl mb-2'>
				<CardHeader>
					<CardTitle>
						<h1 className={`text-[30rem] color ${alegreya.className}`}>404</h1>
					</CardTitle>
					<CardDescription className='text-2xl'>
						The content you are looking for does not exist.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'></div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'></CardFooter>
			</Card>
		</main>
	);
};

export default NotFound;
