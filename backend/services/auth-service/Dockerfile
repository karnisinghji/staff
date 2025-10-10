FROM node:20.11-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --legacy-peer-deps

FROM node:20.11-alpine AS build
WORKDIR /app
COPY package.json tsconfig.json ./
COPY src ./src
RUN npm install --legacy-peer-deps && npm run build

FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 SERVICE_NAME=auth-service
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
EXPOSE 3000
CMD ["node","dist/index.js"]
