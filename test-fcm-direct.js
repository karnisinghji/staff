#!/usr/bin/env node
/**
 * Direct FCM Push Notification Test
 * Tests Firebase Cloud Messaging by sending directly to a device token
 */

const TOKEN = 'fTvlDLGORFC2rvSCLVsda7:APA91bHHHrGXK1RRlm25NR78a96GqFZK_PGM1IStj7yP5V0fJkVBEg09Ri8efR-brEpOBSPIw9O50TdAyRQ1NZBOs7W98Q6NPVGL-KJM6HBnzaduDZ5Zeq4';
const NOTIFICATION_SERVICE_URL = 'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

async function testFCMDirect() {
    console.log('\n🔔 Direct FCM Push Notification Test\n');
    console.log(`Token (prefix): ${TOKEN.slice(0, 30)}...`);
    console.log(`Service: ${NOTIFICATION_SERVICE_URL}\n`);

    // Test 1: Health check
    console.log('1️⃣  Health Check...');
    try {
        const healthRes = await fetch(`${NOTIFICATION_SERVICE_URL}/health`);
        const health = await healthRes.json();
        console.log(`   ✅ Service: ${health.service} v${health.version}`);
        console.log(`   Status: ${health.status}`);
        if (health.checks && health.checks.fcm) {
            console.log(`   FCM: ${health.checks.fcm}`);
        }
    } catch (e) {
        console.error(`   ❌ Health check failed: ${e.message}`);
        return;
    }

    // Test 2: Register device (already done, but let's confirm)
    console.log('\n2️⃣  Device Registration Status...');
    const userId = '550e8400-e29b-41d4-a716-446655440011';
    try {
        const devicesRes = await fetch(`${NOTIFICATION_SERVICE_URL}/api/notifications/devices/${userId}`);
        if (devicesRes.ok) {
            const devices = await devicesRes.json();
            if (devices.success && devices.data.length > 0) {
                console.log(`   ✅ Found ${devices.data.length} registered device(s)`);
                devices.data.forEach((d, i) => {
                    console.log(`      ${i + 1}. Platform: ${d.platform}, Token: ${d.token_prefix}...`);
                });
            } else {
                console.log(`   ⚠️  No devices registered for user`);
            }
        } else if (devicesRes.status === 403) {
            console.log(`   ℹ️  Device listing disabled in production (expected)`);
        }
    } catch (e) {
        console.log(`   ⚠️  Could not check devices: ${e.message}`);
    }

    // Test 3: Send via hexagon endpoint (POST /notifications with channel: push)
    console.log('\n3️⃣  Sending Push via Hexagon Endpoint...');
    try {
        const hexPayload = {
            userId,
            channel: 'push',
            template: 'custom',
            data: {
                title: '🎉 Test Push Notification',
                body: 'This is a direct test from the FCM test script. If you see this, background push works!',
                customData: {
                    type: 'test',
                    source: 'test-fcm-direct.js',
                    timestamp: new Date().toISOString()
                }
            }
        };

        console.log(`   Payload: ${JSON.stringify(hexPayload, null, 2).split('\n').map(l => '   ' + l).join('\n').trim()}`);
        
        const hexRes = await fetch(`${NOTIFICATION_SERVICE_URL}/notifications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hexPayload)
        });

        const hexResult = await hexRes.json();
        
        if (hexRes.ok && hexResult.success) {
            console.log(`   ✅ Push sent successfully!`);
            console.log(`      Notification ID: ${hexResult.data.id}`);
            console.log(`      Status: ${hexResult.data.status}`);
            console.log(`      Sent at: ${hexResult.data.sentAt}`);
        } else {
            console.log(`   ❌ Push failed`);
            console.log(`      Status: ${hexResult.data?.status || 'unknown'}`);
            console.log(`      Error: ${hexResult.data?.error || hexResult.message || 'unknown'}`);
            console.log(`      Full response: ${JSON.stringify(hexResult, null, 2)}`);
        }
    } catch (e) {
        console.error(`   ❌ Request failed: ${e.message}`);
    }

    // Test 4: Send via direct push endpoint (if available)
    console.log('\n4️⃣  Sending Push via Direct Endpoint...');
    try {
        const directPayload = {
            userId,
            title: '📱 Direct Push Test',
            body: 'Testing the /api/notifications/send-push endpoint directly',
            data: {
                type: 'direct_test',
                timestamp: new Date().toISOString()
            }
        };

        const directRes = await fetch(`${NOTIFICATION_SERVICE_URL}/api/notifications/send-push`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(directPayload)
        });

        if (directRes.status === 404) {
            console.log(`   ⚠️  Direct endpoint not available (404) - may need redeployment`);
        } else {
            const directResult = await directRes.json();
            
            if (directRes.ok && directResult.success) {
                console.log(`   ✅ Push sent successfully!`);
                console.log(`      Notification ID: ${directResult.data.notificationId}`);
                console.log(`      Sent at: ${directResult.data.sentAt}`);
            } else {
                console.log(`   ❌ Push failed: ${directResult.message}`);
            }
        }
    } catch (e) {
        console.error(`   ❌ Request failed: ${e.message}`);
    }

    console.log('\n✨ Test complete! Check your emulator for notifications.\n');
}

// Run the test
testFCMDirect().catch(err => {
    console.error('\n💥 Test failed:', err);
    process.exit(1);
});
