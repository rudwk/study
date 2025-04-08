![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e9477a6a-10c0-4268-afef-85cb1dda8171/68cc702e-36d1-4203-883f-571fa4eb8310/image.png)

- node_modules: yarn을 사용해서 추가한 패키지 저장소
- scr : 우리가 코드를 추가 하는 곳
- test: test코드를 작성하는 곳

위 프로젝트가 기본적인 nest.js서버

## NestJs 장점

---

- 위 프로젝트에서 package.json 파일이 있는데 그 파일의 디펜던시라던지 그런 것들을 원래라면 다 일일이 써야했지만 nest-cli에서 다 알잘딱 해준다.
→ 구조가 잘 잡혀있고 cli를 통해 쉽게 프로젝트 생성 등을 할 수 있다.

# src

---

### main.ts

<aside>
💡 이 Nest.js프로젝트를 실행하는 파일

</aside>

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e9477a6a-10c0-4268-afef-85cb1dda8171/948e9e39-9a66-4b03-8eeb-e1062f584cbc/image.png)

### app.service.ts

<aside>
💡 실제 기능구현할 때 사용할 파일

</aside>

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e9477a6a-10c0-4268-afef-85cb1dda8171/f1aed380-8b68-4adc-8d40-14871ec015da/image.png)

### app.module.ts

<aside>
💡 컨트롤러와 서비스 등을 관리하는 파일 → 의존성 관리

</aside>

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e9477a6a-10c0-4268-afef-85cb1dda8171/0d9028f8-8d4d-4c08-a00c-a90d7bd30a9c/image.png)

### app.controller.ts

<aside>
💡 controller 파일, nestJs에서 엔드포인트를 생성함

</aside>

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e9477a6a-10c0-4268-afef-85cb1dda8171/251ea7a9-50ee-45bb-8c11-7d878579f20a/image.png)

### app.controller.spec.ts

<aside>
💡 spec파일은 테스트코드를 만들기 위한 파일
→ controller의 테스트코드를 만들기 위한 파일

</aside>

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/e9477a6a-10c0-4268-afef-85cb1dda8171/1014d105-413f-449a-80c9-061f17c18cfb/image.png)