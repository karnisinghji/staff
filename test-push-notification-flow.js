#!/usr/bin/env node

/**
 * Test Push Notification Flow
 * 
 * This script tests the entire push notification flow:
 * 1. Check if FCM token exists in notification service database
 * 2. Send a test message that should trigger a notification
 * 3. Verify the notification was sent
 */

const https = require('https');

const BASE_URL = 'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';
const COMM_URL = 'https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

// User IDs (replace with actual values)
const KARNI_USER_ID = '62943651-719e-4b59-a935-960e15905d28'; // khushabhu@gmail.com
const RAM_USER_ID = '7e089ff8-49e1-4fa9-8c00-8ef6eef50c81'; // ramp@info.com

const TOKEN = process.argv[2];

if (!TOKEN) {
  console.log('\n❌ Usage: node test-push-notification-flow.js YOUR_AUTH_TOKEN\n');
  console.log('Get your token from:');
  console.log('  1. Login to https://comeondost.web.app');
  console.log('  2. Open console');
  console.log('  3. Run: localStorage.getItem("token")');
  console.log('  4. Copy the token (without quotes)\n');
  process.exit(1);
}

function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data), headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, body: data, headers: res.headers });
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function checkFCMToken(userId) {
  console.log('\n🔍 Step 1: Checking FCM token for user:', userId);
  
  const url = `${BASE_URL}/api/notifications/token/${userId}`;
  const response = await makeRequest(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  console.log('Status:', response.status);
  console.log('Response:', JSON.stringify(response.body, null, 2));
  
  if (response.status === 200 && response.body.token) {
    console.log('✅ FCM Token found:', response.body.token);
    return response.body.token;
  } else {
    console.log('❌ No FCM token found - push notifications will not work!');
    console.log('Solution: Open the app and ensure notifications are enabled');
    return null;
  }
}

async function sendTestMessage(fromId, toId, senderName) {
  console.log('\n📤 Step 2: Sending test message...');
  console.log('From:', fromId, `(${senderName})`);
  console.log('To:', toId);
  
  const url = `${COMM_URL}/messages`;
  const body = JSON.stringify({
    fromUserId: fromId,
    toUserId: toId,
    body: 'Test notification from diagnostic script',
    senderName: senderName
  });
  
  const response = await makeRequest(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    },
    body
  });
  
  console.log('Status:', response.status);
  console.log('Response:', JSON.stringify(response.body, null, 2));
  
  if (response.status === 201 || response.status === 200) {
    console.log('✅ Message sent successfully');
    return true;
  } else {
    console.log('❌ Failed to send message');
    return false;
  }
}

async function main() {
  console.log('🚀 Push Notification Flow Diagnostic');
  console.log('=====================================');
  
  // Check FCM token for Karni (recipient on actual device)
  const karniToken = await checkFCMToken(KARNI_USER_ID);
  
  if (!karniToken) {
    console.log('\n⚠️  Karni does not have an FCM token registered');
    console.log('This means:');
    console.log('  1. App may not have requested notification permissions');
    console.log('  2. Push notifications were denied by user');
    console.log('  3. FCM registration failed');
    console.log('\nChecks to perform on the actual device:');
    console.log('  • Open app and check console for: [Push Notifications] FCM Token:');
    console.log('  • Go to Android Settings → Apps → ComeOnDost → Notifications');
    console.log('  • Verify notifications are enabled');
    console.log('  • Re-install the app if needed');
    process.exit(1);
  }
  
  // Send test message from Ram to Karni
  console.log('\n📱 Sending test message to trigger notification...');
  const sent = await sendTestMessage(RAM_USER_ID, KARNI_USER_ID, 'Ram Prasad');
  
  if (sent) {
    console.log('\n✅ Test completed!');
    console.log('Check Karni\'s device (khushabhu@gmail.com) for notification');
    console.log('Expected notification:');
    console.log('  Title: Ram Prasad');
    console.log('  Body: Test notification from diagnostic script');
  } else {
    console.log('\n❌ Test failed - message was not sent');
  }
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
