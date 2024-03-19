/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/eyadbaha/card-arts/main/**",
      },
      {
        protocol: "https",
        hostname: "wsrv.nl",
        port: "",
        pathname: "**",
      },
    ],
  },
};
