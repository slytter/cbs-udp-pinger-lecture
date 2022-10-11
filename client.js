const dgram = require('dgram');
const client = dgram.createSocket('udp4');

let timeStamp;
const msg = 'ping';

// Sender en besked til serveren
client.send(msg, 0, msg.length, 6790, '0.0.0.0', function onSendMessage() {
    timeStamp = Date.now()
    console.log('Sent', msg, 'at time:', timeStamp);
});


// Lytter til svar fra serveren
client.on('message', function (incommingMessage, remote) {
    console.log('Received', incommingMessage.toString());
});