const express = require('express');
const net = require('net');
const app = express();
let sockets = [];//연결된 클라이언트 리스트

const webRouter = require('router/express_router')

//web-------------------------------------------------------
app.use(express.static("static"));
app.use('/web', webRouter);

app.listen(process.env.WEB_PORT, () => {
    console.log("web Server is running");
})

//pythons-------------------------------------------------------
// const net_server = net.createServer((client) => {
//     client.on('data', (data) => {//데이터 올때
//         let json = JSON.parse(data);
//         console.log(`: ${json}`);
//         client.write(json);
//         console.log(`data: ${data}`);
//     });
// });

// net_server.on('listening', () => {//listen 할 때
//     console.log('net server is listening');
//     console.log(`listening Server: ${JSON.stringify(this.address())}`)
// });

// net_server.on('error', (error)=>{
//     console.log(`${error}`);
// });

// net_server.listen(py_port, ()=>{

//     net_server.on('close', ()=> {
//         console.log('javascript user left');
//         net_server.close();
//     });

//     net_server.on('connection', ()=>{
//         console.log("javascript user is join");
//     });
// });
//--------------------------------------------------------

