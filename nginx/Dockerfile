FROM node:20.17.0-alpine3.20 AS build
WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./frontend ./

RUN yarn build

FROM nginx:1.27.1-alpine3.20
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
# Need a conf file
# Dunno whether backend needs proxy'ing

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]