const dgram = require('dgram');
const client = dgram.createSocket('udp4');


client.on('message', function (message, remote) {
    const reply = Buffer('ping');
    console.log('Got', message.toString());
    client.send(reply, 0, reply.length, 6790, '0.0.0.0');
});

client.send(reply, 0, reply.length, 6790, '0.0.0.0');
