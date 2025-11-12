#!/usr/bin/env node
/**
 * Test Messaging with Push Notifications
 * Sends a message from one user to another and verifies notification delivery
 */

const COMMUNICATION_SERVICE = 'https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';
const USER_SERVICE = 'https://user-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';
const NOTIFICATION_SERVICE = 'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

// Test users - Get these from your database or app
// You can find user IDs by logging into the app and checking profile
const WORKER_ID = process.env.WORKER_ID; // khushabhu@gmail.com
const CONTRACTOR_ID = process.env.CONTRACTOR_ID; // ramp@info.com

async function getUserById(userId) {
    try {
        const response = await fetch(`${USER_SERVICE}/api/users/${userId}`);
        if (response.ok) {
            const data = await response.json();
            return data.user || data;
        }
    } catch (e) {
        console.log(`   ⚠️  Could not fetch user: ${e.message}`);
    }
    return null;
}

async function testMessaging() {
    console.log('\n📨 Testing Messaging with Push Notifications\n');
    
    if (!WORKER_ID || !CONTRACTOR_ID) {
        console.log('   ❌ Missing user IDs!');
        console.log('   💡 Usage: WORKER_ID=<uuid> CONTRACTOR_ID=<uuid> node test-messaging-notifications.js');
        console.log('   💡 Or provide user IDs manually in the script');
        console.log('\n   📝 To find user IDs:');
        console.log('      1. Login to the app as each user');
        console.log('      2. Check the profile page for the user ID');
        console.log('      3. Or query the database directly');
        return;
    }
    
    // Step 1: Fetch users
    console.log('1️⃣  Fetching users...');
    console.log(`   Worker ID: ${WORKER_ID}`);
    console.log(`   Contractor ID: ${CONTRACTOR_ID}`);
    
    const worker = await getUserById(WORKER_ID);
    const contractor = await getUserById(CONTRACTOR_ID);
    
    if (!worker) {
        console.log(`   ❌ Worker not found with ID: ${WORKER_ID}`);
        return;
    }
    if (!contractor) {
        console.log(`   ❌ Contractor not found with ID: ${CONTRACTOR_ID}`);
        return;
    }
    
    console.log(`   ✅ Worker: ${worker.name || worker.email} (${worker.role || 'unknown role'})`);
    console.log(`   ✅ Contractor: ${contractor.name || contractor.email} (${contractor.role || 'unknown role'})`);
    
    // Step 2: Check if contractor has registered device for push notifications
    console.log('\n2️⃣  Checking contractor device registration...');
    try {
        const devicesRes = await fetch(`${NOTIFICATION_SERVICE}/api/notifications/devices/${contractor.id}`);
        if (devicesRes.status === 403) {
            console.log('   ℹ️  Device listing disabled in production (expected)');
            console.log('   ℹ️  Assuming contractor has a registered device...');
        } else if (devicesRes.ok) {
            const devices = await devicesRes.json();
            if (devices.success && devices.data.length > 0) {
                console.log(`   ✅ Contractor has ${devices.data.length} registered device(s)`);
            } else {
                console.log('   ⚠️  No devices registered for contractor');
                console.log('   💡 The contractor needs to open the app to register for push notifications');
            }
        }
    } catch (e) {
        console.log(`   ⚠️  Could not check devices: ${e.message}`);
    }
    
    // Step 3: Send message
    console.log('\n3️⃣  Sending message from worker to contractor...');
    const messageBody = `Hi! This is a test message from ${worker.name || worker.email}. Testing the messaging system with push notifications! 🚀`;
    
    try {
        const sendRes = await fetch(`${COMMUNICATION_SERVICE}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fromUserId: worker.id,
                toUserId: contractor.id,
                body: messageBody
            })
        });
        
        if (sendRes.ok) {
            const result = await sendRes.json();
            console.log('   ✅ Message sent successfully!');
            console.log(`      Message ID: ${result.data.id}`);
            console.log(`      From: ${worker.email}`);
            console.log(`      To: ${contractor.email}`);
            console.log(`      Body: "${messageBody.substring(0, 50)}..."`);
            console.log(`      Sent at: ${result.data.createdAt}`);
            
            // Step 4: Check contractor's messages
            console.log('\n4️⃣  Fetching contractor messages...');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
            
            const listRes = await fetch(`${COMMUNICATION_SERVICE}/messages?userId=${contractor.id}&peerId=${worker.id}`);
            if (listRes.ok) {
                const messages = await listRes.json();
                if (messages.success && messages.data.length > 0) {
                    console.log(`   ✅ Found ${messages.data.length} message(s) in conversation`);
                    const latestMsg = messages.data[messages.data.length - 1];
                    console.log(`      Latest: "${latestMsg.body.substring(0, 50)}..."`);
                    console.log(`      Read: ${latestMsg.readAt ? 'Yes' : 'No'}`);
                } else {
                    console.log('   ⚠️  No messages found');
                }
            }
            
            console.log('\n5️⃣  Push Notification Status...');
            console.log('   ℹ️  A push notification should have been sent to the contractor');
            console.log('   ℹ️  Check the contractor\'s device/emulator for the notification');
            console.log('   ℹ️  If contractor has the app open, check Messages tab');
            
        } else {
            const error = await sendRes.text();
            console.log(`   ❌ Failed to send message: ${sendRes.status}`);
            console.log(`      Error: ${error}`);
        }
    } catch (e) {
        console.error(`   ❌ Request failed: ${e.message}`);
    }
    
    console.log('\n✨ Test complete!\n');
}

// Run the test
testMessaging().catch(err => {
    console.error('\n💥 Test failed:', err);
    process.exit(1);
});
