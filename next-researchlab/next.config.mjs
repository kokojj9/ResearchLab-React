/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:9001/:path*",
      },
    ];
  },
};

export default nextConfig;
