/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.outletexpense.xyz",
      },
      {
        protocol: "https",
        hostname: "outletexpense.xyz",
      },
      {
        protocol: "https",
        hostname: "cdn.outletexpense.xyz",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
