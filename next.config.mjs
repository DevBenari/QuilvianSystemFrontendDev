/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // 📌 Pastikan output menggunakan mode standalone (untuk Docker)
    images: {
      unoptimized: true, // 📌 Matikan image optimization karena kita pakai Nginx
    },
    trailingSlash: true, // 📌 Pastikan URL folder berfungsi dengan baik di Nginx
  };
  
  export default nextConfig;
  