# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Explicitly install critters package which is missing
RUN yarn add critters

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Run
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy necessary files from build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Only install production dependencies
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port your application will run on
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]