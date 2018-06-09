var twilio= require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

client.messages
    .create({
    to: process.env.MY_PHONE_NUMBER,
    from:  process.env.TWILIO_PHONE, 
    body: 'These are not the drones you are looking for'
})
.then((message)=> console.log(message.sid))
