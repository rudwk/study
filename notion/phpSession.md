# 세션

쿠키와 비슷하지만 클라이언트에 저장하는 게 아니라
서버에 정보를 저장한다는 차이점이 있다. → 서버에 저장하는 환경변수라고 생각하면 될 것 같다.

하지만 쿠키마냥 브라우저를 종료하는 시점에 만료되게 할 수 있어 쿠키보다 보안성이 높다는 특징이 있다.

---

## 세션 생성

```php
session_start();
//사용자 정보가 없다면 새 세션을 생성하고, 없으면 기존의 세션을 사용함.
//새 세션이 생성될 때 기본 이름은 PHPSESSID다.

session_name("이름");//PHPSESSID가 싫으면 session_name을 통해 일시적으로 이름을 바꿀 수 있다.

//session_start가 여러개라면 뒤 코드로 세션이 시작되었는지 확인하는 절차가 필요하다.
if(!session_id()) {// 발급된 세션 id가 있다면 세션의 id를, 없다면 false 반환
    session_start();
}
```

## 세션 변수 사용

세션을 사용하여 변수를 등록하고 싶으면 슈퍼 글로벌 변수 $_SESSION을 사용해서 하면 된다.

```php
//세션 변수 등록
$_SESSION['userName'] = 'asdf';
$_SESSION['userPw'] = '1234';

//등록된 변수 사용
echo $_SESSION['userName'];//asdf
echo $_SESSION['userPw'];//1234
```

## 세션 변수 제거

unset()을 사용하여 원하는 변수를 없앨 수 있다.

```php
//unset($_SESSION['변수 이름']);
unset($_SESSION['userName']);
```

## 세션 제거

```php
session_destroy();//세션의 모든 데이터를 삭제
```
Qjs r
하지만 세션 ID를 가지고 있는 쿠키는 멀쩡히 있기 때문에 쿠키도 같이 지워 줘야 한다.

또한 세션은 지워져도 세션에 저장되어있는 변수들을 지워지지 않기 때문에 session을 빈 배열로 채우고
삭제한다.

```php
//쿠키 삭제
if (ini_get("session.use_cookies")) {
  $params = session_get_cookie_params();
  setcookie(
    session_name(), '', time() - 42000,
    $params["path"], $params["domain"],
    $params["secure"], $params["httponly"]
  );
}

// 세션 삭제
$_SESSION = array();
session_destroy();
```