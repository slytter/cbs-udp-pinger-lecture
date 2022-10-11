const dgram = require('dgram');
const server = dgram.createSocket('udp4');


server.on('message', function (message, remote) {
    const reply = Buffer('pong');
    console.log('Got', message.toString());
    server.send(reply, 0, reply.length, remote.port, remote.address);
});

server.bind(6790, '0.0.0.0');
