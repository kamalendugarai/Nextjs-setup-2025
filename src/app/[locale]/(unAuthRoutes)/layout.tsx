// import { Suspense } from "react";
// import { Triangle } from 'react-loader-spinner'

export default function UnAuthLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		/**
		 * The Suspense is not required here and is not recommended to use globally.
		 * You should not wrap any part which required instantly. Suspense only make sense to
		 * handle the loading state of the component which is less important.
		 */
		// <Suspense fallback={
		// 	<div className="flex items-center justify-center h-screen w-screen"><span className="loader" /></div>
		// }>
		<>{children}</>
		// </Suspense>
	);
}
