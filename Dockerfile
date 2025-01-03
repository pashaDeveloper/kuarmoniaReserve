# Install pnpm in the dependencies stage
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies with pnpm (without the lockfile if it's missing)
RUN pnpm install --no-frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm in the builder stage as well
RUN npm install -g pnpm

COPY . . 
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build  # Use pnpm build instead of yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy the compiled application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]  # Change from yarn to pnpm
