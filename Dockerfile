# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Buat file .dockerignore terlebih dahulu dan tambahkan:
# node_modules
# .next
# .git
# README.md
# dll.

# Copy package.json dan yarn.lock
COPY package.json yarn.lock ./

# Install dependencies dengan production flag
RUN yarn install --frozen-lockfile --production=false

# Copy kode aplikasi
COPY . .

# Build aplikasi
RUN yarn build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app

# Copy hanya file yang diperlukan dari build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Install hanya production dependencies
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

# Jalankan aplikasi
CMD ["yarn", "start"]