# Base image
FROM node:20.17.0-alpine3.20 AS base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

EXPOSE 4000

# Development image
FROM base AS dev

ENV NODE_ENV=development

CMD ["yarn", "dev"]

# Production image
FROM base AS prod

COPY . .

ENV NODE_ENV=production

CMD ["yarn", "start"]
