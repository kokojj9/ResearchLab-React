/** @type {import('next').NextConfig} */
<<<<<<< Updated upstream
const nextConfig = {};
=======
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
>>>>>>> Stashed changes

export default nextConfig;
