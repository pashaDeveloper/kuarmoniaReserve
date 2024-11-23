# Use official Node.js image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if exists) to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Set environment variables for production
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV TOKEN_SECRET=${TOKEN_SECRET}
ENV DB_NAME=${DB_NAME}
ENV ATLAS_URI=${ATLAS_URI}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}

# Build the application
RUN pnpm build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
