/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/upfiles/:path*",
        destination: "http://localhost:9001/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:9001/:path*",
      },
    ];
  },
};

export default nextConfig;
