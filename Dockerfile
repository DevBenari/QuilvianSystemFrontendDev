# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Setup untuk Next.js
COPY . .
RUN npm run build

# Production stage dengan Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output ke Nginx
COPY --from=builder /app/.next/static ./_next/static
COPY --from=builder /app/public ./

# Copy konfigurasi Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Command untuk run Nginx
CMD ["nginx", "-g", "daemon off;"]