import type { Metadata } from 'next';
import { ThemeModeScript } from 'flowbite-react';
import NeonCursor from '@/app/[locale]/utils/cursor';
import localFont from 'next/font/local';
import './[locale]/globals.css';



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
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<head>
				<ThemeModeScript />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
				<NeonCursor />
			</body>
		</html>
	);
}
