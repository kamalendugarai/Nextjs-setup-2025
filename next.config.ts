import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	basePath: '',
	// set the compress option to false to allow nginx to handle compression
	compress: false,
	output: 'standalone',
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
};
export default nextConfig;
