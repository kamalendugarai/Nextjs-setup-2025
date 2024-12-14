import { Suspense } from "react";
import { Triangle } from 'react-loader-spinner'


export default function UnAuthLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// <Suspense fallback={
		// 	<div className="flex items-center justify-center h-screen w-screen"><span className="loader" /></div>
		// }>
		<>
			{children}
		</>
		// </Suspense>

	);
}

/* HTML: <div class="loader"></div> */
