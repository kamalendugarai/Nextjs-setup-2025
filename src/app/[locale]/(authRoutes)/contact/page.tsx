import AnimatePartials from '@/app/globals/components/animatePartials';
import en from './i18n/en';
import fr from './i18n/fr';

export default async function Home({ params }: { params: Promise<{ locale: string }>, searchParams: Promise<object> }) {
	const { locale: lang } = await params

	const locale = lang === 'fr' ? fr : en

	// console.log({ locale })
	// console.log({ searchParams })
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>

				<h1 className='text-4xl font-bold'>{locale.title}</h1>
			</main>
		</div>
	);
}
