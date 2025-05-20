<aside>
💡

NAT: Network Address Translation의 약자

</aside>

## NAT가 뭐하는 애인가

P패킷의 TCP/UDP 포트넘버와 소스 및 목적지의 IP주소 등을 재기록하여 라우터를 통해 네트워크
트래픽을 주고받는 기술을 뜻함 → 말 그대로 IP 주소를 바꿈

## 왜 쓰는가

IP 주소에는 public ip(공인 ip)와 private ip(사설 ip)가 있는데, 여기서 private ip에 속한 여러개의 호스트가 하나의 public ip의 주소를 통해 인터넷에 접속하기 위함이다

<aside>
💡

private network에서 사용 가능한 private ip:

10.0.0.0 ~ 10.255.255.255

172.16.0.0 ~ 172.31.255.255
192.168.0.0 ~ 192.168.255.255

</aside>

## 그러면 NAT는 어떻게 동작하는가

만약 노트북으로 와이파이를 이용한다고 쳤을 때 그 공유기가 주는 ip주소는 private ip이다.

그러나 인터넷은 public ip로만 접속 할 수 있다.

그러므로 private ip뿐인 노트북이 외부 서비스를 사용하고자 하면 공유기에서 나의 private ip를 public ip로 변환해준다.

![image.png](attachment:a5cfa09a-0245-4a5b-8098-c7abced39674:image.png)