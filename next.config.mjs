/** @type {import('next').NextConfig} */

const config = {
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  }
};

export default config;

