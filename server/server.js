const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const accountSid =process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const app = express();
const port = "8000";

app.get('/alert', (req, res) => {
    console.log("invoked");
    client.messages
        .create({
            body: 'Crash happened in Blanchardstown',
            messagingServiceSid: process.env.TWILIO_MESSAGE_SID,
            to: process.env.LIBERTY_CRASH_SUPPORT_NUM
        })
        .then(message => console.log(message.sid))
        .done();
    res.send('Sent message');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
