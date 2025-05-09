// script.js - 클라이언트 측 JavaScript
// API URL 설정
const API_URL = 'http://localhost:3000/api';
let currentMemoId = null;
let token = localStorage.getItem('token');
let currentUser = null;

// DOM 요소
const authContainer = document.getElementById('auth-container');
const memoContainer = document.getElementById('memo-container');
const userInfo = document.getElementById('user-info');
const usernameDisplay = document.getElementById('username-display');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabButtons = document.querySelectorAll('.tab-btn');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const registerSuccess = document.getElementById('register-success');
const memoList = document.getElementById('memo-list');
const memoEditor = document.getElementById('memo-editor');
const editorTitle = document.getElementById('editor-title');
const memoTitleInput = document.getElementById('memo-title');
const memoContentInput = document.getElementById('memo-content');

// 버튼 이벤트 리스너
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('logout-btn').addEventListener('click', logout);
document.getElementById('new-memo-btn').addEventListener('click', createNewMemo);
document.getElementById('save-memo-btn').addEventListener('click', saveMemo);
document.getElementById('cancel-memo-btn').addEventListener('click', cancelMemoEdit);

// 탭 전환 이벤트 리스너
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 모든 탭 버튼에서 활성 클래스 제거
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // 클릭된 탭 버튼에 활성 클래스 추가
    button.classList.add('active');
    
    // 폼 전환
    if (button.getAttribute('data-tab') === 'login') {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    } else {
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
    }
  });
});

// 페이지 로드 시 인증 상태 확인
document.addEventListener('DOMContentLoaded', checkAuthStatus);

// 인증 상태 확인 함수
function checkAuthStatus() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  
  if (token && username) {
    // 토큰이 있으면 사용자 정보 표시 및 메모 목록 로드
    currentUser = {
      username: username,
      id: localStorage.getItem('userId')
    };
    showAuthenticatedUI();
    loadMemos();
  } else {
    // 토큰이 없으면 로그인 폼 표시
    showLoginUI();
  }
}

// 인증된 UI 표시
function showAuthenticatedUI() {
  authContainer.classList.add('hidden');
  memoContainer.classList.remove('hidden');
  userInfo.classList.remove('hidden');
  usernameDisplay.textContent = currentUser.username;
}

// 로그인 UI 표시
function showLoginUI() {
  authContainer.classList.remove('hidden');
  memoContainer.classList.add('hidden');
  userInfo.classList.add('hidden');
  memoEditor.classList.add('hidden');
  // 폼 초기화
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  loginError.textContent = '';
}

// 로그인 함수
async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  if (!username || !password) {
    loginError.textContent = '사용자 이름과 비밀번호를 입력하세요';
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '로그인 실패');
    }
    
    // 토큰 및 사용자 정보 저장
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('username', data.username);
    
    currentUser = {
      id: data.userId,
      username: data.username
    };
    
    token = data.token;
    
    // UI 업데이트
    showAuthenticatedUI();
    loadMemos();
    
  } catch (error) {
    loginError.textContent = error.message;
  }
}

// 회원가입 함수
async function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  // 입력 검증
  if (!username || !password) {
    registerError.textContent = '사용자 이름과 비밀번호를 입력하세요';
    return;
  }
  
  if (password !== confirmPassword) {
    registerError.textContent = '비밀번호가 일치하지 않습니다';
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '회원가입 실패');
    }
    
    // 성공 메시지 표시
    registerError.textContent = '';
    registerSuccess.classList.remove('hidden');
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
    
    // 3초 후에 로그인 탭으로 전환
    setTimeout(() => {
      tabButtons[0].click();
      registerSuccess.classList.add('hidden');
    }, 3000);
    
  } catch (error) {
    registerError.textContent = error.message;
    registerSuccess.classList.add('hidden');
  }
}

// 로그아웃 함수
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  currentUser = null;
  token = null;
  showLoginUI();
}

// 메모 목록 로드 함수
async function loadMemos() {
  try {
    const response = await fetch(`${API_URL}/memos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('메모 로드 실패');
    }
    
    const memos = await response.json();
    displayMemos(memos);
    
  } catch (error) {
    console.error('메모 로드 오류:', error);
  }
}

// 메모 목록 표시 함수
function displayMemos(memos) {
  memoList.innerHTML = '';
  
  if (memos.length === 0) {
    memoList.innerHTML = '<p>저장된 메모가 없습니다.</p>';
    return;
  }
  
  memos.forEach(memo => {
    const memoElement = document.createElement('div');
    memoElement.className = 'memo-item';
    memoElement.dataset.id = memo.id;
    
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date(memo.updated_at).toLocaleDateString('ko-KR', dateOptions);
    
    memoElement.innerHTML = `
      <div class="memo-title">${memo.title}</div>
      <div class="memo-date">${formattedDate}</div>
      <div class="memo-content-preview">${memo.content ? memo.content.substr(0, 100) : ''}</div>
      <div class="memo-item-actions">
        <button class="edit-memo-btn">수정</button>
        <button class="delete-memo-btn danger">삭제</button>
      </div>
    `;
    
    // 메모 항목 클릭 이벤트
    memoElement.querySelector('.edit-memo-btn').addEventListener('click', () => {
      editMemo(memo.id);
    });
    
    memoElement.querySelector('.delete-memo-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('이 메모를 삭제하시겠습니까?')) {
        deleteMemo(memo.id);
      }
    });
    
    memoList.appendChild(memoElement);
  });
}

// 새 메모 생성 함수
function createNewMemo() {
  currentMemoId = null;
  editorTitle.textContent = '새 메모 작성';
  memoTitleInput.value = '';
  memoContentInput.value = '';
  memoEditor.classList.remove('hidden');
}

// 메모 편집 함수
async function editMemo(memoId) {
  try {
    const response = await fetch(`${API_URL}/memos/${memoId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('메모 로드 실패');
    }
    
    const memo = await response.json();
    
    currentMemoId = memo.id;
    editorTitle.textContent = '메모 수정';
    memoTitleInput.value = memo.title;
    memoContentInput.value = memo.content;
    memoEditor.classList.remove('hidden');
    
  } catch (error) {
    console.error('메모 편집 오류:', error);
  }
}

// 메모 저장 함수
async function saveMemo() {
  const title = memoTitleInput.value.trim();
  const content = memoContentInput.value.trim();
  
  if (!title) {
    alert('제목을 입력하세요');
    return;
  }
  
  try {
    let url = `${API_URL}/memos`;
    let method = 'POST';
    
    // 수정 모드인 경우
    if (currentMemoId) {
      url = `${API_URL}/memos/${currentMemoId}`;
      method = 'PUT';
    }
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });
    
    if (!response.ok) {
      throw new Error('메모 저장 실패');
    }
    
    // 메모 에디터 숨기기
    memoEditor.classList.add('hidden');
    
    // 메모 목록 다시 로드
    loadMemos();
    
  } catch (error) {
    console.error('메모 저장 오류:', error);
    alert('메모를 저장하는 중 오류가 발생했습니다');
  }
}

// 메모 삭제 함수
async function deleteMemo(memoId) {
  try {
    const response = await fetch(`${API_URL}/memos/${memoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('메모 삭제 실패');
    }
    
    // 메모 목록 다시 로드
    loadMemos();
    
  } catch (error) {
    console.error('메모 삭제 오류:', error);
    alert('메모를 삭제하는 중 오류가 발생했습니다');
  }
}

// 메모 편집 취소 함수
function cancelMemoEdit() {
  memoEditor.classList.add('hidden');
  memoTitleInput.value = '';
  memoContentInput.value = '';
  currentMemoId = null;
}