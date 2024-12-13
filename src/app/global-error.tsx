'use client'; // Error boundaries must be Client Components
import type { Metadata } from 'next';
// import { ThemeModeScript } from 'flowbite-react';
import localFont from 'next/font/local';
import '@/app/[locale]/globals.css';
import { useEffect } from 'react';

const geistSans = localFont({
	src: './[locale]/fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
});
const geistMono = localFont({
	src: './[locale]/fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
});

export const metadata: Metadata = {
	title: 'Error',
	description: 'This is a Global Error'
};

/**
 * This is a Global Error component that handles errors in the application.
 * If there are any unhandled errors, this component will get rendered.
 * https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-global-errors
 **/

export default function GlobalError({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.log(error);
	}, [error]);
	return (
		// global-error must include html and body tags
		<html>
			<head>
				{/* <ThemeModeScript /> */}
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
			</body>
		</html>
	);
}
