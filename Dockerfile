# Tahap 1: Build Next.js
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Tahap 2: Jalankan Aplikasi
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY package.json yarn.lock ./
RUN yarn install --production

EXPOSE 3000
CMD ["yarn", "start"]
