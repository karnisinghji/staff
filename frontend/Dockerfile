# syntax=docker/dockerfile:1
ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src ./src
COPY public ./public
# Install all dependencies (dev needed for build) then build
RUN --mount=type=cache,target=/root/.npm npm ci && npm run build

# Static file server stage using lightweight image (nginx)
FROM nginx:1.27-alpine AS runner
# Copy build artifacts from Vite (default dist)
COPY --from=build /app/dist /usr/share/nginx/html
# Provide basic healthcheck (200 on /)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -q -O /dev/null http://localhost:80/ || exit 1
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
