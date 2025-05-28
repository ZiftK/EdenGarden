/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'mthehujknsafqhtuuuek.supabase.co',
				port: '',
				pathname: '/storage/v1/object/**',
			},
			{
				protocol: 'https',
				hostname: 'i.pravatar.cc',
				port: '',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig
