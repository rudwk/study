const net = require('net');
const express = require('express');
const app = express();

const port = 9010
app.use(express.static('static'))

const client = net.connect({port: port, host: "localhost"}, () => {
    console.log('server connected');
    
    this.on('data', (dataInput) => {
        data = JSON.stringify(dataInput);
    })
});

app.post('/send', (req, res) => {
    const from = req.body.from;
    const msg = req.body.msg;
    
    client.write()
    
    return res.json({from: data.from, msg: data.msg});
});