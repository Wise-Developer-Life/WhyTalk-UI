FROM node:16-alpine AS dev-base

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:stable-alpine as production

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=dev-base /var/workdir/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
