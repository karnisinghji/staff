#!/usr/bin/env node

// Test JWT verification manually
const crypto = require('crypto');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYTU1Y2VlMy04NjBlLTRlNmYtOWU4Ni1lYjM2ZDE0ZmQ2MjAiLCJyb2xlcyI6WyJ3b3JrZXIiXSwiaWF0IjoxNzU5MzAxMjc5LCJleHAiOjE3NTkzMDIxNzl9";
const signature = "nZlTKdCVDj_mFjLV6EsYHB-lzkIGVGqRz35mnvM_hgc";
const secrets = [
    "platform-super-secret",
    "insecure-local-dev-secret",
    "access-secret",
    "fallback-secret"
];

console.log("Testing JWT signature with different secrets...\n");

for (const secret of secrets) {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(token);
    const computed = hmac.digest('base64url');
    const match = computed === signature;
    console.log(`Secret: "${secret}"`);
    console.log(`  Computed: ${computed.substring(0, 20)}...`);
    console.log(`  Expected: ${signature.substring(0, 20)}...`);
    console.log(`  Match: ${match ? '✅ YES' : '❌ NO'}\n`);
}
