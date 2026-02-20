# Dockerfile for iglesia-front
# Multi-stage build: Build Astro app and serve with Nginx

# Stage 1: Build the Astro application
FROM node:20-alpine AS builder

# Build arguments for Strapi connection
ARG STRAPI_URL=http://localhost:1337
ARG STRAPI_TOKEN=""

# Set environment variables for build
ENV STRAPI_URL=${STRAPI_URL}
ENV STRAPI_TOKEN=${STRAPI_TOKEN}

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Astro application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
