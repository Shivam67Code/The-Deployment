#!/bin/bash
# Healthcheck script for Render

# Check if the API is running by making a request to the health endpoint
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT || echo "failed")

if [ "$response" = "200" ] || [ "$response" = "301" ] || [ "$response" = "302" ]; then
  echo "✅ API is healthy ($response)"
  exit 0
else
  echo "❌ API is not healthy (response: $response)"
  exit 1
fi