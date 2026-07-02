#!/usr/bin/env bash
set -euo pipefail

# Wait-for-db: wait for Postgres to become available, run prisma generate/migrate, then exec the app command.
HOST="${DATABASE_HOST:-postgres}"
PORT="${DATABASE_PORT:-5432}"
MAX_WAIT="${MAX_WAIT:-60}"

echo "Waiting for database at $HOST:$PORT (max ${MAX_WAIT}s)..."

n=0
until nc -z "$HOST" "$PORT" >/dev/null 2>&1; do
  n=$((n+1))
  if [ "$n" -ge "$MAX_WAIT" ]; then
    echo "Timed out waiting for $HOST:$PORT" >&2
    exit 1
  fi
  sleep 1
done

echo "Database reachable at $HOST:$PORT"

# Ensure Prisma client is available
if command -v npx >/dev/null 2>&1; then
  echo "Running: npx prisma generate"
  npx prisma generate || echo "prisma generate failed (continuing if no schema present)"
fi

# Run migrations (deploy for prod, or dev if deploy fails)
if command -v npx >/dev/null 2>&1; then
  echo "Applying Prisma migrations..."
  if ! npx prisma migrate deploy 2>/dev/null; then
    # Fallback for development environments
    npx prisma migrate dev --name init --skip-seed || true
  fi
fi

echo "Starting app: $*"
exec "$@"
