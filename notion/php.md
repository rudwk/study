# PHP 정의

<aside>
💡

c 언어 기반 서버 사이드 스크립트

HTML에 JS의 <script></script>마냥 <?php?>를 입력하면 됨

---

다른 서버 사이드 스크립트는 JSP(자바, 8888포트를 사용함), ASP.net이 있다.

</aside>

## PHP 작동 원리

![image.png](attachment:af223cfa-2140-4542-aaf3-2a5ff339dc0b:image.png)

1. 클라가 서버에 웹페이지(PHP 페이지)를 요청함
2. 서버가 특정 로직 처리를 위해 php 파서에게 처리를 요청함
3. 그 처리 결과를 서버가 전달받고
4. 그걸 브라우저에 띄움
- **PHP 파서**
    
    ![img_php_works.png](attachment:5ba6c78e-2917-4c62-bb22-75c4dcf73a27:img_php_works.png)
    
    파서는 만약 요청을 처리하는데 DB가 필요하면 연동해서 데이터를 처리 후 그걸 웹 서버에 넘겨준다.
    
    php : 공장, php파서 : 직원 ← 일단 난 이렇게 이해하긴 했음 근데 뭔가 잘못 이해한 느낌
    

# PHP 기본 문법

위에서 설명했듯이 php는 **<?php**로 시작해서 **?>**로 끝난다.

```php
<?php
	//php 코드;
?>

//c언어 기반이라 명령문 마지막에 세미콜론(;)을 넣어야 함

/*주석 등도 마찬가지*/
```

## 출력

```php
echo 1234 //1234 출력
```

### 변수

변수를 쓸 때 php는 c언어랑 다르게 자료형을 적지 않고 달러($)표시로 변수를 쓴다.

```php
$dsm = "tlqkf";

echo $dsm; //tlqkf
//php는 변수를 선언 및 호출 할 때도 $표시를 붙여야 변수로 취급해줌
```

## 변수 - 슈퍼전역(글로벌)변수

php에는 내장함수마냥 전역적으로 쓸 수 있는 내장 변수가 있다.

앞에 _가 붙어있으면 슈퍼변수다.

```php
$_GET;
$_POST;
$_SESSION;
$_COOKIE;
```

### $_GET

URL을 통해 들어오는 값을 받아드림. URL에 값이 다 노출된다는 단점이 있음

```php
$name = $_GET['name'];
$age = $_GET['age'];

echo $name $age;//URL에 있는 name 값과 age 값을 출력함
```

### $_POST

HTTP POST요청으로 들어오는 값을 받음. URL에 노출되지 않음, 데이터 폼 전송에 적합

```php
$name = $_POST['name'];
$email = $_POST['email'];

echo $name $email;//post로 보낸 name 값과 email값을 출력함
```

### $_SESSION

사용자별 세션 관리에 사용됨. `session_start();` 로 세션을 시작함

```php
session_start();

$_SESSION['username'] = 'LearnCode';
$_SESSION['loggedin'] = true;

echo $_SESSION['username'];//세션의 username을 가져옴 --> 'LearnCode'가 출력됨
```

### $_COOKIE

쿠키 관리 및 데이터를 가져오는데 사용함.

```php
setcookie("user", "LearnCodeEasy", time() + 3600);//쿠키 설정

if (isset($_COOKIE['user'])) {
    echo "쿠키에 저장된 사용자 이름: " . $_COOKIE['user'];
} else {
    echo "쿠키가 설정되지 않았습니다.";
}
//user라는 쿠키의 값이 있다면 값 출력, 없다면 없음 선언
```

쿠키와 세션에 관련한 건 PHP 쿠키, PHP 세션 페이지 참고