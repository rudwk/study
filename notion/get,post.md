# Http Request Message

get과 host를 알기 위해서는 우선 http request message부터 알아야 한다.

![http_request_message.png](attachment:b0e21231-fdec-42b8-8a20-4e75827e9f97:http_request_message.png)

Request message는 크게 3가지로 나뉘는데

- status line
- header
- body

로 이루어져 있다.

### Status Line

http 매서드, request 주소, http 버전으로 이루어져있다.

- 매서드는 GET, POST, PUT 등등 무슨 http매서드로 요청했는지 알 수 있다.
- request주소는 말 그대로 request가 전송되는 주소다.
- http버전이 다르면 request 메세지 구조같은게 달라 질 수도 있어서 명시한다.

### Header

해당 request에 대한 정보를 담고 있는 부분.

Content-Lenght 등 [여러항목이](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers) key:value형식으로 구성되어 있다.

```php
ex)
host: localhost
Accept:text/html
Accept-Encoding: gzip, deflate
Connection: keep-alive
...
```

- **header 요소**
    - `Host` : 요청하려는 서버 호스트 이름과 포트번호
    - `User-agent` : 클라이언트 프로그램 정보. 이 정보를 통해 서버는 클라이언트 프로그램(브라우저)에 맞는 최적의 데이터를 보내줄 수 있다.
    - `Referer` : 바로 직전에 머물렀던 웹 링크 주소
    - `Accept` : 클라이언트가 처리 가능한 미디어 타입 종류 나열
    - `If-Modified-Since` : 여기에 쓰여진 시간 이후로 변경된 리소스 취득. 페이지가 수정되었으면 최신 페이지로 교체한다.
    - `Authorization` : 인증 토큰을 서버로 보낼 때 쓰이는 Header
    - `Origin` : 서버로 Post 요청을 보낼 때 요청이 어느 주소에 시작되었는지 나타내는 값. 이 값으로 요청을 보낸 주소와 받는 주소가 다르면 CORS(Cross-Origin Resource Sharing) 에러가 발생한다.
    - `Cookie` : 쿠키 값이 key-value로 표현된다.

### Body

해당 request의 내용을 담고 있는 부분.

보통 post요청일 경우 html폼 데이터가 담겨 있다.

또한 전송할 데이터가 없다면 빈 상태다.

```html
...(request header)...

{
	"id": "asdf1234",
	"pw": "qwer9876"
}
```

이 때 header와 body는 한칸의 빈 줄로 구분한다.

# Http Response Message

request message와 똑같이 status line, header, body로 이루어져있다.
req 메세지와 거의 같지만 다른 부분이 조금 있다.

### Status Line

이 또한 3개로 나누어져있다.

**HTTP version, StatusCode, StatusText**로 이루어져있다는게 차이점

```html
[버전] [스테이터스 코드] [텍스트]
HTTP/1.1 200 OK
```

header와 body 부분은 그냥 같다.

header에서 특정 항목이 바뀐다는것 정도(User-Agent → Server 등)

# Get

서버로부터 정보를 조회하는 매서드

- URL에 데이터가 포함됨
- 보안 약함
- 캐싱 가능함

Get은 reques를 전송할 때 Body가 아니라 쿼리스트링을 통해 정보를 전송한다.

URL 끝에 ?와 key : value 형식에 파라미터를 쿼리 스트링이라 한다. 여러개일 때는 &로 구분한다.

```php
http://서버주소?변수1=값1&변수2=값2

ex)
http://localhost/asdf?id=1&name=asdf
```

# Post

서버의 리소스를 생성, 변경하기 위한 매서드

- 정보를 Request Body에 넣어서 전송한다.
- URL에 정보가 노출되지 않는다.
- 캐싱이 불가능하다.

URL에 정보가 노출되지 않는다고 안전한 것은 아니니 꼭 암호화를 해서 보내도록 하자.

```html
POST/localhost HTTP/1.1
...requeset 설정...

{
	"id": "asdf1234",
	"pw": "qwer9876"
}//이게 post 요청으로 들어가는 값
```

---

# Get, Post 차이

| 처리 방식 | GET | POST |
| --- | --- | --- |
| URL 데이터 노출 여부 | O | X |
| URL 예시 | http://localhost:8080/sign_up?id=joon&pw=1234 | http://localhost:8080/sign_up |
| 데이터의 위치 | Header(헤더) | Body(바디) |
| 캐싱 가능 여부 | O | X |
| 요청 결과 | 동일(Idempotent) | 변동가능(Non-idempotent) |