# ---------- Build Stage ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# ---------- Runtime Stage ----------
FROM node:20-alpine
WORKDIR /app

# Only copy production-ready files
COPY --from=builder /app /app

# Only keep production deps
ENV NODE_ENV=production

EXPOSE 4000
CMD ["node", "index.js"]

