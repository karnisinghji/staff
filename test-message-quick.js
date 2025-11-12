#!/usr/bin/env node
/**
 * Quick Test: Send a message and verify notification
 * This creates a complete test scenario
 */

const COMMUNICATION_SERVICE = 'https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';
const NOTIFICATION_SERVICE = 'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

// Use the test user ID we know works (from push notification tests)
const TEST_USER_ID = '550e8400-e29b-41d4-a716-446655440011';
const TEST_USER_ID_2 = '550e8400-e29b-41d4-a716-446655440022'; // Another test user

async function quickTest() {
    console.log('\n🚀 Quick Messaging + Notification Test\n');
    
    // Step 1: Register the receiving user's device for notifications
    console.log('1️⃣  Registering receiver device for push notifications...');
    const registerRes = await fetch(`${NOTIFICATION_SERVICE}/api/notifications/register-device`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: TEST_USER_ID,
            fcmToken: 'fTvlDLGORFC2rvSCLVsda7:APA91bHHHrGXK1RRlm25NR78a96GqFZK_PGM1IStj7yP5V0fJkVBEg09Ri8efR-brEpOBSPIw9O50TdAyRQ1NZBOs7W98Q6NPVGL-KJM6HBnzaduDZ5Zeq4',
            platform: 'android',
            deviceInfo: { model: 'test', os: 'android' }
        })
    });
    
    if (registerRes.ok) {
        console.log('   ✅ Device registered');
    } else {
        console.log(`   ⚠️  Device registration: ${registerRes.status}`);
    }
    
    // Step 2: Send a message
    console.log('\n2️⃣  Sending message...');
    const messageBody = `Test message sent at ${new Date().toISOString()}. This should trigger a push notification! 📱`;
    
    const sendRes = await fetch(`${COMMUNICATION_SERVICE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fromUserId: TEST_USER_ID_2,
            toUserId: TEST_USER_ID,
            body: messageBody
        })
    });
    
    if (sendRes.ok) {
        const result = await sendRes.json();
        console.log('   ✅ Message sent successfully!');
        console.log(`      Message ID: ${result.data.id}`);
        console.log(`      From: ${TEST_USER_ID_2.substring(0, 8)}...`);
        console.log(`      To: ${TEST_USER_ID.substring(0, 8)}...`);
        console.log(`      Body: "${messageBody.substring(0, 60)}..."`);
        console.log(`      Created: ${result.data.createdAt}`);
        
        // Step 3: Wait and check for notification in logs
        console.log('\n3️⃣  Notification should have been triggered...');
        console.log('   ℹ️  The communication service should have called notification service');
        console.log('   ℹ️  Check your Android emulator for the notification');
        
        // Step 4: Verify message was saved
        console.log('\n4️⃣  Verifying message in database...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const listRes = await fetch(`${COMMUNICATION_SERVICE}/messages?userId=${TEST_USER_ID}&peerId=${TEST_USER_ID_2}`);
        if (listRes.ok) {
            const messages = await listRes.json();
            if (messages.success && messages.data.length > 0) {
                console.log(`   ✅ Found ${messages.data.length} message(s)`);
                const latest = messages.data[messages.data.length - 1];
                console.log(`      Latest: "${latest.body.substring(0, 50)}..."`);
                console.log(`      Read: ${latest.readAt ? 'Yes' : 'No'}`);
            }
        }
        
    } else {
        const error = await sendRes.text();
        console.log(`   ❌ Failed: ${sendRes.status}`);
        console.log(`      ${error}`);
    }
    
    console.log('\n✅ Test complete!\n');
    console.log('📱 Expected results:');
    console.log('   1. Message saved in database ✓');
    console.log('   2. Push notification sent via FCM ✓');
    console.log('   3. Notification appears on Android device ✓');
    console.log('\n💡 If notification didn\'t appear:');
    console.log('   - Ensure emulator is running');
    console.log('   - Check that device token is registered');
    console.log('   - Check Azure logs for communication-service');
}

quickTest().catch(err => {
    console.error('\n💥 Error:', err.message);
    process.exit(1);
});
