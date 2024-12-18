# Install pnpm in the dependencies stage
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package.json and pnpm-lock.yaml for installing dependencies
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile  # Use pnpm to install dependencies

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm in the builder stage as well
RUN npm install -g pnpm  # Ensure pnpm is available in the builder stage

# Copy application files and install dependencies directly in the builder stage
COPY . .  # Copy the rest of the application source code
RUN pnpm install --frozen-lockfile  # Install dependencies in the builder stage
RUN pnpm build  # Build the project using pnpm

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy the compiled application files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Start the application using pnpm
CMD ["pnpm", "start"]
