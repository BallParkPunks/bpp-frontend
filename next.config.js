/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isDev = true;

const env = {
  IS_DEV: isDev ? "true" : "false",
  GA_TAG: "",
  CHAIN_ID: isDev ? "11155111" : "1",
};

module.exports = {
  nextConfig,
  env,
};
