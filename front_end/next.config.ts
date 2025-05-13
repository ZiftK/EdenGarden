import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    API_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'secret',
    NEXTAUTH_JWT_SECRET: 'jwt_secret'
  }
};

export default nextConfig;
