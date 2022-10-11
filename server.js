const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', function (message, remote) {
    const reply = 'pong';
    console.log('Received', message.toString());
    console.log('Replying with', reply)
    server.send(reply, 0, reply.length, remote.port, remote.address);
});

server.bind(6790, '0.0.0.0');
