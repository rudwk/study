# DockerCompose 사용법

우선 도커 컴포스가 깔려있는지 확인

```powershell
> docker-compose -v

Docker Compose version v2.33.1-desktop.1
```

## docker-compose.yaml 작성

mysql을 만들고 wordpress를 생성해 mysql에 연결하는 코드다

```docker
$ docker run -d --name wordpress_db \
	--network seunghwan_network \
	-p 3306:3306 \
	-e MYSQL_ROOT_PASSWORD=seosh817 \
	-e MYSQL_DATABASE=seosh817 \
	-e MYSQL_USER=seosh817 \
	-e MYSQL_PASSWORD=seosh817 \
	-v mysql:/var/lib/mysql \
	--restart unless-stopped \
	mysql:8
    
$ docker run -d --name seunghwan_wordpress \
	--network seunghwan_network \
	-p 8080:80 \
	--link wordpress_db:mysql \
	-e WORDPRESS_DB_HOST=db:3306 \
	-e WORDPRESS_DB_USER=seosh817 \
	-e WORDPRESS_DB_PASSWORD=seosh817 \
	-e WORDPRESS_DB_NAME=seosh817 \
	--restart unless-stopped \
	wordpress:latest
```

위 코드는 docker run 명령어로 쓴 코드이고,

```yaml
version: '3.9'

services:
  db:
    image: mysql:8
    volumes:
    - db:/var/lib/mysql
    restart: unless-stopped
    environment:
    - MYSQL_ROOT_PASSWORD=seosh817
    - MYSQL_DATABASE=seosh817
    - MYSQL_USER=seosh817
    - MYSQL_PASSWORD=seosh817
    networks:
    - wordpress

  wordpress:
    depends_on:
    - db
    image: wordpress:latest
    ports:
    - "8000:80"
    restart: unless-stopped
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: seosh817
      WORDPRESS_DB_PASSWORD: seosh817
      WORDPRESS_DB_NAME: seosh817
    networks:
    - wordpress

volumes:
  db: {}

networks:
  wordpress: {}
```

위 코드는 .yaml코드로 작성한 파일이다.

dockerCompose를 사용하려면 그 설정을 적어놓은 .yaml파일이 필요한데, 기존의 docker run 명령어를 
.yaml파일로 변환하는 것이 일반적이다.

---

[**.yaml**](https://www.notion.so/ymal-1c44073b071080c2aab7ef04a4d64d9e?pvs=21)

---

# Docker-Compose .yaml 옵션

## 버전

.yaml파일의 포멧 버전을 나타냄
docker compose의 버전에 따라 .yaml의 버전도 달라질 수 있음

```yaml
version: 'x.x'
```

## service 정의

명령어로 생성할 컨테이너의 옵션을 정의함
각 컨테이너는 docker-compose에 의해 하나의 프로젝트로써 관리됨

```yaml
service:
	컨테이너(서비스)이름:
		속성1: ...
		속성2: ...
		...
	서비스(컨테이너)이름:
		속성1: ...
		속성2: ...
		...
```