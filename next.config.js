/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ipfs.infura.io', 'th.bing.com', 'images.unsplash.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://eth-mainnet.gateway.pokt.network/:path*',
      },
    ]
  },
}

module.exports = nextConfig
