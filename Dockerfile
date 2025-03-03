# Tahap 1: Build Aplikasi
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy semua file proyek
COPY . .

# Build Next.js
RUN npm run build

# Tahap 2: Image Final dengan Nginx (Ringan)
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy hasil build dari tahap builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

# Copy konfigurasi default Nginx
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Expose port untuk Nginx
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
