const net = require("net");
const port = 9010;

const server = net.createServer()// 서버 객체 반환하는 함수 .createServer

const message = `HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Thu, 31 Aug 2023 02:09:17 GMT
ETag: W/"109-18a495a1d6c"
Date: Thu, 31 Aug 2023 02:10:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        Hello world!
</script>
</body>
</html>
`

//위 서버 객체를 사용 할 수 있게 listen 상태로 만들어 줌
server.listen(port, () => {
    console.log("server is running localhost:"+port);//listen 상태가 되면 실행하는 콜백함수
})

server.on("connection", (sock) => {//서버에 클라이언트가 연결되었을 때
    console.log("connected");
    sock.write('server to client');

    sock.write(message)
    sock.end();

    //여기에 여러가지 동작을 추가함
    sock.on('data', (data) => {
        console.log(data);
    })
});

server.on('close', () => {
    console.log('closed');
})