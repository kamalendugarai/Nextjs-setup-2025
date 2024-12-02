import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '../i18nConfig';

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
	if (
		request.nextUrl.pathname.startsWith('/_next') ||
		request.nextUrl.pathname.includes('/api/') ||
		PUBLIC_FILE.test(request.nextUrl.pathname)
	) {
		return;
	}

	if (request.nextUrl.locale === 'default') {
		const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';

		return NextResponse.redirect(
			new URL(
				`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
				request.url
			)
		);
	}

	const modifedResponse = i18nRouter(request, i18nConfig);

	// Create a nonce for CSP
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
	// script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline';
	// style-src 'self' 'nonce-${nonce}' 'unsafe-inline' ;
	const cspHeader = `
		default-src 'self';
		script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline';
		style-src 'self' 'nonce-${nonce}' 'unsafe-inline' ;
		img-src 'self' blob: data:;
		font-src 'self';
		object-src 'none';
		base-uri 'self';
		form-action 'self';
		frame-ancestors 'none';
		upgrade-insecure-requests;
	`;
	// Replace newline characters and spaces
	const contentSecurityPolicyHeaderValue = cspHeader
		.replace(/\s{2,}/g, ' ')
		.trim();

	// modifedResponse.headers.set('x-nonce', nonce);
	// modifedResponse.headers.set(
	// 	'Content-Security-Policy',
	// 	contentSecurityPolicyHeaderValue
	// );

	return modifedResponse;
}

/**
 * This configuration object defines the middleware matcher for the Next.js application.
 * It specifies a set of request paths that should be matched, excluding certain paths such as
 * API routes, static files, image optimization files, and the favicon. The `missing` property
 * defines the required headers for the matched requests, in this case `next-router-prefetch` and `purpose=prefetch`.
 */
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' }
			]
		}
	]
};
