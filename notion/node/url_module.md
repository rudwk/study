### URL 모듈이 필요한 이유

- 인터넷 주소(URI, URL)를 **간편하게 해석하거나 조작**할 수 있도록 도와주는 내장 모듈
- 주소에서 **프로토콜, 도메인, 경로, 쿼리스트링 등**을 각각 분리하거나 합칠 수 있음

---

### URL 처리 방식 2가지

| **방식** | **특징** | **사용 여부** |
| --- | --- | --- |
| **WHATWG URL 방식** | 웹 표준(WHATWG) 기반, 브라우저와 호환성 높음 | ✅ **요즘은 이 방식만 사용** |
| **기존 Node.js 방식** | Node.js 초기부터 사용된 방식 | ❌ 오래된 방식, 사용 지양 |

> WHATWG: Web Hypertext Application Technology Working Group의 약자
> 
> 
> 웹 표준을 제정하는 단체로, 브라우저에서 사용하는 URL 처리 방식도 이 그룹의 규칙을 따름
> 

---

### URL 구성요소 예시

주소의 각 부분별 명칭은 그림 3-7과 같습니다. 이는 WHATWG의 url 구분 방법이며, 코드로 보면 확실합니다.

![](https://thebook.io/img/080334/129.jpg)

**▲ 그림 3-7** WHATWG와 노드의 주소 체계

다음과 같은 URL을 기준으로 분해할 수 있음:

```bash
**https://user:pass@example.com:8080/path/name?query=string#hash**
```

| **항목** | **설명** | **값** |
| --- | --- | --- |
| **`protocol`** | **통신 프로토콜** | **`https:`** |
| **`username`** | **사용자 이름** | **`user`** |
| **`password`** | **비밀번호** | **`pass`** |
| **`hostname`** | **도메인 이름** | **`example.com`** |
| **`port`** | **포트 번호** | **`8080`** |
| **`pathname`** | **경로** | **`/path/name`** |
| **`search`** | **쿼리 문자열 전체** | **`?query=string`** |
| **`searchParams`** | **쿼리 문자열 객체로 접근** | **`url.searchParams.get('query') → string`** |
| **`hash`** | **해시(anchor)** | **`#hash`** |

### 요약 포인트

- Node.js에서는 **WHATWG 방식의 URL 객체** 사용 권장
- 브라우저와 동일한 방식이라 **서버-클라이언트 간 URL 처리 일관성 유지**에 유리
- `new URL(주소)` 형태로 사용하며, 다양한 속성에 **객체 방식으로 접근 가능**
---

### URL모듈 - WHATWG 방식

