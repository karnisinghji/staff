const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYTYzZWUyMy0wYzEyLTQxYTYtOTIzYi1mYWQyNWM3Y2M1ZWIiLCJyb2xlcyI6WyJ3b3JrZXIiXSwiaWF0IjoxNzU5MjkzNTM0LCJleHAiOjE3NTkyOTQ0MzR9.YZGAHwDT_QwOQqRR2qrFZIgxWBAYZmY2oqF49__zOPs';
const secret = 'shared-jwt-secret-for-development';

try {
  const decoded = jwt.verify(token, secret);
  console.log('Token decoded successfully:', JSON.stringify(decoded, null, 2));
  
  const authUser = {
    id: decoded.sub || decoded.id,
    email: decoded.email || '',
    role: decoded.roles?.[0] || decoded.role || 'user'
  };
  console.log('Mapped AuthUser:', JSON.stringify(authUser, null, 2));
} catch (error) {
  console.error('JWT verification failed:', error.message);
}