/* ===== 基础工具 ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const ADMIN = { username: 'admin', password: 'admin123' };

/* ===== 身份与题目数据 ===== */
const IDENTITIES = [
  {
    id: 'med',
    icon: '🩺',
    name: '医学生',
    desc: '模拟临床、急诊场景',
    dims: ['专业知识', '沟通能力', '应急能力', '同理心', '抗压能力'],
    scenes: [
      { title: '场景一', text: '患者 58 岁，突发胸痛入院……' },
      { title: '场景二', text: '家属情绪激动，质疑治疗方案……' }
    ],
    questions: [
      { q: '你首先应该做什么？', options: ['A. 立即心电监护', 'B. 先询问病史', 'C. 通知家属', 'D. 安排检查'] },
      { q: '如何向患者解释风险？', options: ['A. 如实完整告知', 'B. 简化说明', 'C. 由家属决定', 'D. 暂不说明'] }
    ]
  },
  {
    id: 'mech',
    icon: '⚙️',
    name: '机械生',
    desc: '产线调试、项目协作',
    dims: ['制图能力', '软件操作', '沟通协作', '时间管理', '抗压能力'],
    scenes: [
      { title: '场景一', text: '甲方发来新需求，需调整原有结构……' },
      { title: '场景二', text: '加工件出现公差超差……' }
    ],
    questions: [
      { q: '你会如何评估需求变更？', options: ['A. 直接改图', 'B. 先评估影响再确认', 'C. 拒绝变更', 'D. 交给上级'] },
      { q: '公差超差如何排查？', options: ['A. 查加工参数', 'B. 查图纸标注', 'C. 查量具校准', 'D. 以上都要'] }
    ]
  },
  {
    id: 'fin',
    icon: '💼',
    name: '金融工作者',
    desc: '客户沟通、风险控制',
    dims: ['专业知识', '沟通表达', '风险意识', '合规意识', '抗压能力'],
    scenes: [
      { title: '场景一', text: '客户希望提高收益但风险偏好较低……' },
      { title: '场景二', text: '发现一笔交易存在合规疑点……' }
    ],
    questions: [
      { q: '如何匹配产品与风险偏好？', options: ['A. 推荐高收益产品', 'B. 做风险测评后匹配', 'C. 由客户自选', 'D. 拒绝服务'] },
      { q: '发现合规疑点应如何处理？', options: ['A. 自行修正', 'B. 立即上报', 'C. 先观察', 'D. 忽略'] }
    ]
  }
];

/* ===== 本地存储 ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(list) {
  localStorage.setItem('users', JSON.stringify(list));
}
function getRecords() {
  return JSON.parse(localStorage.getItem('records') || '[]');
}
function saveRecords(list) {
  localStorage.setItem('records', JSON.stringify(list));
}
function currentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

/* 初始化默认管理员 */
(function initAdmin() {
  const users = getUsers();
  if (!users.some(u => u.username === ADMIN.username)) {
    users.push({ username: ADMIN.username, password: ADMIN.password, role: 'admin' });
    saveUsers(users);
  }
})();

/* ===== 页面切换 ===== */
function showPage(name) {
  $$('.page').forEach(p => p.classList.toggle('active', p.id === name));
}

/* ===== 登录 / 注册 ===== */
function bindAuth() {
  $('#login-btn')?.addEventListener('click', () => {
    const username = $('#login-username').value.trim();
    const password = $('#login-password').value.trim();
    if (!username || !password) {
      alert('请填写用户名和密码');
      return;
    }
    const u = getUsers().find(x => x.username === username && x.password === password);
    if (!u) {
      alert('用户名或密码错误');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(u));
    afterLogin(u);
  });

  $('#register-btn')?.addEventListener('click', () => {
    const username = $('#reg-username').value.trim();
    const password = $('#reg-password').value.trim();
    if (!username || !password) {
      alert('请填写完整信息');
      return;
    }
    const users = getUsers();
    if (users.some(u => u.username === username)) {
      alert('该用户名已存在');
      return;
    }
    users.push({ username, password, role: 'user' });
    saveUsers(users);
    alert('注册成功，请登录');
  });
}

function afterLogin(u) {
  if (u.username === ADMIN.username) {
    $('#admin-panel')?.classList.remove('hidden');
    const users = getUsers();
    const records = getRecords();
    $('#admin-user-count').textContent = users.length;
    $('#admin-record-count').textContent = records.length;
    renderAdminTable(records);
  } else {
    $('#admin-panel')?.classList.add('hidden');
  }
  showPage('home');
}

/* ===== 身份选择 ===== */
function renderIdentities() {
  const grid = $('#identity-grid');
  if (!grid) return;
  grid.innerHTML = '';
  IDENTITIES.forEach(item => {
    const card = document.createElement('div');
    card.className = 'identity-card';
    card.innerHTML = `<div class="icon">${item.icon}</div><div class="name">${item.name}</div><div class="desc">${item.desc}</div>`;
    card.addEventListener('click', () => startQuiz(item.id));
    grid.appendChild(card);
  });
}

/* ===== 答题与评分 ===== */
let currentIdentity = null;
let currentIndex = 0;

function startQuiz(id) {
  currentIdentity = IDENTITIES.find(i => i.id === id);
  currentIndex = 0;
  if (!currentIdentity) return;
  showPage('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = currentIdentity.questions[currentIndex];
  if (!q) return;
  $('#quiz-title').textContent = `${currentIdentity.name} · 第 ${currentIndex + 1} / ${currentIdentity.questions.length} 题`;
  $('#quiz-question').textContent = q.q;
  const box = $('#quiz-options');
  box.innerHTML = '';
  q.options.forEach((opt, i) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="answer" value="${i}"> ${opt}`;
    box.appendChild(label);
  });
}

function nextQuestion() {
  const picked = document.querySelector('input[name="answer"]:checked');
  if (!picked) {
    alert('请先选择一个选项');
    return;
  }
  currentIndex++;
  if (currentIndex < currentIdentity.questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const u = currentUser();
  const score = Math.round(Math.random() * 30 + 70); // 示例评分，可替换为真实计分逻辑
  const records = getRecords();
  records.push({
    username: u ? u.username : '匿名',
    identity: currentIdentity.name,
    score,
    time: new Date().toLocaleString()
  });
  saveRecords(records);
  $('#result-score').textContent = score;
  $('#result-identity').textContent = currentIdentity.name;
  showPage('result');
}

/* ===== 答题记录 ===== */
function renderRecords() {
  const u = currentUser();
  const list = getRecords().filter(r => u && r.username === u.username);
  const box = $('#record-list');
  if (!box) return;
  box.innerHTML = list.length
    ? list.map(r => `<div class="record-item"><span class="ri-left">${r.identity}</span><span class="ri-right">${r.score} 分 · ${r.time}</span></div>`).join('')
    : '<div class="empty-hint">暂无答题记录</div>';
}

/* ===== 管理员面板 ===== */
function renderAdminTable(records) {
  const tbody = $('#admin-table-body');
  if (!tbody) return;
  tbody.innerHTML = records.length
    ? records.map(r => `<tr><td>${r.username}</td><td>${r.identity}</td><td>${r.score}</td><td>${r.time}</td></tr>`).join('')
    : '<tr><td colspan="4">暂无记录</td></tr>';
}

/* ===== 入口 ===== */
document.addEventListener('DOMContentLoaded', () => {
  bindAuth();
  renderIdentities();
  renderRecords();
  showPage('login');
});
