/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    APP_ID: process.env.APP_ID,
  },
};

module.exports = nextConfig;
