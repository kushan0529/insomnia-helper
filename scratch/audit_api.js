const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

async function testAI() {
  try {
    const res = await axios.post('http://localhost:5001/api/ai/depression-check', {
      answers: { q1: 'ALWAYS' }
    });
    console.log('AI Response:', res.data);
  } catch (err) {
    console.error('AI Error:', err.response?.data || err.message);
  }
}

async function testRegister() {
  try {
    const res = await axios.post('http://localhost:5001/api/auth/register', {
      username: 'testuser' + Math.random(),
      email: 'test' + Math.random() + '@test.com',
      password: 'password123',
      city: 'TestCity',
      sleepIssueCategory: 'General',
      isDepressed: false,
      isAnonymous: true
    });
    console.log('Register Success:', res.data);
  } catch (err) {
    console.error('Register Error:', err.response?.data || err.message);
  }
}

testAI().then(testRegister);
