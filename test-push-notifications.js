#!/usr/bin/env node

/**
 * Test script for push notification flow
 * 
 * Usage:
 *   node test-push-notifications.js <USER_ID>
 * 
 * Requirements:
 *   - Notification service running on localhost:3005
 *   - User has registered device token
 *   - FIREBASE_SERVICE_ACCOUNT_JSON set in notification service
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005';
const USER_ID = process.argv[2];

if (!USER_ID) {
    console.error('❌ Error: USER_ID required');
    console.error('Usage: node test-push-notifications.js <USER_ID>');
    process.exit(1);
}

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
};

function log(color, message) {
    console.log(`${color}${message}${colors.reset}`);
}

async function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const client = url.protocol === 'https:' ? https : http;
        
        const req = client.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(data)
                    });
                } catch {
                    resolve({
                        status: res.statusCode,
                        data: data
                    });
                }
            });
        });

        req.on('error', reject);
        
        if (body) {
            req.write(JSON.stringify(body));
        }
        
        req.end();
    });
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    log(colors.magenta, '🔔 Push Notification Test Suite');
    console.log('='.repeat(60) + '\n');

    log(colors.blue, `📍 Target: ${BASE_URL}`);
    log(colors.blue, `👤 User ID: ${USER_ID}\n`);

    // Test 1: Health Check
    try {
        log(colors.yellow, '1️⃣  Testing health endpoint...');
        const health = await request('GET', '/health');
        if (health.status === 200) {
            log(colors.green, `✅ Health check passed: ${health.data.status}`);
        } else {
            log(colors.red, `❌ Health check failed: ${health.status}`);
            process.exit(1);
        }
    } catch (error) {
        log(colors.red, `❌ Health check error: ${error.message}`);
        process.exit(1);
    }

    // Test 2: Check registered devices
    try {
        log(colors.yellow, '\n2️⃣  Checking registered devices...');
        const devices = await request('GET', `/api/notifications/devices/${USER_ID}`);
        
        if (devices.status === 200 && devices.data.success) {
            const count = devices.data.data.length;
            log(colors.green, `✅ Found ${count} registered device(s)`);
            
            if (count === 0) {
                log(colors.red, '❌ No devices registered. User must login on Android app first.');
                process.exit(1);
            }
            
            devices.data.data.forEach((device, i) => {
                console.log(`   Device ${i + 1}: ${device.platform} (Token: ${device.token_prefix}...)`);
            });
        } else if (devices.status === 403) {
            log(colors.yellow, '⚠️  Device listing disabled in production (expected)');
        } else {
            log(colors.red, `❌ Failed to fetch devices: ${devices.data.message || devices.status}`);
        }
    } catch (error) {
        log(colors.red, `❌ Device check error: ${error.message}`);
    }

    // Test 3: Send test notification
    try {
        log(colors.yellow, '\n3️⃣  Sending test push notification...');
        const notification = await request('POST', '/api/notifications/send-push', {
            userId: USER_ID,
            title: '🎉 Test Notification',
            body: 'This is a test push notification from the backend!',
            data: {
                type: 'test',
                timestamp: new Date().toISOString(),
                action: 'open_app'
            }
        });

        if (notification.status === 200 && notification.data.success) {
            log(colors.green, '✅ Push notification sent successfully!');
            console.log(`   Notification ID: ${notification.data.data.notificationId}`);
            console.log(`   Sent at: ${notification.data.data.sentAt}`);
            log(colors.green, '\n📱 Check your Android device for the notification!');
        } else {
            log(colors.red, `❌ Failed to send notification: ${notification.data.message || notification.status}`);
            console.error('   Response:', JSON.stringify(notification.data, null, 2));
        }
    } catch (error) {
        log(colors.red, `❌ Send notification error: ${error.message}`);
    }

    // Test 4: Send via hexagon use case endpoint
    try {
        log(colors.yellow, '\n4️⃣  Testing hexagon use case endpoint...');
        const hexNotification = await request('POST', '/notifications', {
            userId: USER_ID,
            channel: 'push',
            template: 'custom',
            data: {
                title: '🧪 Hexagon Test',
                body: 'Testing via SendNotificationUseCase',
                customData: {
                    source: 'test-script'
                }
            }
        });

        if (hexNotification.status === 201 && hexNotification.data.success) {
            log(colors.green, '✅ Hexagon notification sent successfully!');
            console.log(`   Status: ${hexNotification.data.data.status}`);
        } else {
            log(colors.yellow, `⚠️  Hexagon endpoint: ${hexNotification.data.message || hexNotification.status}`);
        }
    } catch (error) {
        log(colors.red, `❌ Hexagon test error: ${error.message}`);
    }

    console.log('\n' + '='.repeat(60));
    log(colors.magenta, '✨ Test suite completed!');
    console.log('='.repeat(60) + '\n');
}

runTests().catch(error => {
    log(colors.red, `\n❌ Fatal error: ${error.message}`);
    process.exit(1);
});
