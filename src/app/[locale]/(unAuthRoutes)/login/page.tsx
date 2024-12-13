"use server"
import AnimatePartials from '@/app/globals/components/animatePartials';
import en from './i18n/en';
import fr from './i18n/fr';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';



export default async function Home({ params }: { params: Promise<{ locale: string }>, searchParams: Promise<object> }) {
	const { locale: lang } = await params

	const locale = lang === 'fr' ? fr : en



	const onSubmit = async (data: FormData) => {
		"use server"
		console.log(data)
	}

	return (

		<AnimatePartials>
			<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] login-bg'>
				<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>

					<Card className="w-full max-w-sm">
						<CardHeader>
							{/* <CardTitle>{locale.title}</CardTitle> */}
							<CardDescription>{locale.title}</CardDescription>
						</CardHeader>
						<CardContent>

							<form action={onSubmit} className="w-2/3 space-y-6 w-full">
								<Label >
									<div className='mb-3'>Email</div>
									<Input type="email" name="email" className='mb-3 w-full' />
								</Label>
								<Label>
									<div className='mb-3 w-full'>Password</div>
									<Input type="password" name="Password" />
								</Label>

							</form>
						</CardContent>
						<CardFooter>
							<Button type="submit" className='w-full'>Login</Button>
						</CardFooter>
					</Card>
				</main>
			</div>
		</AnimatePartials >
	)
}




