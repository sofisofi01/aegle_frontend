# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Передаем URL бэкенда при сборке
ARG NEXT_PUBLIC_API_BASE_URL=/api
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
# Конфиг для SPA (Next.js static export)
RUN printf 'server {\n    listen 80;\n    location / {\n        root /usr/share/nginx/html;\n        index index.html;\n        try_files $uri $uri.html $uri/ /index.html;\n    }\n}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
