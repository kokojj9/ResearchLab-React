/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log("리라이팅 적용중...");
    return [
      {
        source: "/upfiles/:path*",
        destination: "http://localhost:9001/upfiles/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:9001/:path*",
      },
    ];
  },
  images: {
    domains: ["localhost"], // 허용할 외부 이미지 도메인에 "localhost" 추가
  },
};

export default nextConfig;
