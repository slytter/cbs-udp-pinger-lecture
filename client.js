const dgram = require('dgram');
const client = dgram.createSocket('udp4');

let timeStamp;
const msg = 'ping';

// Sending a message to the server
client.send(msg, 0, msg.length, 6790, '0.0.0.0', function onSendMessage() {
    timeStamp = Date.now()
    console.log('Sent', msg, 'at time:', timeStamp);
});


// Listening for incomming messages from the server
client.on('message', function (incommingMessage, remote) {
    console.log('Received', incommingMessage.toString());
});