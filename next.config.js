/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lnjs-generalbucket.s3.sa-east-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "lnjs-generalbucket.s3.sa-east-1.amazonaws.com/profile_images",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
