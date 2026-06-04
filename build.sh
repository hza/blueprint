#!/usr/bin/env bash
set -euo pipefail

# Simple build script: exports VITE_API and builds the Docker image
# Usage: ./build.sh

IMAGE="docker.io/hezihezer/blueprint"

VITE_GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo dev)
VITE_API="https://the-blueprint.azurewebsites.net"

echo "Using VITE_API=$VITE_API"
echo "Using VITE_GIT_HASH=$VITE_GIT_HASH"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found — please install Docker." >&2
  exit 1
fi

echo "Building Docker image: $IMAGE"
docker build --build-arg VITE_API="$VITE_API" --build-arg VITE_GIT_HASH="$VITE_GIT_HASH" -t "$IMAGE" .
echo "Docker build finished: $IMAGE"

echo "Pushing Docker image: $IMAGE"
docker push "$IMAGE"
echo "Docker image pushed: $IMAGE"
