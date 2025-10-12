// Test script for Netlify Functions
// Run with: node test-functions.js

const https = require('https');

const BASE_URL = 'https://your-site-name.netlify.app'; // Replace with your actual Netlify URL

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'your-site-name.netlify.app', // Replace with your actual domain
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            data: parsed
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testFunctions() {
  console.log('🧪 Testing Netlify Functions...\n');

  try {
    // Test 1: Get customers
    console.log('1. Testing GET /api/customers...');
    const customersResponse = await makeRequest('/api/customers');
    console.log(`   Status: ${customersResponse.status}`);
    console.log(`   Response:`, customersResponse.data);
    console.log('');

    // Test 2: Create customer
    console.log('2. Testing POST /api/customers...');
    const newCustomer = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company'
    };
    const createResponse = await makeRequest('/api/customers', 'POST', newCustomer);
    console.log(`   Status: ${createResponse.status}`);
    console.log(`   Response:`, createResponse.data);
    console.log('');

    // Test 3: Get invoices
    console.log('3. Testing GET /api/invoices...');
    const invoicesResponse = await makeRequest('/api/invoices');
    console.log(`   Status: ${invoicesResponse.status}`);
    console.log(`   Response:`, invoicesResponse.data);
    console.log('');

    // Test 4: Password reset
    console.log('4. Testing POST /api/auth/reset-password...');
    const resetResponse = await makeRequest('/api/auth/reset-password', 'POST', {
      email: 'test@example.com'
    });
    console.log(`   Status: ${resetResponse.status}`);
    console.log(`   Response:`, resetResponse.data);
    console.log('');

    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Instructions
console.log('📋 Instructions:');
console.log('1. Replace "your-site-name.netlify.app" with your actual Netlify URL');
console.log('2. Make sure your site is deployed');
console.log('3. Run: node test-functions.js');
console.log('');

// Uncomment the line below to run tests
// testFunctions();

console.log('💡 Uncomment the last line in this file to run the tests!');
