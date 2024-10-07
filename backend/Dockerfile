# Base image
FROM node:20.17.0-alpine3.20 AS base

WORKDIR /app

COPY package.json yarn.lock? ./

EXPOSE 4000

# Development image
FROM base AS dev

ENV NODE_ENV=development

RUN yarn install

CMD ["yarn", "dev"]

# Production image
FROM base AS prod

RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

CMD ["yarn", "start"]
