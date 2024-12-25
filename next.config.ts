import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {

	experimental: {
		serverActions: {
			bodySizeLimit: '2mb',
		},
	},
	// reactStrictMode: true,
	// // Enable the React DevTools profiler
	// profiler: true,
	// reactStrictMode: true,
	modularizeImports: {
		'react-icons': {
			transform: 'react-icons/{{member}}',
		},
	},
	bundlePagesRouterDependencies: true,
	transpilePackages: ['lucide-react'],// add this
	images: {
        remotePatterns: [
            { protocol: "http", hostname: 'localhost', },
            { protocol: "https", hostname: 'dummyimage.com' },
        ],
	},
}

export default nextConfig;
