docker란?

<aside>
💡

 **컨테이어 기반**으로 신속하게 배포 등을 할 수 있는 **오픈소스 프로그램이다.**

원래 옛날에 Docker가 없던 시절에 

여러 프로그램을 만들어 git에 머지를 해서 공유를 했는데 어디는 되고 어디는 안되는 그런 알 수 없는 버그가 발생했다고 한다. → 환경설정 이슈때문에 협업이 쉽지 않았음

그래서 만든게 docker와 dockerfile이다.

</aside>

뭐 암튼 그래서 docker가 만들어 졌다.

vm마냥 실행 방법을 dockerfile에 넣어서 docker 위에서 실행시킨다.

# container?

실제 그 커다란 컨테이너마냥 격리된 공간에서 프로세서를 따로 동작시키는 기술

따라서 운영체제에 상관없이 동작 할 수 있게 해줌

container가 존재하기 위해 docker file과 Image 라는 게 필요함

## docker file?

docker파일을 만들어 docker에 먹이면 OS 등 상관없이 실행 할 수 있게 된다.

배포를 할 때 docker 컨테이너에 담아서 docker engine이 있는 곳이면 무조건 배포할 수 있게 되었다.

## Image?

image는 docker file을 실행하기 위한 기본 세팅 등을 포함한 파일임.

image는 프로그램, docker file은 프로세스라고 생각 하면 편함

그리고 docker는 vm에 비교적 굉장히 가볍다.

docker Engine이 os를 대체해주기 때문에 그런게 아닌가 싶다.

---

## [장점]

- Application 환경(OS)에 구애받지 않기 때문에 개발이 편리해진다.
- 여러 개발 환경에서 쉽게 개발환경을 구축할 수 있다.
- 가볍기 때문에 사용하기 쉽고 리소스의 이용 효율도 좋다고 한다.