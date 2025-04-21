const fs = require('fs');
const twilio = require('twilio');

// Load secrets from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const to = process.env.TWILIO_TO;
const from = process.env.TWILIO_FROM;

const client = twilio(accountSid, authToken);

// Read and parse Playwright JSON report
const raw = fs.readFileSync('test-results.json', 'utf-8');
const data = JSON.parse(raw);

// Counters
let total = 0, passed = 0, failed = 0;

// Navigate through test suites and count test outcomes
for (const topSuite of data.suites || []) {
  for (const suite of topSuite.suites || []) {
    for (const test of suite.tests || []) {
      total++;
      if (test.outcome === 'passed') passed++;
      else failed++;
    }
  }
}

// Format the WhatsApp message
const messageBody = `
🧪 *Test Report Summary*
--------------------------
📦 Total Tests: ${total}
✅ Passed: ${passed}
❌ Failed: ${failed}
--------------------------
🕓 Time: ${new Date().toLocaleString()}
`.trim();

// Send WhatsApp message via Twilio
client.messages
  .create({
    body: messageBody,
    from: `whatsapp:${from}`,
    to: `whatsapp:${to}`,
  })
  .then(message => {
    console.log(`WhatsApp report sent. SID: ${message.sid}`);
  })
  .catch(error => {
    console.error('Failed to send WhatsApp message:', error.message);
    process.exit(1);
  });
