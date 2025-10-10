# syntax=docker/dockerfile:1
ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,id=matching-service-npm-deps,target=/root/.npm npm ci --omit=dev || npm install --omit=dev

FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
RUN --mount=type=cache,id=matching-service-npm-build,target=/root/.npm npm ci && npm run build || (npm install && npm run build)

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    SERVICE_NAME=matching-service
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://localhost:'+(process.env.PORT||'3000')+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node","dist/index.js"]
