# ==============================================================================
# MedPulse Backend Service Dockerfile
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Install dependencies needed for native modules
RUN apk add --no-cache libc6-compat

# Copy package descriptors
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY src/ ./src/
COPY test/ ./test/

# Set production environment defaults
ENV NODE_ENV=production
ENV PORT=5000

# Expose backend API port
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:5000/api/health || exit 1

# Start server
CMD ["node", "src/server.js"]
