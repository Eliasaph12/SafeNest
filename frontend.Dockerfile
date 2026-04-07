# Frontend Dockerfile for SafeNest
# Build stage
FROM node:21-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Runtime stage
FROM node:21-alpine

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173 || exit 1

# Start application
CMD ["serve", "-s", "dist", "-l", "5173"]
