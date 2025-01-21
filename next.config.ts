import withPlaiceholder from '@plaiceholder/next';
import { readdirSync } from 'fs';
import type { NextConfig } from 'next';

/**
 * @type {import('next').NextConfig}
 */
const authRoutes: string[] = [];
const unAuthRoutes: string[] = [];
const genericRoutes: string[] = [];

const getDirectories = (source: string, holder: string[] = []) => {
	const files = readdirSync(source, { withFileTypes: true, recursive: false });
	files.forEach((file) => {
		if (file.isDirectory()) {
			holder.push(file.name);
			/**
			 * This is needed to recursively get all sub directories.
			 * In our case we do not need this because we are not using
			 * any sub directories. The scope is there to use if needed
			 * in the future.
			 * */
			// getDirectories(`${source}/${file.name}`, holder);
		}
	});
	return holder;
};

getDirectories('./src/app/[locale]/(authRoutes)', authRoutes);
getDirectories('./src/app/[locale]/(unAuthRoutes)/', unAuthRoutes);
getDirectories('./src/app/[locale]/(genericRoutes)', genericRoutes);

const nextConfig: NextConfig = {
	assetPrefix: '/',

	/* config options here */
	/**
	 * You need to change base path in middleware.ts
	 * file to match the base path set here
	 */
	basePath: '',
	// set the compress option to false to allow nginx to handle compression
	compress: false,
	// output: 'export', // 'standalone',
	crossOrigin: 'anonymous',
	cleanDistDir: true,
	distDir: 'build',
	devIndicators: {
		appIsrStatus: true,
		buildActivity: true,
		buildActivityPosition: 'bottom-right'
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		// Should read https://nextjs.org/docs/pages/api-reference/components/image#minimumcachettl
		minimumCacheTTL: 60
	},
	env: {
		// Cookies are always encrypted, this settings is for localStorage and sessionStorage
		ENCRYPTSTORAGE: 'true',
		AUTHROUTES: `${authRoutes.toString()}`,
		UNAUTHROUTES: `${unAuthRoutes.toString()}`,
		GENERICROUTES: `${genericRoutes.toString()}`
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: false
	},
	generateBuildId: async () => {
		// This could be anything, using the latest git hash
		return process.env.GIT_HASH ?? null;
	},
	generateEtags: true,
	logging: {
		fetches: {
			hmrRefreshes: true
		}
	},
	experimental: {
		webVitalsAttribution: ['CLS', 'LCP'],
		optimizePackageImports: [
			'date-fns',
			'lucide-react',
			'react-icons/*',
			'react-use',
			'lodash-es'
		],
		serverActions: {
			allowedOrigins: [
				process.env.NEXT_APP_API_BASE_URL
					? process.env.NEXT_APP_API_BASE_URL
					: ''
			]
		}
	},
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/nl/with-locale-manual',
				destination: '/nl/another',
				locale: false
			}
		];
	}
	/**
	 * This is needed only for react-pdf package
	 */
	// webpack: (config) => {
	// 	config.resolve.alias.canvas = false;
	// 	return config;
	// }
	// i18n: {
	// 	locales: ['en', 'es', 'fr', 'nl'],
	// 	defaultLocale: 'en',
	// 	// http://surl.li/frxqww
	// 	// http://surl.li/nbojgy
	// 	localeDetection: false
	// }
};
export default withPlaiceholder(nextConfig);
