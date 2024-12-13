import AnimatePartials from '@/app/globals/components/animatePartials';
import en from './i18n/en';
import fr from './i18n/fr';
import Link from 'next/link';

export default async function Home({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<object> | undefined }) {
	const { locale: lang } = await params

	const locale = lang === 'fr' ? fr : en

	// console.log({ locale })
	// console.log({ searchParams })
	return (
		<AnimatePartials>
			<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
				<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>

					<h1 className='text-4xl font-bold'>{locale.title}</h1>
					<Link href='/contact' className='text-xl underline'>Go to Contact Page</Link>
				</main>
			</div>
		</AnimatePartials >
	);
}
