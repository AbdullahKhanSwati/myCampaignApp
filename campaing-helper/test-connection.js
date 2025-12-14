// Quick test script to verify backend connection
// Run with: node test-connection.js

const axios = require('axios');
const BaseUrl = require('./BaseUrl.js').default || "http://192.168.100.3:5000/api/v1";

console.log('\n🔍 Testing Backend Connection...\n');
console.log(`📍 BaseUrl: ${BaseUrl}\n`);

// Test 1: Root endpoint
axios.get(BaseUrl.replace('/api/v1', ''))
  .then(response => {
    console.log('✅ Root endpoint test: SUCCESS');
    console.log('   Response:', JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.log('❌ Root endpoint test: FAILED');
    console.log('   Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('   💡 Server is not running or not accessible');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      console.log('   💡 Check your IP address - server might be on different network');
    }
  });

// Test 2: Stats endpoint (will fail without campaignId, but should reach server)
setTimeout(() => {
  axios.get(`${BaseUrl}/canvassing/stats`, {
    params: { campaignId: 'test' }
  })
    .then(response => {
      console.log('\n✅ Stats endpoint test: REACHED SERVER');
      console.log('   Response:', response.data.message || 'Success');
    })
    .catch(error => {
      if (error.response) {
        console.log('\n✅ Stats endpoint test: REACHED SERVER');
        console.log('   Server responded:', error.response.data.message || error.response.status);
      } else {
        console.log('\n❌ Stats endpoint test: FAILED TO REACH SERVER');
        console.log('   Error:', error.message);
      }
    });
}, 1000);

