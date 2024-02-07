#stage 1
FROM node:20.11.0-alpine3.18 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder  /app/dist/my-first-app /usr/share/nginx/html