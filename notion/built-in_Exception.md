# built in HTTP Exception
![alt text](image.png)
- UnauthorizedException
- NotFoundException
- NotAcceptableException
- RequestTimeoutException
- ImATeapotException
- MethodNotAllowedException

간단한 것만 요약함

---

## BadRequestException

스테이터스 코드: 400(Bad Request)

클라이언트가 잘못된 리퀘스트(요청)을 보냈을 때 발생


## UnauthorizedException

스테이터스 코드: 401(Unauthorized)

인증되지 않은 사용자가 접근할 때 발생 - 인가 문제

## NotFoundException

스테이터스 코드: 404(NotFound)

요청한 리소스를 찾을 수 없을 때 발생

## NotAcceptableException

스테이터스 코드: 406(Not Acceptable)

클라이언트가 요청한 데이터 타입(Json 등)을 제공할 수 없을 때 발생

## RequestTimeoutException

스테이터스 코드: 408(Request Tiemout)

클라이언트가 지정된 시간 내에 요청을 완료하지 못했을 때

## ImATeapotException

스테이터스 코드 : 418(Im Not a Teapot)

서버는 주전자가 아니라서 커피를 끓일 수 없다는 내용이었나 뭔가 암튼 이스터에그

## MethodNotAllowedException

스테이터스 코드: 405(Method Not Allowed)

지원되지 않는 HTTP메서드(GET 등)을 사용했을 때 발생