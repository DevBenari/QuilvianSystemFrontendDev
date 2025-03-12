# Menggunakan image Node.js terbaru
FROM node:18-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy semua kode sumber
COPY . .

# Tambahkan variabel lingkungan dari build-time
ARG NEXT_PUBLIC_API_QUILVIAN
ENV NEXT_PUBLIC_API_QUILVIAN=${NEXT_PUBLIC_API_QUILVIAN}

# Build aplikasi Next.js
RUN npm run build

# Jalankan Next.js pada mode production
CMD ["npm", "start"]
