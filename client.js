const dgram = require('dgram');
const client = dgram.createSocket('udp4');


// Date.now() returner et UNIX timestamp (antal millisekunder siden 1. Januar 1970)
var timestamp = 0


const asyncTimeout = async (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}



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




const PORT = 6790;
const HOSTS = ['134.209.234.180', '167.172.32.197', '139.59.228.134', '161.35.224.80'];



function opgave1 (serverAdress) {
    // Sender en besked til serveren
    const message = 'ping'
    sendMessage(message, PORT, serverAdress).then(() => { 
        timestamp = Date.now();
        console.log('sent', message, 'at time', timestamp);
    })
    
    
    // Opgave 1: Udregn svartiden fra serveren ved brug af Date.now()
    // Lytter til svar fra serveren
    client.on('message', function (incommingMessage, remote) {
        console.log('Received', incommingMessage.toString());
        const receivedTime = Date.now();
        const roundTripTime = receivedTime - timestamp;
        console.log('Round trip time:', roundTripTime, 'ms');
    });
}





// Opgave 1 del 2 - Send 10 requests og udregn gennemsnits svartiden
async function opgave1Del2 (serverAdress, amount = 10, delay = 500) {
    // Sender en besked til serveren
    const message = 'ping'
    const receivedTimeStamps = [];
    const sendTimeStamps = [];
    
    client.on('message', function (incommingMessage, remote) {
        const receivedTime = Date.now();
        receivedTimeStamps.push(receivedTime);

        // Samler alle svar tider
        const roundTripTimes = []
        receivedTimeStamps.forEach((receivedTime, index) => {
            roundTripTimes.push(receivedTime - sendTimeStamps[index])
        })

        // Udregn gennemsnitlig svartid
        let roundTripTimeSum = 0
        roundTripTimes.forEach((roundTripTime) => {
            roundTripTimeSum += roundTripTime;
        })
        const averageRoundTripTime = roundTripTimeSum / roundTripTimes.length;
        console.log('Received message. Average RTT:', averageRoundTripTime, 'ms');    
    });

    for (let i = 0; i < amount; i++) {
        await asyncTimeout(delay)
        await sendMessage(message, PORT, serverAdress).then(() => { 
            timestamp = Date.now();
            sendTimeStamps.push(timestamp);
            console.log('sent', message, 'at time', timestamp);
        })
    }
}




function opgave2 (serverAdress = []) {
    // Sender en besked til serveren
    const message = 'ping'


    for (let i = 0; i < serverAdress.length; i++) {
        sendMessage(message, PORT, serverAdress[i]).then(() => { 
            timestamp = Date.now();
            console.log('sent', message, 'at time', timestamp);
        })
    }

    
    // Opgave 1: Udregn svartiden fra serveren ved brug af Date.now()
    // Lytter til svar fra serveren
    client.on('message', function (incommingMessage, remote) {
        console.log('Received', incommingMessage.toString());
        const receivedTime = Date.now();
        const roundTripTime = receivedTime - timestamp;
        console.log('Round trip time:', roundTripTime, 'ms');
    });
}

opgave1('0.0.0.0')
// opgave1Del2('0.0.0.0', 10, 1000)
// opgave2(HOSTS)


