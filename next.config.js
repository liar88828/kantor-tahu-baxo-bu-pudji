/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: true,
    // optimizePackageImports: ['react-icons'],
  },

  // profiler: true,
  // reactStrictMode: true,
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  images: {
    domains: [ "localhost", "dummyimage.com", "picsum.photos" ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/img/**',
      },
    ],
  },

  // output: 'standalone',
  outputFileTracingExcludes: {
    '/_test__': [ './**/*' ],
  },
}

module.exports = nextConfig
