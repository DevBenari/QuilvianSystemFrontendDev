# Tahap 1: Build Aplikasi
FROM node:18-alpine AS builder

WORKDIR /app

# Copy file yang diperlukan untuk instalasi dependencies
COPY package.json package-lock.json ./

# Install dependencies tanpa menyertakan devDependencies untuk produksi
RUN npm install --omit=dev

# Copy semua file proyek kecuali yang ada di .dockerignore
COPY . .

# Build Next.js (pastikan build tidak gagal meskipun env tidak ada)
ENV NODE_ENV=production
RUN npm run build

# Tahap 2: Jalankan Aplikasi di Production
FROM node:18-alpine AS runner

WORKDIR /app

# Copy hanya file yang dibutuhkan untuk menjalankan aplikasi
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

# Set environment variable untuk production
ENV NODE_ENV=production
ENV PORT=3710

# Expose port agar bisa diakses dari luar
EXPOSE 3710

# Jalankan aplikasi Next.js
CMD ["npm", "run", "start"]
