# Gunakan image Node.js sebagai base
FROM node:18-alpine 

# Tentukan working directory
WORKDIR /app

# Copy file package.json dan yarn.lock untuk menginstall dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy seluruh kode proyek ke dalam container
COPY . .

# Build aplikasi Next.js
RUN yarn build

# Jalankan aplikasi
CMD ["yarn", "start"]
