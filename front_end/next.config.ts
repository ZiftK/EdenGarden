import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    API_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'secret',
    NEXTAUTH_JWT_SECRET: 'jwt_secret'
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'mthehujknsafqhtuuuek.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/images/**',
      }
    ]
  }
};

export default nextConfig;
