import type {NextConfig} from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {

	// experimental: {
	//   serverActions: true,
	// },
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
		domains: ["localhost", "dummyimage.com"]
	},
}

export default nextConfig;
