const net = require('net');
const express = require("express");
const app = express();

const ptyhon_port = 9010
let clients = [];
let users = [];

app.get('/', (req, res) => {
    res.json({clients: users});
});

async function sendToClients(data) {
    clients.forEach((client) => {
        client.write(JSON.stringify(data));
    });
}

const server = net.createServer((client) => {
    client.setEncoding('utf8');

    client.on('data', (dataInput) => {
        const data = JSON.parse(dataInput);
        console.log(`${data.kind}: ${data.msg}`);

        if(data.kind == "Disconnect"){
            sendToClients({
                from: data.from,
                msg: "님이 연결을 종료하였습니다."
            });
        }

        if(data.kind == "Join"){
            clients.push(client);
            users.push(data.from);

            sendToClients({
                from: data.from,
                msg: "님이 접속하였습니다."
            });
        }

        if(data.kind == "Msg"){
            sendToClients({
                from: data.from,
                msg: data.msg
            });
        }


    });

    // clients.push(client);

    // client.on('close', () => {console.log('someone left')});

    client.on('error', (err) => {})
});

server.on('error', (err) => {
    console.log(err);
})

server.listen(python_port, () => {
    console.log('python server started');

    server.on('close', () => {
        console.log('python server closed');
    })
})

server.listen(express_port, () => {
    console.log('web server started');
    server.on('close', () =>{
        console.log('web server closed')
    })
})

app.listen(9011, () => {console.log("web console is running in localhost:9011");});