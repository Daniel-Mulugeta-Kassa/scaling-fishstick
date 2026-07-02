FROM node:18-bullseye-slim

WORKDIR /app

# Install deps
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --silent || npm install --silent

# Copy source
COPY frontend/ ./frontend
WORKDIR /app/frontend

# Build static assets
RUN npm run build

EXPOSE 3000

# Use Vite preview to serve built assets
CMD ["npm", "run", "preview"]
