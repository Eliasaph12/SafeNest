#!/bin/bash

# SafeNest Integration Test Script
# This script tests the backend API endpoints to ensure integration is working

BACKEND_URL="http://localhost:8080"
FRONTEND_URL="http://localhost:5173"

echo "🧪 Testing SafeNest Backend Integration"
echo "========================================"

# Function to test endpoint
test_endpoint() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4

    echo -n "Testing $description... "

    if [ "$method" = "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    else
        response=$(curl -s -X "$method" -H "Content-Type: application/json" -d "$data" -o /dev/null -w "%{http_code}" "$url")
    fi

    if [ "$response" -ge 200 ] && [ "$response" -lt 300 ]; then
        echo "✅ PASS ($response)"
    else
        echo "❌ FAIL ($response)"
    fi
}

# Test health check
test_endpoint "GET" "$BACKEND_URL/actuator/health" "" "Backend Health Check"

# Test CORS preflight
test_endpoint "OPTIONS" "$BACKEND_URL/api/products" "" "CORS Preflight"

# Test getting all products
test_endpoint "GET" "$BACKEND_URL/api/products" "" "Get All Products"

# Test user registration (this will create a test user)
test_data='{"email":"test@example.com","password":"testpass123","role":"VICTIM"}'
test_endpoint "POST" "$BACKEND_URL/api/auth/signup" "$test_data" "User Registration"

# Test user login
login_data='{"email":"test@example.com","password":"testpass123"}'
test_endpoint "POST" "$BACKEND_URL/api/auth/login" "$login_data" "User Login"

echo ""
echo "📋 Manual Testing Checklist:"
echo "1. Start the backend: cd Project_backend/backend && mvn spring-boot:run"
echo "2. Start the frontend: npm run dev"
echo "3. Open browser to $FRONTEND_URL"
echo "4. Test registration and login"
echo "5. Verify dashboard loads real data from backend"
echo "6. Test admin resource management"
echo ""
echo "🔧 Troubleshooting:"
echo "- If backend fails: Check MySQL connection and application.properties"
echo "- If frontend fails: Verify VITE_API_URL environment variable"
echo "- If CORS errors: Check @CrossOrigin annotations in controllers"
echo ""
echo "✅ Integration test complete!"