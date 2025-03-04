/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [
        // Tambahkan domain untuk optimasi gambar jika diperlukan
      ],
      formats: ['image/avif', 'image/webp'],
    },
    experimental: {
      optimizeCss: true,
      scrollRestoration: true,
    },
  }
  
 export default nextConfig