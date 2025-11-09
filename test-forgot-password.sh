#!/bin/bash

BASE_URL="https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io/api/auth"

echo "==================================="
echo "FORGOT PASSWORD ENDPOINT TESTS"
echo "==================================="
echo ""

echo "1️⃣ Test: Non-existent email"
echo "-----------------------------------"
curl -X POST "$BASE_URL/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{"email":"nonexistent@test.com"}' \
  -w "\nStatus: %{http_code}\n\n" -s

echo "2️⃣ Test: Valid email (hanny@info.com)"
echo "-----------------------------------"
curl -X POST "$BASE_URL/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{"email":"hanny@info.com"}' \
  -w "\nStatus: %{http_code}\n\n" -s

echo "3️⃣ Test: Missing email field"
echo "-----------------------------------"
curl -X POST "$BASE_URL/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -w "\nStatus: %{http_code}\n\n" -s

echo "4️⃣ Test: Invalid reset token"
echo "-----------------------------------"
curl -X POST "$BASE_URL/reset-password" \
  -H "Content-Type: application/json" \
  -d '{"token":"invalid-token","newPassword":"newpass123"}' \
  -w "\nStatus: %{http_code}\n\n" -s

echo "==================================="
echo "✅ ALL TESTS COMPLETED"
echo "==================================="
