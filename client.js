const dgram = require('dgram');
const client = dgram.createSocket('udp4');

// client.send bruger callback (kedeeeligt), så vi konvertere den til promise for at kunne bruge async / await 
function sendMessage(message, port, host) {
    return new Promise((resolve, reject) => {
        client.send(message, 0, message.length, port, host, (error, bytes) => {
            if (error) {
                return reject(error);
            } 
            return resolve(bytes);
        })
    })
}

// Lytter til svar fra serveren
client.on('message', function (incommingMessage, remote) {
    console.log('Received', incommingMessage.toString());
});


// Sender en besked til serveren
sendMessage('ping', 6790, '0.0.0.0').then(() => {
    console.log('sent ping');
})

