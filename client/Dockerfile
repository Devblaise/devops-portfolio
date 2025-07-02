# ---------- Build Stage ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build          # 'out/' is produced here

# ---------- Production Stage ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/out ./
COPY nginx.conf /etc/nginx/conf.d/default.conf    

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

