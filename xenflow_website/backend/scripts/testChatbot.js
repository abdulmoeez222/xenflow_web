/**
 * Chatbot Test Script
 * Tests the chatbot API endpoint to ensure everything works
 * 
 * Run: node scripts/testChatbot.js
 */

require('dotenv').config();
const http = require('http');
const { randomUUID } = require('crypto');

const API_URL = process.env.API_URL || 'http://localhost:5000';
const testQueries = [
  'What services do you offer?',
  'How much does it cost?',
  'Tell me about AI chatbots',
  'What is your process?',
  'Can you integrate with our systems?',
  'How long does implementation take?'
];

function makeRequest(query, sessionId = null) {
  return new Promise((resolve, reject) => {
    // Don't send sessionId if not provided (backend will generate one)
    const body = { message: query };
    if (sessionId) {
      body.sessionId = sessionId;
    }
    
    const postData = JSON.stringify(body);

    const url = new URL(`${API_URL}/api/chat`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 30000
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
            return;
          }

          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject(new Error(`Parse error: ${error.message}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Chatbot API\n');
  console.log(`📍 API URL: ${API_URL}\n`);

  let passed = 0;
  let failed = 0;
  let sessionId = null; // Will be set from first response

  for (let i = 0; i < testQueries.length; i++) {
    const query = testQueries[i];
    console.log(`\n[${i + 1}/${testQueries.length}] Testing: "${query}"`);
    
    try {
      const startTime = Date.now();
      const response = await makeRequest(query, sessionId);
      const duration = Date.now() - startTime;

      if (response.success && response.message) {
        console.log(`✅ PASS (${duration}ms)`);
        console.log(`   Intent: ${response.intent || 'N/A'}`);
        console.log(`   Response: ${response.message.substring(0, 100)}...`);
        
        // Use sessionId from first response for subsequent requests
        if (!sessionId && response.sessionId) {
          sessionId = response.sessionId;
        }
        
        passed++;
      } else {
        console.log(`❌ FAIL: Invalid response format`);
        console.log(`   Response:`, response);
        failed++;
      }
    } catch (error) {
      console.log(`❌ FAIL: ${error.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(50));

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Chatbot is ready for production.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test script error:', error);
  process.exit(1);
});