# Gunakan base image resmi Node.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json ./
RUN yarn install

# Copy seluruh kode proyek
COPY . .

# Build Next.js untuk production
RUN yarn build

# Gunakan base image yang lebih kecil untuk menjalankan aplikasi
FROM node:18-alpine AS runner

WORKDIR /app

# Copy hasil build dari tahap sebelumnya
COPY --from=builder /app ./

# Jalankan aplikasi Next.js
CMD ["yarn", "start"]
