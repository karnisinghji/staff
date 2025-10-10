# syntax=docker/dockerfile:1
# Auth Service Dockerfile (multi-stage build) - v1.3.0-fresh
ARG NODE_VERSION=20.11-alpine
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package*.json ./
# Install production dependencies separately for smaller final image
RUN npm ci --omit=dev

FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
# Install all deps (dev + prod) for build time (kept in separate layer)
RUN npm ci && npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
# Force cache bust with timestamp
ARG CACHEBUST=1
RUN echo "Build timestamp: $CACHEBUST"
ENV NODE_ENV=production \
    PORT=3000 \
    SERVICE_NAME=auth-service \
    BUILD_VERSION=1.3.0-fresh
# Copy production node_modules and compiled dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Optional: copy package.json for runtime introspection
COPY package*.json ./
EXPOSE 3000
# Healthcheck uses built-in fetch (Node 18+)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://localhost:'+(process.env.PORT||'3000')+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node","dist/index.js"]
