# builder
FROM node:18-bullseye-slim as builder

WORKDIR /egodb

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@egodb/backend --scope=@egodb/frontend

# installer
FROM node:18-bullseye AS installer

RUN npm install -g pnpm

WORKDIR /egodb

COPY --from=builder /egodb/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm fetch

COPY --from=builder /egodb/out/ .

RUN pnpm install -r --offline

ENV NODE_ENV production
RUN pnpm run build --filter=backend --filter=frontend
RUN pnpm prune --prod --config.ignore-scripts=true

# runner
FROM gcr.io/distroless/nodejs18-debian11 as runner

WORKDIR /egodb

ENV NODE_ENV production
ENV EGODB_DATABASE_SQLITE_DATA /var/opt/.ego

COPY --from=installer /egodb/node_modules ./node_modules
COPY --from=installer /egodb/packages ./packages
COPY --from=installer /egodb/apps/backend ./apps/backend
COPY --from=installer /egodb/apps/frontend/dist ./out

CMD ["apps/backend/dist/main.js"]
