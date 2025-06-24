const webSocket = require('ws')  // 외부 라이브러리 'ws'사용
 
let sockets = []  // 연결된 소켓들을 담을 배열
module.exports = (server) => {
 
    // 웹소켓 기능 구현
    const wss = new webSocket.Server({ server }) // express와 포트 공유하기
    // const wss = new webSocket.Server({ port: 3001 })  // 포트 나누기
 
    // 웹소켓에서는 이벤트로 내용을 처리
    // 임의로 이벤트명을 지정할 수도 있지만, 기본적으로 가지고 있는 이벤트명도 존재
    // 커넥션이 일어나는 시점을 잡아서 코딩하기 위해 이벤트를 명시해주는 것 (이벤트 기법)
    wss.on('connection', (ws, req)=>{
        
 
        ws.id = req.headers['sec-websocket-key']
        // sec-websocket-key를 통해 웹소켓 식별
        sockets.push(ws)
        // 연결이 될 때마다 sockets 배열에 소켓을 넣어준다.
        console.log(sockets.length)
        
        ws.on('close', (code, reason)=>{
            // code : 연결이 종료되는 이유를 가르키는 숫자
            // 기본값은 1000
            // reason : 왜 종료되는지 사람이 읽을 수 있도록 나타내는 문자열
            // utf-8 포멧 123바이트를 넘을 수 없다.
            
            console.log('고객이 도망쳤다!!')
            sockets = sockets.filter(v=>{
                console.log(ws.id === v.id)
                return ws.id !== v.id
            })
            console.log(sockets.length)
            // sockets 배열의 length를 통해 연결이 끊긴 것을 확인할 수 있다.
        })
 
 
        // 브라우저로부터 온 메세지 받기
        ws.on('message', (response)=>{
            let obj = JSON.parse(response.toString())
            let {type, data} = obj
 
            switch(type) {
                case 'send_msg':
                    sockets.forEach( v => v.send(data) )
                break;
            }
        })
    })
}