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
    API_KEY: process.env.API_KEY
  }
}