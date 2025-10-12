/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Hugging Face Spaces
  output: 'standalone',
  trailingSlash: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qgyboabomydquodygomq.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Environment variables for Hugging Face Spaces
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://your-space-name.hf.space',
  },
}

module.exports = nextConfig
