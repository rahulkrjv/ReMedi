# Stage 1: Build React app
FROM node:20-alpine as build

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./ 
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]