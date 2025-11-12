// Test messaging between real users: khushabhu@gmail.com → ramp@info.com

const AUTH_SERVICE_URL = 'https://auth-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';
const NOTIFICATION_SERVICE_URL = 'https://notification-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';
const COMMUNICATION_SERVICE_URL = 'https://communication-service.delightfulflower-04821c4b.southeastasia.azurecontainerapps.io';

// Real user IDs from database
const WORKER_ID = '62943651-719e-4b59-a935-960e15905d28'; // khushabhu@gmail.com (Karni Singh - Worker)
const CONTRACTOR_ID = 'a254804f-ab75-475b-bcfd-20da0f80655e'; // ramp@info.com (Ram Singh - Contractor)

// For testing, we'll use the test FCM token from our emulator
const TEST_FCM_TOKEN = 'fTvlDLGORFC2rvSCLVsda7:APA91bHHHrGXK1RRlm25NR78a96GqFZK_PGM1IStj7yP5V0fJkVBEg09Ri8efR-brEpOBSPIw9O50TdAyRQ1NZBOs7W98Q6NPVGL-KJM6HBnzaduDZ5Zeq4';

async function registerDeviceForContractor() {
    console.log('\n1️⃣  Registering device for contractor (ramp@info.com)...');
    
    try {
        const response = await fetch(`${NOTIFICATION_SERVICE_URL}/api/notifications/register-device`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: CONTRACTOR_ID,
                fcmToken: TEST_FCM_TOKEN,
                platform: 'android',
                deviceInfo: {
                    model: 'Pixel 4 (Test)',
                    os: 'Android 13',
                    appVersion: '1.0.0'
                }
            })
        });

        if (response.ok) {
            console.log('   ✅ Device registered for Ram Singh (contractor)\n');
            return true;
        } else {
            const error = await response.text();
            console.log(`   ⚠️  Registration response: ${response.status} - ${error}\n`);
            return false;
        }
    } catch (err) {
        console.error('   ❌ Error registering device:', err.message, '\n');
        return false;
    }
}

async function sendMessageFromWorkerToContractor() {
    console.log('2️⃣  Sending message from worker to contractor...');
    console.log('   From: Karni Singh (khushabhu@gmail.com) - Worker');
    console.log('   To: Ram Singh (ramp@info.com) - Contractor\n');
    
    try {
        const messageBody = `Hi Ram! This is Karni. Are you available for a project? Sent at ${new Date().toISOString()}`;
        
        const response = await fetch(`${COMMUNICATION_SERVICE_URL}/api/communication`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fromUserId: WORKER_ID,
                toUserId: CONTRACTOR_ID,
                body: messageBody
            })
        });

        if (response.ok) {
            const message = await response.json();
            console.log('   ✅ Message sent successfully!');
            console.log(`   Message ID: ${message.id}`);
            console.log(`   Body: "${message.body.substring(0, 60)}..."`);
            console.log(`   Sent at: ${message.createdAt}\n`);
            return true;
        } else {
            const error = await response.text();
            console.log(`   ❌ Failed to send message: ${response.status} - ${error}\n`);
            return false;
        }
    } catch (err) {
        console.error('   ❌ Error sending message:', err.message, '\n');
        return false;
    }
}

async function main() {
    console.log('\n🚀 Real User Messaging Test');
    console.log('=====================================\n');
    console.log('Testing: Worker sends message to Contractor');
    console.log('Expected: Contractor receives push notification\n');
    
    // Step 1: Register device for contractor
    const registered = await registerDeviceForContractor();
    if (!registered) {
        console.log('⚠️  Device registration failed, but continuing...\n');
    }
    
    // Step 2: Send message
    const sent = await sendMessageFromWorkerToContractor();
    
    console.log('3️⃣  Notification Status:');
    if (sent) {
        console.log('   ℹ️  The communication service should have triggered a notification');
        console.log('   ℹ️  Check your Android emulator for the push notification');
        console.log('   ℹ️  Check Azure logs with:\n');
        console.log('      az containerapp logs show --name communication-service --resource-group staff-sea-rg --type console --tail 50 | grep SendMessage\n');
    } else {
        console.log('   ❌ Message sending failed, notification was not triggered\n');
    }
    
    console.log('4️⃣  Verification:');
    console.log('   • Check Android logcat: adb logcat -d | grep -i "pushNotification"');
    console.log('   • Check notification service logs');
    console.log('   • Open app as Ram Singh to see the message\n');
    
    console.log('=====================================');
    console.log(sent ? '✅ Test Complete!' : '❌ Test Failed');
    console.log('=====================================\n');
}

main().catch(console.error);
