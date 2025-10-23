// API 기본 URL (실제 서버 주소로 변경 필요)
const API_BASE_URL = 'http://localhost:3000';

// 전역 변수
let departments = [];
let employees = [];

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// 앱 초기화
async function initializeApp() {
    try {
        await loadDepartments();
        await loadEmployees();
        updateDepartmentSelects();
        
        // 오늘 날짜를 기본값으로 설정
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('emp-hire-date-reg').value = today;
        
        showAlert('시스템이 성공적으로 로드되었습니다.');
    } catch (error) {
        showAlert('시스템 초기화 중 오류가 발생했습니다.', 'error');
        console.error('초기화 오류:', error);
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 부서 등록 폼
    document.getElementById('dept-register-form').addEventListener('submit', handleDepartmentRegister);
    
    // 부서 조회 폼
    document.getElementById('dept-search-form').addEventListener('submit', handleDepartmentSearch);
    
    // 사원 등록 폼
    document.getElementById('emp-register-form').addEventListener('submit', handleEmployeeRegister);
    
    // 사원 조회 폼
    document.getElementById('emp-search-form').addEventListener('submit', handleEmployeeSearch);
    
    // 부서별 사원 실시간 필터링
    document.getElementById('emp-dept-search').addEventListener('change', function() {
        if (this.value) {
            searchEmployees();
        } else {
            displayEmployees(employees);
        }
    });
}

// 유틸리티 함수들
// 알림 메시지 표시
function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';
    
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

// 로딩 상태 표시
function setLoading(element, loading) {
    if (loading) {
        element.classList.add('loading');
    } else {
        element.classList.remove('loading');
    }
}

// API 호출 함수
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API 호출 에러:', error);
        showAlert(`서버 오류: ${error.message}`, 'error');
        throw error;
    }
}

// 부서 관련 함수들
// 부서 목록 로드
async function loadDepartments() {
    try {
        setLoading(document.querySelector('.container'), true);
        departments = await apiCall('/departments');
        updateDepartmentSelects();
        displayDepartments(departments);
    } catch (error) {
        showAlert('부서 목록을 불러오는데 실패했습니다.', 'error');
        departments = []; // 빈 배열로 초기화
    } finally {
        setLoading(document.querySelector('.container'), false);
    }
}

// 부서 선택 옵션 업데이트
function updateDepartmentSelects() {
    const regSelect = document.getElementById('emp-dept-reg');
    const searchSelect = document.getElementById('emp-dept-search');
    
    // 등록용 select
    regSelect.innerHTML = '<option value="">선택</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.dept_no;
        option.textContent = `${dept.dept_no} - ${dept.dept_name}`;
        regSelect.appendChild(option);
    });
    
    // 조회용 select
    searchSelect.innerHTML = '<option value="">전체</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.dept_no;
        option.textContent = `${dept.dept_no} - ${dept.dept_name}`;
        searchSelect.appendChild(option);
    });
}

