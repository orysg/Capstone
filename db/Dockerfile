# Base image
FROM postgres:16.4-alpine3.20 AS base

# Development image
FROM base AS dev

# Production image
FROM base AS prod

COPY init.sql .
