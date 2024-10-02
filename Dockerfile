# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN yarn build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 4000

# Start the application in production mode
CMD ["yarn", "start"]
