#!/bin/bash
# API Test Script

echo "Testing API health endpoint..."
curl -v "http://localhost:10000/"
echo -e "\n\n"

echo "Testing registration endpoint..."
curl -v -X POST \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User", "email":"test@example.com", "password":"password123"}' \
  "http://localhost:10000/api/v1/auth/register"
echo -e "\n\n"

echo "Testing login endpoint..."
curl -v -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}' \
  "http://localhost:10000/api/v1/auth/login"
echo -e "\n\n"

echo "Testing debug headers endpoint..."
curl -v -H "Origin: https://shivamstracker.netlify.app" \
  "http://localhost:10000/debug-headers"
echo -e "\n\n"
