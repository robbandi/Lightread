/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // noImplicitAny: false,
  // allowJs: true,
}

require('dotenv').config()

module.exports = {
  ...nextConfig,
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY
  }
}