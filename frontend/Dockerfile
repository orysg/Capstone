# Base image
FROM node:20.17.0-alpine3.20 AS base

WORKDIR /app

COPY package.json yarn.lock? ./

EXPOSE 3000

# Development image
FROM base AS dev

ENV NODE_ENV=development

RUN yarn install

CMD ["yarn", "dev"]

# Production builder image
FROM base AS builder

ENV NODE_ENV=production

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Production runtime image
FROM node:20.17.0-alpine3.20 AS prod

WORKDIR /app

# Copy everything till I know it works
COPY --from=builder /app ./

# Copy only necessary files from the build stage
# COPY --from=builder /app/.next /app/.next
# COPY --from=builder /app/public /app/public
# COPY --from=builder /app/package.json /app/yarn.lock ./

# Some "dev" dependencies may need to be moved into production
RUN yarn install --production --frozen-lockfile

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start"]