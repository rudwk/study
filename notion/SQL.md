<aside>
💡

sql 주요 문법:

SELECT

CREATE

ALTER

INSERT

UPDATE

DROP

DELETE

정도가 있다

</aside>

# SELECT

가장 기본적인 SQL명령어로 데이터베이스에 있는 값을 선택(가져오기)하는 명령어다.

## SELECT - FROM

가장 기본적인 SELECT 문. 테이블의 값을 가져온다.

```sql
SELECT {열 이름} FROM {테이블};
이게 기본 형식이다.

예제)
SELECT * FROM thing;
//thing 테이블 전부 가져오기
```

## SELECT - WHERE

어떤 조건을 만족하는 값만 가져오는 명령어이다.

```sql
SELECT {열 이름} FROM {테이블} WHERE {조건};

예제)
SELECT * FROM userInfo age >= 3 AND age <= 5;
//userinfo라는 테이블의 age값이 3이상 5이하 인 값
```

## SELECT - ODER

기준에 따라 정렬해주는 명령어

```sql
SELECT {열} FROM {테이블} ORDER BY {컬럼} DESC 혹은 ASC;
//여기서 DESC는 내림차순, ASC는 오름차순이다

예제)
SELECT * FROM userInfo ORDER BY age DESC;
//userInfo라는 테이블의 값들을 age의 내림차순으로 정렬함
```

## GRUP BY

특정 속성의 값이 같은 것을 모아 그룹을 만드는 명령어