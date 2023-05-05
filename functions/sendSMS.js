const accountSid = 'ACf343f669e3c4b09f9e6786a6f39aa6d4';
const authToken = '1657d50354be941c3d78855c7fd4c8fa';
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: 'your_twilio_phone_number',
      to: phoneNumber
    });
    return response.sid;
  } catch (error) {
    console.error(error);
    return null;
  }
};
