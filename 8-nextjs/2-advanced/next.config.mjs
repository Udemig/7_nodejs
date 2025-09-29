/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Dış kaynaklardan url ile aldığımız resimlerde next.js optimizasyonu çalışsın istiyorsak resimleri aldığımız kaynkları bu alanda next'e tanıtmalıyız
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
