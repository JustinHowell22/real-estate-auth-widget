const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { WebClient } = require('@slack/web-api');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

router.post('/send-code', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code

  try {
    await twilioClient.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    // Optionally send a notification to Slack
    await slackClient.chat.postMessage({
      channel: process.env.SLACK_CHANNEL_ID,
      text: `Verification code sent to ${phone}: ${verificationCode}`,
    });

    // Store the code in memory or a database for verification
    // This example uses a simple in-memory store
    req.app.locals.verificationCodes = req.app.locals.verificationCodes || {};
    req.app.locals.verificationCodes[phone] = verificationCode;

    return res.status(200).json({ message: 'Verification code sent.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send verification code.' });
  }
});

router.post('/verify-code', (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ error: 'Phone number and code are required.' });
  }

  const storedCode = req.app.locals.verificationCodes && req.app.locals.verificationCodes[phone];

  if (storedCode && storedCode === code) {
    delete req.app.locals.verificationCodes[phone]; // Remove the code after verification
    return res.status(200).json({ message: 'Verification successful.' });
  } else {
    return res.status(400).json({ error: 'Invalid verification code.' });
  }
});

module.exports = router;