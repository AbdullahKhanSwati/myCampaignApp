// Network connectivity test utility
// Use this to debug network issues

import axios from 'axios';
import BaseUrl from '../../BaseUrl';

export const testBackendConnection = async () => {
  console.log('\n🔍 Testing Backend Connection...');
  console.log(`📍 BaseUrl: ${BaseUrl}\n`);

  try {
    // Test 1: Root endpoint
    const rootUrl = BaseUrl.replace('/api/v1', '');
    console.log(`Testing: ${rootUrl}`);
    
    const response = await axios.get(rootUrl, {
      timeout: 5000, // 5 second timeout
    });
    
    console.log('✅ SUCCESS: Backend is reachable!');
    console.log('Response:', response.data);
    return { success: true, data: response.data };
    
  } catch (error) {
    console.error('❌ FAILED: Backend is NOT reachable');
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.status,
    });
    
    // Provide helpful error messages
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Server is not running or not accessible on this IP');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      console.error('💡 Check your IP address - server might be on different network');
      console.error('💡 Or check Windows Firewall settings');
    } else if (error.message === 'Network Error') {
      console.error('💡 Network Error - Possible causes:');
      console.error('   1. Wrong IP address in BaseUrl.js');
      console.error('   2. Firewall blocking connection');
      console.error('   3. Phone and laptop on different WiFi');
      console.error('   4. Router AP isolation enabled');
    }
    
    return { success: false, error: error.message };
  }
};

// Test specific API endpoint
export const testAPIEndpoint = async (endpoint, params = {}) => {
  try {
    const url = `${BaseUrl}${endpoint}`;
    console.log(`\n🔍 Testing: ${url}`);
    console.log(`Params:`, params);
    
    const response = await axios.get(url, { params, timeout: 5000 });
    console.log('✅ SUCCESS');
    console.log('Response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ FAILED');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Server responded:', error.response.data);
    }
    return { success: false, error: error.message };
  }
};

