<aside>
💡

“저는 이거를 어떻게 ~ 할건데 어쩌구저쩌구” ← 가독성 안좋음. 귀찮음. 의미 전달 실수 가능성

“여기 : 저거, 저기 : 이거 … “ ← 짧음. 가독성 좋음. 의미 확실함.

이게 yaml 파일을 쓰는 이유다.

</aside>

## 데이터 정의

기본적으로 key : value 형식으로 정의한다.

```yaml
person:
  name: asdf
  job : Student
```

## 배열 정의

`-` 로 배열을 표시함

```yaml
person:
  name: asdf
  job : Student
  skills:
  	- python
    - yaml
```

## 주석

#으로 주석처리함

```yaml
person:
  name: asdf #qwer
# job : Student <-- fuckit
	job : teacher
  skills:
  	- python
    - yaml
```

## 자료형

따옴표(” 혹은 ‘) 없이 사용하면 실수, 정수 상관없이 숫자로 인식함.

```yaml
age  : 12
hight: 181.1
```

yaml에는 true, false이외에 yes, no를 쓸 수 있다.

```yaml
chicken: no
pizza  : false
```

## 줄바꿈

여러 줄을 표현할 때 사용

“|”← 이 지시어는 마지막 줄바꿈을 포함함

```yaml
newlines_sample: |
			number one line
            
      second line
            
      last line
```

“|-” ←이 지시어는 마지막 줄바꿈을 제외함

```yaml
newlines_sample: |-
			number one line
            
      second line
            
      last line
```

“>” ← 이 지시어는 중간에 들어간 빈 줄을 제외함.

```yaml
newlines_sample: >
			number one line
            
            second line
            
            last line
```

## 따옴표(:)

key 와 value 사이에 띄어쓰기를 반드시 해야함

```yaml
#에러남
key:value

#에러안남
key: value
```

그리고 따옴표(:)가 들어간다면 반드시 따옴표(” 혹은 ‘)로 감싸줘야 한다.

```yaml
#에러남
windows_drive: c:

#에러안남
windows_drive: "c:"
windows_drive: 'c:'
```

---

## 그 외

json을 yaml 코드로 바꿔주는 사이트

[**json2yaml**](https://www.json2yaml.com/) ~~제이선 투 야말엌~~

yaml문법 체크해주는 사이트

[**yamllint**](http://www.yamllint.com/)