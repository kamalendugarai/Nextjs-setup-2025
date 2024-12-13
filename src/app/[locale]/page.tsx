// import Image from 'next/image';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card"

import en from '@/app/[locale]/i18n/en';
import fr from '@/app/[locale]/i18n/fr';
import AnimatePartials from '@/app/globals/components/animatePartials';

import NextImage from '@/app/globals/components/nextImage';
import Link from 'next/link';

export default async function Home({ params }: { params: Promise<{ locale: string }>, searchParams: Promise<object> }) {

	const { locale: lang } = await params

	const locale = lang === 'fr' ? fr : en


	return (
		<AnimatePartials>
			<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
				<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
					<h1 className='text-4xl'>{locale.title}</h1>
					<Card className="w-full">
						<CardHeader>
							{/* <CardTitle>Card Title</CardTitle> */}
							<CardDescription>{locale.description}</CardDescription>
						</CardHeader>
						<CardContent className="items-center">
							<NextImage src='/next.svg' alt='Next.js logo' width={180} height={38} priority />
						</CardContent>
						<CardFooter>
							<p>{locale.cheerup}</p>
						</CardFooter>
					</Card>
				</main>
				<footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
					<Link href='/login' className='flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm'> <NextImage src='/globe.svg' alt='Globe icon' width={16} height={16} /> {locale.login}</Link>

				</footer>
			</div>
		</AnimatePartials >
	);
}
