"use server"
// import AnimatePartials from '@/app/globals/components/animatePartials';
// import en from './i18n/en';
// import fr from './i18n/fr';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"




export default async function Home() {

    return (
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] login-bg'>
            <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>

                <Card className="w-full max-w-sm">
                    <CardHeader>
                        {/* <CardTitle>{locale.title}</CardTitle> */}
                        <CardDescription>
                            <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />



                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}




