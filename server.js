const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const reply = new Buffer('pong');

server.on('message', function (message, remote) {
    console.log('Got', message.toString());
    server.send(reply, 0, reply.length, remote.port, remote.address);
});

server.bind(6790, '0.0.0.0');
