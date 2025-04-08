### 경로 관련 주요 속성

- **`path.sep`**
    - 경로 구분자
    - Windows: `\`, POSIX: `/`
- **`path.delimiter`**
    - 환경 변수에서 여러 경로를 구분하는 문자
    - Windows: `;`, POSIX: `:`
    - 예: `process.env.PATH` 값 내부 확인

### 주요 메서드 요약

| **메서드** | **설명** | **예시** |
| --- | --- | --- |
| **`path.dirname(경로)`** | **폴더 경로만 추출** | **`/foo/bar/baz.txt` → `/foo/bar`** |
| **`path.extname(경로)`** | **확장자만 추출** | **`/foo/bar/baz.txt` → `.txt`** |
| **`path.basename(경로, 확장자?)`** | **파일명 추출(확장자 생략 가능)** | **`/foo/bar/baz.txt` → `baz.txtpath.basename('/foo/bar/baz.txt', '.txt')` → `baz`** |
| **`path.parse(경로)`** | **경로를 객체로 분해`{root, dir, base, ext, name}`** | **`/foo/bar/baz.txt` → `{ base: 'baz.txt', ext: '.txt' ...}`** |
| **`path.format(객체)`** | **`parse()` 결과를 다시 문자열로 변환** | **`path.format({ dir: '/foo/bar', base: 'baz.txt' })` → `/foo/bar/baz.txt`** |
| **`path.normalize(경로)`** | **잘못된 경로(/, \ 중복 등)를 정상 경로로 수정** | **`path.normalize('/foo//bar\\baz')` → `/foo/bar/baz`** |
| **`path.isAbsolute(경로)`** | **절대경로인지 확인 → `true/false`** | **`/foo/bar` → `truebar/baz` → `false`** |
| **`path.relative(기준, 목표)`** | **기준 경로에서 목표 경로까지 가는 상대 경로** | **`path.relative('/a/b', '/a/b/c/d')` → `c/d`** |
| **`path.join(...경로)`** | **경로를 하나로 합침(상대경로도 자동 처리)** | **`path.join('a', 'b', 'c.txt')` → `a/b/c.txt`** |
| **`path.resolve(...경로)`** | **절대경로 생성`/`가 나오면 앞 경로 무시** | **`path.resolve('/a', '/b', 'c')` → `/b/cpath.join('/a', '/b', 'c')` → `/a/b/c`** |

---

### 💡 `path.join` vs `path.resolve` 차이 예시

```jsx
**path.join('/a', '/b', 'c');    
// 결과: /a/b/c

path.resolve('/a', '/b', 'c'); 
// 결과: /b/c → '/b'부터 절대경로로 인식해 앞을 무시**
```