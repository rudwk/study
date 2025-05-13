const net = require('net');

//net.connect 메서드를 호출하면 node.js가 서버에 SYN 패킷? 을 전송해 연결 시도함 -> 3 way handshake
const sock = net.connect({port: 9010, host: 'localhost'});

//각종 동작 혹은 이벤트 리스너가 추가됨

sock.on("connect", () => {
    console.log("connected");
})