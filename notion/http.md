<aside>
💡

**HTTP란?**

http는 클라이언트와 서버가 송신하는 방법 중 하나

클라이언트가 요청(Request, 리퀘스트)을 보내면 서버가 응답(Response)을 보낸다

일반적으로 JSON구조를 사용함

</aside>

## JSON

```json
{
	'name':'이름',
	'age':17,
	'company':[
		{
			'name':'회사이름',
			'address':'회사주소'
		}
		]
	}
```

위 형태가 JSON형태

### 특징

---

- map구조와 비슷함
- 요청과 응답의 body에 사용됨
- 보낼때 String으로 변환하고, 다시 받으면 다시 JSON으로 변환됨
- Key / Value형식
- Key는 문자열만 가능함
- Value는 숫자, 문자열, 중첩된 JSON, List등 가능

## HTTP의 구성요소

**요청**

- [**URL**](https://www.notion.so/http-1354073b071080a8b95bc5d1138aee67?pvs=21) - 요청을 보내는 주소(https://어쩌구)
- [**Method**](https://www.notion.so/http-1354073b071080a8b95bc5d1138aee67?pvs=21) - get, post, put, patch, delate등 요청의 종류
- [**header**](https://www.notion.so/http-1354073b071080a8b95bc5d1138aee67?pvs=21) - 요청의 메타데이터(Key / value형식 정보)
- [**body**](https://www.notion.so/http-1354073b071080a8b95bc5d1138aee67?pvs=21) - 실제 요청의 관련된 데이터를 보내는 곳

**응답**

- statuse Code - 응답 코드
- header, body - 반환된 정보

### URL

---

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e9477a6a-10c0-4268-afef-85cb1dda8171/60acfa27-3330-43c6-9f34-562c859304b4/image.png)

1. Scheme(스킴) - http 또는 https
2. Host(호스트) - domain이라고 부르는 영역, [www.naver.com](http://www.naver.com) ← 이게 도메인
3. path(패스) - 위 도메인에서 요청 할 리소스를, 어떤 정보를 가져올지 작성
4. Query Parameter(쿼리 파라미터) - ?뒤 붙는 리소스의 추가정보. 검색같은데에 많이 쓰임

### Method

---

- **GET**은 데이터를 조회할 때 사용
    
    → 서버에서 데이터를 GET해옴
    

- POST는 데이터를 생성할 때 사용
    
    → 블로그 포스팅 == 블로그라는 DB에 게시물을 추가함
    

- PATCH는 데이터를 부분적 또는 전체를 업데이트함(PUT과 비슷)
    
    → PUT은 데이터가 없으면 생성, PATCH는 데이터가 없으면 에러발생
    

- DELATE는 데이터 삭제할 때 사용

```json
GET https://아무튼 같은머시깽주소
POST https://아무튼 같음머시깽주소
```

위 두 요청은 완전히 다른 요청

### Header

---

<aside>
💡

header는 **요청에 대한 정보(=메타데이터)가 담겨있다.**

쿠키, JWT 등이 잇다

</aside>

- Key / value 형식
- key와 value 둘다 String형태
- 주로 라이브러리, 프레임워크, 환경에 의해 자동으로 생성된다.
- 주로 요청은 body에 보내고 header에는 body를 포함한 모든 정보를 전송함

### Body

---

<aside>
💡

body는 요청에 대한 **로직에 필요한 정보를 직접적으로 전달한다.**

</aside>

- 만약 블로그 글을 생성하는 POST요청을 할 때 필요한 제목, 내용 등은 모두 Body에 입력한다.
- 주로 JSON구조 사용

### Header, Body 차이점

---

- **Header**

Header는 Body를 포함한 요청 자체에 대한 정보를 저장하고 있음

- **Body**

Body는 그 요정을 수행하기 위해 필요한 데이터를 저장하고 있음

### Http Status Code

---

[참고자료](https://www.notion.so/b46ea61c759c4828bc771fc7e05855ab?pvs=21)

100 ~ 199 : 정보 응답, 잘 쓰이지 않음

200 ~ 299 : 성공 응답

300 ~ 399 : 리다이렉션 메세지. 요청이 다른 주소로 변경됐을 때 사용

400 ~ 499 : 프론트 문제

500 ~ 599 : 내 문제

**주로 사용하는 스테이터스 코드**

200 - ok

201 - 데이터 만들어짐

301 - 리소스 이동됨

400 - 요청이 잘못됨

401 - 인증토큰, 키가 잘못됨(인가 문제)

403 - 접근불가, 인증은 됨

404 - 존재하지 않는 리소스

405 - 허가되지 않은 메소드

500 - 알수없는 서버에러 주로 서버 로직문제

418 - 서버가 찻주전자이기 때문에 커피 내리기를 거절함