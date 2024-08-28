/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:9001/:path*",
      },
      {
        source: "/upfiles/:path*",
        destination: "http://localhost:9001/upfiles/:path*",
      },
    ];
  },
};

export default nextConfig;
