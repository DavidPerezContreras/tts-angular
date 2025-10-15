#!/bin/bash

echo "🧹 Resetting NX workspace cache..."
npx nx reset

echo "🧹 Removing all node_modules and lock files..."
rm -rf node_modules package-lock.json
find . -type d -name "node_modules" -exec rm -rf {} +
find . -type f -name "package-lock.json" -exec rm -f {} +

echo "🧼 Removing dist and build artifacts..."
rm -rf dist .nx .angular .turbo

echo "🐳 Stopping and removing all Docker containers..."
docker container stop $(docker container ls -aq) 2>/dev/null
docker container rm $(docker container ls -aq) 2>/dev/null

echo "🐳 Removing all Docker images..."
docker image rm $(docker image ls -aq) 2>/dev/null

echo "🐳 Removing all Docker volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null

echo "🐳 Removing all Docker networks (except default ones)..."
docker network rm $(docker network ls | grep -v "bridge\|host\|none" | awk '{print $1}') 2>/dev/null

echo "🐳 Pruning Docker build cache..."
docker builder prune -af

echo "✅ Deep clean complete!"