// 부서 등록 처리
async function handleDepartmentRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        dept_no: formData.get('dept_no'),
        dept_name: formData.get('dept_name')
    };
    
    // 입력 값 검증
    if (!data.dept_no.trim() || !data.dept_name.trim()) {
        showAlert('모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    try {
        setLoading(e.target, true);
        await apiCall('/departments', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        showAlert('부서가 성공적으로 등록되었습니다.');
        e.target.reset();
        await loadDepartments();
    } catch (error) {
        showAlert('부서 등록에 실패했습니다. 중복된 부서번호일 수 있습니다.', 'error');
    } finally {
        setLoading(e.target, false);
    }
}

// 부서 조회 처리
function handleDepartmentSearch(e) {
    e.preventDefault();
    searchDepartments();
}

// 부서 검색
function searchDepartments() {
    const deptNo = document.getElementById('dept-no-search').value.trim();
    const deptName = document.getElementById('dept-name-search').value.trim();
    
    let filtered = departments.filter(dept => {
        if (deptNo && !dept.dept_no.includes(deptNo)) return false;
        if (deptName && !dept.dept_name.includes(deptName)) return false;
        return true;
    });
    
    displayDepartments(filtered);
    
    if (filtered.length === 0) {
        showAlert('검색 결과가 없습니다.', 'error');
    }
}

// 부서 목록 표시
function displayDepartments(deptList) {
    const tbody = document.getElementById('dept-search-tbody');
    tbody.innerHTML = '';
    
    if (deptList.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">등록된 부서가 없습니다.</td>';
        tbody.appendChild(row);
        return;
    }
    
    deptList.forEach(dept => {
        const row = document.createElement('tr');
        const createdAt = new Date(dept.created_at).toLocaleDateString('ko-KR');
        row.innerHTML = `
            <td>${dept.dept_no}</td>
            <td>${dept.dept_name}</td>
            <td>${createdAt}</td>
            <td><button onclick="editDepartment('${dept.dept_no}', '${dept.dept_name.replace(/'/g, "\\'")}')" class="btn-edit">수정</button></td>
            <td><button class="btn-delete" onclick="deleteDepartment('${dept.dept_no}')">삭제</button></td>
        `;
        tbody.appendChild(row);
    });
}

// 부서 수정
async function editDepartment(deptNo, currentName) {
    const newName = prompt('새로운 부서명을 입력하세요:', currentName);
    if (newName && newName.trim() && newName !== currentName) {
        try {
            await apiCall(`/departments/${deptNo}`, {
                method: 'PUT',
                body: JSON.stringify({ dept_name: newName.trim() })
            });
            
            showAlert('부서명이 성공적으로 수정되었습니다.');
            await loadDepartments();
        } catch (error) {
            showAlert('부서명 수정에 실패했습니다.', 'error');
        }
    }
}

// 부서 삭제
async function deleteDepartment(deptNo) {
    if (!confirm('정말로 이 부서를 삭제하시겠습니까?\n해당 부서에 소속된 사원이 있으면 삭제할 수 없습니다.')) {
        return;
    }
    
    try {
        await apiCall(`/departments/${deptNo}`, {
            method: 'DELETE'
        });
        
        showAlert('부서가 성공적으로 삭제되었습니다.');
        await loadDepartments();
        await loadEmployees(); // 사원 목록도 새로고침
    } catch (error) {
        showAlert('부서 삭제에 실패했습니다. 해당 부서에 소속된 사원이 있을 수 있습니다.', 'error');
    }
}

// 사원 관련 함수들
// 사원 목록 로드
async function loadEmployees() {
    try {
        employees = await apiCall('/employees');
        displayEmployees(employees);
    } catch (error) {
        showAlert('사원 목록을 불러오는데 실패했습니다.', 'error');
        employees = []; // 빈 배열로 초기화
    }
}

// 사원 등록 처리
async function handleEmployeeRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        dept_no: formData.get('dept_no'),
        salary: parseInt(formData.get('salary')),
        hire_date: formData.get('hire_date')
    };
    
    // 입력 값 검증
    if (!data.first_name.trim() || !data.last_name.trim() || !data.dept_no || !data.salary || !data.hire_date) {
        showAlert('모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    if (data.salary <= 0) {
        showAlert('급여는 0보다 큰 값을 입력해주세요.', 'error');
        return;
    }
    
    try {
        setLoading(e.target, true);
        await apiCall('/employees', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        showAlert('사원이 성공적으로 등록되었습니다.');
        e.target.reset();
        document.getElementById('emp-hire-date-reg').value = new Date().toISOString().split('T')[0];
        await loadEmployees();
    } catch (error) {
        showAlert('사원 등록에 실패했습니다.', 'error');
    } finally {
        setLoading(e.target, false);
    }
}

// 사원 조회 처리
function handleEmployeeSearch(e) {
    e.preventDefault();
    searchEmployees();
}

// 사원 검색
function searchEmployees() {
    const deptNo = document.getElementById('emp-dept-search').value;
    const firstName = document.getElementById('emp-first-name-search').value.trim();
    const lastName = document.getElementById('emp-last-name-search').value.trim();
    
    let filtered = employees.filter(emp => {
        if (deptNo && emp.dept_no !== deptNo) return false;
        if (firstName && !emp.first_name.includes(firstName)) return false;
        if (lastName && !emp.last_name.includes(lastName)) return false;
        return true;
    });
    
    displayEmployees(filtered);
    
    if (filtered.length === 0) {
        showAlert('검색 결과가 없습니다.', 'error');
    }
}

// 사원 목록 표시
function displayEmployees(empList) {
    const tbody = document.getElementById('emp-search-tbody');
    tbody.innerHTML = '';
    
    if (empList.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="8">등록된 사원이 없습니다.</td>';
        tbody.appendChild(row);
        return;
    }
    
    empList.forEach(emp => {
        const row = document.createElement('tr');
        const deptName = emp.Department ? emp.Department.dept_name : '미지정';
        const hireDate = new Date(emp.hire_date).toLocaleDateString('ko-KR');
        
        row.innerHTML = `
            <td>${emp.emp_no}</td>
            <td>${emp.first_name}</td>
            <td>${emp.last_name}</td>
            <td>${deptName}</td>
            <td>${emp.salary.toLocaleString()}원</td>
            <td>${hireDate}</td>
            <td><button onclick="editEmployee(${emp.emp_no})" class="btn-edit">수정</button></td>
            <td><button class="btn-delete" onclick="deleteEmployee(${emp.emp_no})">삭제</button></td>
        `;
        tbody.appendChild(row);
    });
}

// 사원 수정
async function editEmployee(empNo) {
    const employee = employees.find(emp => emp.emp_no === empNo);
    if (!employee) {
        showAlert('사원 정보를 찾을 수 없습니다.', 'error');
        return;
    }
    
    const firstName = prompt('새로운 성을 입력하세요:', employee.first_name);
    if (!firstName || firstName.trim() === employee.first_name) {
        return;
    }
    
    const lastName = prompt('새로운 이름을 입력하세요:', employee.last_name);
    if (!lastName || lastName.trim() === employee.last_name) {
        return;
    }
    
    const salary = prompt('새로운 급여를 입력하세요:', employee.salary);
    if (!salary || parseInt(salary) === employee.salary) {
        return;
    }
    
    const parsedSalary = parseInt(salary);
    if (isNaN(parsedSalary) || parsedSalary <= 0) {
        showAlert('올바른 급여를 입력해주세요.', 'error');
        return;
    }
    
    try {
        await apiCall(`/employees/${empNo}`, {
            method: 'PUT',
            body: JSON.stringify({
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                dept_no: employee.dept_no,
                salary: parsedSalary,
                hire_date: employee.hire_date
            })
        });
        
        showAlert('사원 정보가 성공적으로 수정되었습니다.');
        await loadEmployees();
    } catch (error) {
        showAlert('사원 정보 수정에 실패했습니다.', 'error');
    }
}

// 사원 삭제
async function deleteEmployee(empNo) {
    if (!confirm('정말로 이 사원을 삭제하시겠습니까?')) {
        return;
    }
    
    try {
        await apiCall(`/employees/${empNo}`, {
            method: 'DELETE'
        });
        
        showAlert('사원이 성공적으로 삭제되었습니다.');
        await loadEmployees();
    } catch (error) {
        showAlert('사원 삭제에 실패했습니다.', 'error');
    }
}

// 전역 함수로 노출 (HTML에서 onclick으로 사용)
window.loadDepartments = loadDepartments;
window.loadEmployees = loadEmployees;
window.editDepartment = editDepartment;
window.deleteDepartment = deleteDepartment;
window.editEmployee = editEmployee;
window.