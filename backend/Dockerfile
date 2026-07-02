FROM node:18-bullseye-slim

WORKDIR /app

# Install deps first (cache)
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --silent || npm install --silent

# Copy source
COPY backend/ ./backend
WORKDIR /app/backend

# Generate Prisma client if schema present
RUN npx prisma generate || true

# Build for production
RUN npm run build

EXPOSE 4000

# Default to production start (docker-compose can override to `npm run dev`)
CMD ["npm", "run", "start"]
