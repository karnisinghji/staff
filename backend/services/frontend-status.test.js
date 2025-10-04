const axios = require('axios');

describe('Frontend Status', () => {
  it('should return the correct page title', async () => {
    const response = await axios.get('https://karnisinghji.github.io/staff/');
    expect(response.status).toBe(200);
    expect(response.data).toContain('<title>Contractor Worker Platform</title>');
  });
});
