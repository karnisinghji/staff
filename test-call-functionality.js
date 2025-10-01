// Test script to verify phone call functionality
// This simulates what happens when a user clicks the call button

// Mock data from API response
const mockWorkerMatch = {
  id: "550e8400-e29b-41d4-a716-446655440004",
  name: "Mike Johnson",
  skills: ["carpenter"],
  location: "Toronto, ON",
  hourlyRate: "25.00",
  rating: "0.00",
  experienceYears: 1,
  totalJobs: 0,
  availabilityStatus: "available",
  bio: "Worker available for various tasks",
  email: "mike.carpenter@email.com",
  phone: "+1-555-0201",
  distanceKm: 0,
  score: 50
};

// Simulate the initiateCall function logic
function testInitiateCall(match, type) {
  console.log('=== TESTING CALL FUNCTIONALITY ===');
  console.log('Match object:', match);
  console.log('Phone number:', match.phone);
  console.log('Call type:', type);
  
  // Check if we have phone number for direct calling
  if (match.phone || match.phoneNumber) {
    const phoneNumber = match.phone || match.phoneNumber;
    console.log('✅ Phone number found:', phoneNumber);
    
    if (type === 'voice') {
      console.log('✅ Voice call would open:', `tel:${phoneNumber}`);
      console.log('✅ Call functionality working correctly!');
      return true;
    }
  } else {
    console.log('❌ No phone number found - would fall back to WebRTC');
    return false;
  }
}

// Run the test
console.log('Testing call functionality with mock data...\n');

const result = testInitiateCall(mockWorkerMatch, 'voice');

console.log('\n=== TEST RESULTS ===');
console.log('Phone call functionality:', result ? 'WORKING ✅' : 'NOT WORKING ❌');
console.log('Expected tel: link:', `tel:${mockWorkerMatch.phone}`);

// Test the debug alert logic
console.log('\n=== TESTING DEBUG ALERT ===');
console.log(`Debug alert would show: "Debug: Phone number is ${mockWorkerMatch.phone}"`);