const fetch = require('node-fetch');

async function getAuthToken() {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'worker@example.com',  // Use a default test account
        password: 'password123'       // Default test password
      })
    });

    if (!response.ok) {
      console.error(`Login failed: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(errorText);
      return null;
    }

    const data = await response.json();
    
    if (data.token) {
      console.log('Auth token obtained successfully!');
      console.log(`\nTOKEN: ${data.token}\n`);
      console.log('To test the matching service, run:');
      console.log(`node test-matching-service.js "${data.token}"`);
      return data.token;
    } else {
      console.error('No token received in response', data);
      return null;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

getAuthToken();