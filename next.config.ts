import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from 'next';

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
export default withPayload(nextConfig);
