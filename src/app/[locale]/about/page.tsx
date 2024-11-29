export default async function Home({ params, searchParams }: { params: Promise<object> | undefined, searchParams: Promise<object> | undefined }) {
	console.log(await params)
	console.log(await searchParams)

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>

				<h1 className='text-4xl font-bold'>About Page</h1>
			</main>
		</div>
	);
}
