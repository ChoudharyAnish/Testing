const twilio = require('twilio');
const fs = require('fs');

const results = JSON.parse(fs.readFileSync('test-results.json', 'utf-8'));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const to = process.env.TWILIO_TO;
const from = process.env.TWILIO_FROM;

let total = 0, passed = 0;

for (const suite of results.suites) {
  for (const test of suite.tests) {
    total++;
    if (test.status === 'passed') passed++;
  }
}
const failed = total - passed;

const message = `
🧪 *Test Status Report*
Total Tests: ${total}
✅ Passed: ${passed}
❌ Failed: ${failed}
`;

client.messages.create({ body: message, from, to })
  .then(msg => console.log("✅ WhatsApp report sent:", msg.sid))
  .catch(console.error);
