# Base image
FROM node:20.17.0-alpine3.20 AS base

WORKDIR /app

EXPOSE 3000

# Development image
FROM base AS dev

ENV NODE_ENV=development

CMD ["yarn", "start"]

# Production image
FROM base AS builder

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:1.27.1-alpine3.20 AS prod

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
