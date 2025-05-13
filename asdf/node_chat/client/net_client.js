const net = require('net');
const PORT = 9010;
const HOST = 'localhost';

let user;

const client = net.connect({port:PORT, host:HOST}, () => {
    console.log('connected');

    client.setTimeout(1000);

    client.on('data', (data)=>{
        console.log(data.toString());
    });

    client.on('end', () => {
        console.log('disconnected');
    });
    client.on('error', (err) =>{
        console.log(`${err}`);
    });
    client.on('close', () => {
        console.log('closed server');
    });
    client.setTimeout(36000, ()=>{
        console.log('you time out GETOUT!!!!!!!!');
    });

    user = client;
});

