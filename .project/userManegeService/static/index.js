async function signup() {
  const id = document.getElementById("user-id").value;
  const pw = document.getElementById("user-pw").value;

  if(!id || !pw){
    alert('아이디와 비밀번호를 입력해 주세요');
    return;
  }

  const res = await fetch('/user/signup', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      id: id,
      pw: pw
    })
  });

  const resj = await res.json()
  alert(`${res.status}: ${resj.message}, token: ${resj.token}`);
}

async function signin() {
  const id = document.getElementById("user-id").value;
  const pw = document.getElementById("user-pw").value;

  if(!id || !pw){
    alert('아이디와 비밀번호를 입력해 주세요');
    return;
  }

  const res = await fetch('/user/signin', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      id: id,
      pw: pw
    })
  });

  const resj = await res.json();
  alert(`${res.status}: ${resj.message}`);
}

async function find_pw() {
  const id = document.getElementById('find-id').value;

  if(!id) alert('아이디를 입력하여 주십시오');

  const res = await fetch('/user/findPw', {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id: id})
  });

  const resj = res.json();
  alert(`당신의 비밀번호: ${res.password}`);
}