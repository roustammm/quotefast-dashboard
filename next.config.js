/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Netlify static export
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
  
  images: {
    unoptimized: true, // Required for static export
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
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
