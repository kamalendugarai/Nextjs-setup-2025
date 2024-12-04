import type { NextConfig } from 'next';
import withPlaiceholder from '@plaiceholder/next';
/**
 * @type {import('next').NextConfig}
 */

const nextConfig: NextConfig = {
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
		customKey: 'my-value'
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
		]
	},
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	reactStrictMode: true
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
