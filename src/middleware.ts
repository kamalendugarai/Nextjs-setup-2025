import i18nConfig from '../i18nConfig';
import { i18nRouter } from 'next-i18n-router';
import { NextRequest, NextResponse } from 'next/server';

/**
 * The middleware function that handles incoming requests for the Next.js application.
 * It checks the request path to exclude certain routes, such as API routes, static files, and the favicon.
 * If the request locale is the default, it redirects the user to the appropriate locale-specific URL.
 * It also generates a nonce value and sets the Content-Security-Policy header to enhance the application's security.
 *
 * @param request - The incoming Next.js request object.
 * @returns A modified response object with the necessary security headers.
 */
const PUBLIC_FILE = /\.(.*)$/;
export function middleware(request: NextRequest) {
	const authRoutes = process.env.AUTHROUTES?.split(',') || [];
	const unAuthRoutes = process.env.UNAUTHROUTES?.split(',') || [];
	const genericRoutes = process.env.GENERICROUTES?.split(',') || [];
	const localRouter = i18nRouter(request, i18nConfig);
	const currentLocale = localRouter.headers.get('x-next-i18n-router-locale');

	if (
		request.nextUrl.pathname.startsWith('/_next') ||
		request.nextUrl.pathname.includes('/api/') ||
		PUBLIC_FILE.test(request.nextUrl.pathname)
	) {
		return;
	}

	const requestedRoute = request.nextUrl.pathname
		.replace(`/${currentLocale}`, '')
		.split('/')[1];

	/**
	 * Logic to access routes.
	 * Auth routes are only accessible to logged in users.
	 * UnAuth routes are only accessible to users that are not logged in.
	 * Generic routes are accessible to all users.
	 */

	const loggedIn = false;

	if (requestedRoute) {
		if (loggedIn) {
			if (
				authRoutes.includes(requestedRoute) === false &&
				genericRoutes.includes(requestedRoute) === false &&
				requestedRoute.includes('not-found') === false
			) {
				return NextResponse.redirect(new URL('/not-found', request.url));
			}
		} else {
			if (
				unAuthRoutes.includes(requestedRoute) === false &&
				genericRoutes.includes(requestedRoute) === false &&
				requestedRoute.includes('not-found') === false
			) {
				return NextResponse.redirect(new URL('/not-found', request.url));
			}
		}
	} else {
		/**
		 * This is the case for root route (http://localhost:3000), with or without any locale.
		 * If there is an locale set earlier then that is what is going to be used otherwise
		 * 'en' set to be default locale.
		 */
		const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
		if (loggedIn) {
			/**
			 * Route route is not accessible for logged in users, I have redirected it to the not-found page.
			 * One should redirect it to the default after login page.
			 */
			return NextResponse.redirect(
				new URL(
					`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
					request.url
				)
			);
		}
	}

	// Create a nonce for CSP, nonce should be different for each request
	// const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
	// // script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline';
	// // style-src 'self' 'nonce-${nonce}' 'unsafe-inline' ;
	// const cspHeader = `
	// 	default-src 'self';
	// 	script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline';
	// 	style-src 'self' 'nonce-${nonce}' 'unsafe-inline' ;
	// 	img-src 'self' blob: data:;
	// 	font-src 'self';
	// 	object-src 'none';
	// 	base-uri 'self';
	// 	form-action 'self';
	// 	frame-ancestors 'none';
	// 	upgrade-insecure-requests;
	// `;
	// // Replace newline characters and spaces
	// const contentSecurityPolicyHeaderValue = cspHeader
	// 	.replace(/\s{2,}/g, ' ')
	// 	.trim();

	// localRouter.headers.set('x-nonce', nonce);
	// localRouter.headers.set(
	// 	'Content-Security-Policy',
	// 	contentSecurityPolicyHeaderValue
	// );

	return localRouter;
}

/**
 * This configuration object defines the middleware matcher for the Next.js application.
 * It specifies a set of request paths that should be matched, excluding certain paths such as
 * API routes, static files, image optimization files, and the favicon. The `missing` property
 * defines the required headers for the matched requests, in this case `next-router-prefetch` and `purpose=prefetch`.
 *
 * **************************************************************************************************************************
 * THIS SETTING IS BEHAVING AS A BUG WHEN I AM TRYING TO USE IT WITH I18N THEN APPLICATION ROUTER IS NOT WORKING AS EXPECTED.
 * **************************************************************************************************************************
 */
// export const config = {
// 	matcher: [
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - api (API routes)
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico (favicon file)
// 		 */
// 		{
// 			source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
// 			missing: [
// 				{ type: 'header', key: 'next-router-prefetch' },
// 				{ type: 'header', key: 'purpose', value: 'prefetch' }
// 			]
// 		}
// 	]
// };
