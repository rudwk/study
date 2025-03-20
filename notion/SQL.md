<aside>
💡

sql 주요 문법:

SELECT

CREATE

ALTER

INSERT

DELETE

정도가 있다

</aside>

# SELECT

가장 기본적인 SQL명령어로 데이터베이스에 있는 값을 선택(가져오기)하는 코드다.

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

어떤 조건을 만족하는 값만 가져오는 코드이다.

```sql
SELECT {열 이름} FROM {테이블} WHERE {조건};

예제)
SELECT * FROM userInfo age >= 3 AND age <= 5;
//userinfo라는 테이블의 age값이 3이상 5이하 인 값
```

## SELECT - ODER

기준에 따라 정렬해주는 코드

```sql
SELECT {열} FROM {테이블} ORDER BY {컬럼} DESC 혹은 ASC;
//여기서 DESC는 내림차순, ASC는 오름차순이다

예제)
SELECT * FROM userInfo ORDER BY age DESC;
//userInfo라는 테이블의 값들을 age의 내림차순으로 정렬함
```

# CREATE

말 그대로 데이터베이스를 생성하는 코드

```sql
CREATE DATABACSE {DB이름};//이처럼 하면 간단한 DB 하나가 만들어짐
```

## CREATE - Column

저기 DB이름 옆에 괄호()를 붙이면 Column을 설정 할 수 있음

```sql
CREATE TABLE table_name
(
column_name1 data_type(size),
column_name2 data_type(size),
column_name3 data_type(size),
....
);

ex)//Pserson이라는 DB에 int 형 PersonID등 여러 컬럼을 추가함
CREATE TABLE Persons
(
PersonID int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
City varchar(255)
);
```

## CREATE - Option

또 뒤에 추가로 CONSTRAINT옵션을 추가 할 수 있다.

여기서 CONSTRAINT 옵션은

- Not Null, Unique, Primary Key, Foreign Key, Check, Defalt 등이 있다.
    - **NOT NULL** - NULL값이 들어가지 않아야 한다.
    - **UNIQUE** - 반드시 a unique value 하나가 있어야 한다.
    - **PRIMARY KEY** - NOT NULL과 UNIQUE의 조합니다. 테이블에서 편하고 쉽게 찾기위한 특별한 키값이다.
    - **FOREIGN KEY** - 다른테이블에서 매치되는 데이터를 찾을 수 있는 참조키 값이다.
    - **CHECK** - 값이 정해진 조건에 충족하는지 체크
    - **DEFAULT** - 아무것도 안쓰면 default 값을 갖는다.

```sql
ex)
CREATE TABLE Persons
(
P_Id int NOT NULL PRIMARY KEY,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255) UNIQUE,
City varchar(255)
)
//NOT NULL 옵션과 PRIMARY KEY 옵션 등 여러 설정을 한 상태
```

# Alter

alter는 DB의 테이블에 컬럼을 추가하거나 제거하는 등 테이블을 수정하는 코드다.

## Alter - DROP

Column을 제거하는 코드

```sql
alter table {테이블} drop column {컬럼}
```

## Alter - add

Column을 추가하는 코드

```sql
alter table 테이블 add {컬럼 이름} {타입} {옵션}
ex) alter table UserTbl add Birth varchar(6) NULL
```

## Alter - alter column

column을 수정하는 코드, alter가 두번 들어간다.

```sql
alter table {테이블} alter column {컬럼 이름} {타입} {옵션}
ex)
alter table UserTB alter column UserID varchar(50) NULL
//UserID 의 데이터 형식을 varchar(50) 으로 지정하고 NULL값을 허용한다.
```

# INSERT

말 그대로 데이터를 테이블에 추가해주는 코드

```sql
INSERT INTO {테이블} ....;
```

## INSERT - VALUE

가장 간단하게 테이블에 값을 집어넣는 코드

```sql
INSERT INTO {테이블} ({열1}, {열2}, {열3}...) VALUE ({값1}, {값2}, {값3}...)

ex)
INSERT INTO UserTB ('name', 'age', 'phone') VALUE ('홍길동', 18, '010-1234-1234')
```

## INSERT - VALUES

더 간단하게 테이블에 값을 집어넣는 코드

이 때 column의 순서대로 값을 넣어야 함

```sql
INSERT INTO {테이블} VALUES ({값1}, {값2}, {값3}...)

ex)
INSERT INTO UserTB VALUES ('홍길동', 18, '010-1234-1234')//name, age, phone 순서
```

# DELETE - FROM

테이블 삭제 명령어

```sql
DELETE FROM {테이블} WHERE {조건}
//WHERE는 딱히 상관 X
ex)
DELETE FROM userTB WHERE id = 4;
```