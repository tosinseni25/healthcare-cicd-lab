# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY app/package*.json ./
RUN npm ci --only=production

# Stage 2 — Production
FROM node:20-alpine
RUN addgroup -S meditrack && adduser -S meditrack -G meditrack
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY app/ .
RUN chown -R meditrack:meditrack /app
USER meditrack
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server.js"]