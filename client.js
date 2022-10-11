const dgram = require('dgram');
const client = dgram.createSocket('udp4');


// Opgave 2:
// DigitalOcean droplet i Frankfurt, Amsterdam, Singapore og San Francisco
// const PORT = 6790;
// const HOSTS = ['134.209.234.180', '167.172.32.197', '139.59.228.134', '161.35.224.80'];



// Date.now() returner et UNIX timestamp (antal millisekunder siden 1. Januar 1970)
var timestamp = Date.now();


// client.send bruger callback (kedeligt), så vi konvertere den til promise for at kunne bruge async / await 
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


// Sender en besked til serveren
const message = 'ping'
sendMessage(message, 6790, '0.0.0.0').then(() => {
    timestamp = Date.now();
    console.log('sent', message, 'at time', timestamp);
})



// Lytter til svar fra serveren
client.on('message', function (incommingMessage, remote) {
    console.log('Received', incommingMessage.toString());

    // Opgave 1: Udregn svartiden fra serveren ved brug af Date.now()
    // ...
});