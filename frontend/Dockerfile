# Base image
FROM node:20.17.0-alpine3.20 AS base

WORKDIR /app

COPY package.json yarn.lock? ./

EXPOSE 3000

# Development image
FROM base AS dev

ENV NODE_ENV=development

RUN yarn install

CMD ["yarn", "start"]

# Production image
FROM base AS builder

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Production image for running the Next.js server
FROM base AS prod

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile
# Set environment to production
ENV NODE_ENV=production

# Start the Next.js server in production mode
CMD ["yarn", "prod"]

# Expose port 3000 for the Next.js server
EXPOSE 3000
