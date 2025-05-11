#!/bin/bash
# API Route tester script with CORS verification

# Set base URL - change this to your actual backend URL
BASE_URL="https://the-deployment.onrender.com"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}===== Testing Auth Routes with CORS =====${NC}"

# First check OPTIONS for CORS preflight
echo -e "\n${YELLOW}Testing CORS preflight OPTIONS request${NC}"
curl -v -X OPTIONS "$BASE_URL/api/v1/auth/register" \
  -H "Origin: https://shivamstracker.netlify.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization"

# Test routes with GET requests
test_get_route() {
    local route=$1
    echo -e "\nTesting GET $route"
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route")
    
    if [[ $status_code == 2* ]]; then
        echo -e "${GREEN}✓ Route exists: $route (Status $status_code)${NC}"
    elif [[ $status_code == 404 ]]; then
        echo -e "${RED}✗ Route not found: $route (Status $status_code)${NC}"
    else
        echo -e "${RED}✗ Error accessing route: $route (Status $status_code)${NC}"
    fi
}

# Test routes with POST requests (without auth)
test_post_route() {
    local route=$1
    local payload=$2
    echo -e "\nTesting POST $route with payload: $payload"
    
    response=$(curl -s -w "\nSTATUS:%{http_code}" -X POST \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "$BASE_URL$route")
    
    status_code=$(echo "$response" | grep "STATUS:" | cut -d ":" -f 2)
    content=$(echo "$response" | grep -v "STATUS:")
    
    if [[ $status_code == 2* ]]; then
        echo -e "${GREEN}✓ Route is accessible: $route (Status $status_code)${NC}"
        echo "Response preview: ${content:0:100}..."
    elif [[ $status_code == 404 ]]; then
        echo -e "${RED}✗ Route not found: $route (Status $status_code)${NC}"
    else
        echo -e "${RED}✗ Error accessing route: $route (Status $status_code)${NC}"
        echo "Response: $content"
    fi
}

# Test the root endpoint
test_get_route "/"

# Test auth endpoints
test_post_route "/api/v1/auth/login" '{"email":"test@example.com", "password":"password123"}'
test_post_route "/api/v1/auth/register" '{"fullName":"Test User", "email":"test@example.com", "password":"password123"}'
test_get_route "/api/v1/auth/getUser"

# Test debug headers endpoint
test_get_route "/debug-headers"

echo -e "\n${BLUE}===== Testing Complete =====${NC}"
