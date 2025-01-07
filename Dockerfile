FROM node:23-alpine as builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_API_SERVER_URL
ARG NEXT_PUBLIC_STATIC_SERVER_URL
ENV NEXT_PUBLIC_API_SERVER_URL=$NEXT_PUBLIC_API_SERVER_URL
ENV NEXT_PUBLIC_STATIC_SERVER_URL=$NEXT_PUBLIC_STATIC_SERVER_URL
ENV NODE_ENV=production
RUN npm run build

FROM node:23-alpine as runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --chown=nextjs:nodejs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ARG PORT
ARG HOSTNAME
ENV PORT=$PORT
ENV HOSTNAME=$HOSTNAME
EXPOSE $PORT
CMD ["node", "./server.js"]
