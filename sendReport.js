const fs = require('fs');
const twilio = require('twilio');

// Read environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const to         = process.env.TWILIO_TO;
const from       = process.env.TWILIO_FROM;

// Load Playwright report
const reportPath = './report.json';
let summary = '⚠️ Playwright report not found.';

if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  const total = report.suites
    .flatMap(suite => suite.specs)
    .reduce((sum, spec) => sum + spec.tests.length, 0);

  const passed = report.suites
    .flatMap(suite => suite.specs)
    .flatMap(spec => spec.tests)
    .filter(test => test.results.some(r => r.status === 'passed')).length;

  const failed = report.suites
    .flatMap(suite => suite.specs)
    .flatMap(spec => spec.tests)
    .filter(test => test.results.some(r => r.status === 'failed')).length;

  const timestamp = new Date().toLocaleString();

  summary = `🧪 *Test Report Summary*\n` +
            `--------------------------\n` +
            `📦 Total Tests: ${total}\n` +
            `✅ Passed: ${passed}\n` +
            `❌ Failed: ${failed}\n` +
            `--------------------------\n` +
            `🕓 Time: ${timestamp}`;
}

// Send message via Twilio
const client = twilio(accountSid, authToken);
client.messages
  .create({
    body: summary,
    from,
    to,
  })
  .then(message => {
    console.log(`✅ WhatsApp report sent: ${message.sid}`);
  })
  .catch(error => {
    console.error('❌ Failed to send WhatsApp message:', error.message);
  });
