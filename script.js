/* ===== 数据定义 ===== */
const IDENTITIES = [
  {
    id: 'med', icon: '🩺', name: '医学生',
    desc: '模拟接诊，做出诊断',
    dims: ['专业知识', '沟通能力', '应急判断', '同理心', '抗压能力'],
    scenes: [
      '患者，男，58岁，突发胸痛2小时入院，伴大汗、恶心。既往高血压10年。',
      '家属情绪激动，质疑为什么还没开始治疗，要求立刻做手术。',
      '检查结果显示急性下壁心肌梗死，但患者同时有消化道出血史。'
    ],
    questions: [
      '你会首先安排哪些检查？初步诊断是什么？',
      '面对焦虑的家属，你如何沟通病情与风险？',
      '出血史与抗凝治疗冲突，你会如何权衡并制定方案？'
    ]
  },
  {
    id: 'mech', icon: '⚙️', name: '机械生',
    desc: '毕业入职，被甲方反复改图',
    dims: ['制图能力', '软件熟练度', '沟通谈判', '时间管理', '抗压能力'],
    scenes: [
      '入职第三周，甲方发来第一版修改意见："整体感觉不够大气，再调调。"',
      '第二次修改：甲方换了个对接人，推翻了之前的所有确认。',
      '第三次修改：明天就要交付，甲方晚上11点发来27条新意见。'
    ],
    questions: [
      '面对模糊的"再调调"，你会如何拆解需求并推进？',
      '对接人变更导致返工，你怎么和甲方以及领导沟通？',
      '交付前夜突发大量修改，你的应对策略是什么？'
    ]
  },
  {
    id: 'fin', icon: '📈', name: '金融工作者',
    desc: '被风控总监连环拷问',
    dims: ['数据分析', '风险意识', '逻辑表达', '合规意识', '抗压能力'],
    scenes: [
      '风控总监把你叫进办公室："这个项目的预期收益率凭什么比同业高200BP？"',
      '"你模型里假设的违约率，数据来源是哪？回测区间覆盖过周期吗？"',
      '"如果下季度利率上行50BP，你这个组合的回撤会到多少？给我压力测试。"'
    ],
    questions: [
      '你如何向总监解释收益差异的合理性？',
      '面对数据来源质疑，你如何自证模型的可靠性？',
      '请简述你的压力测试思路与关键假设。'
    ]
  }
];

const ADMIN = { username: 'admin', password: 'admin123' };

/* ===== 工具函数 ===== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const showPage = (id) => { $$('.page').forEach(p => p.classList.remove('active')); $(`#page-${id}`).classList.add('active'); };
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

function getUsers() { return JSON.parse(localStorage.getItem('sim_users') || '[]'); }
function saveUsers(u) { localStorage.setItem('sim_users', JSON.stringify(u)); }
function getRecords() { return JSON.parse(localStorage.getItem('sim_records') || '[]'); }
function saveRecords(r) { localStorage.setItem('sim_records', JSON.stringify(r)); }
function currentUser() { return JSON.parse(sessionStorage.getItem('sim_user') || 'null'); }
function setCurrentUser(u) { sessionStorage.setItem('sim_user', JSON.stringify(u)); }

/* ===== 状态 ===== */
let quizState = { identity: null, answers: [], current: 0 };
let chartInstance = null;

/* ===== 页面1：注册 / 登录 ===== */
$$('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    $('#form-login').classList.toggle('hidden', tab !== 'login');
    $('#form-register').classList.toggle('hidden', tab !== 'register');
  });
});

$('#form-register').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = $('#reg-username').value.trim();
  const password = $('#reg-password').value;
  const realname = $('#reg-realname').value.trim();
  if (!username || !password) return;
  const users = getUsers();
  if (users.find(u => u.username === username)) { alert('用户名已存在'); return; }
  users.push({ username, password, realname: realname || username, createdAt: Date.now() });
  saveUsers(users);
  alert('注册成功，请登录');
  $('.tab-btn[data-tab="login"]').click();
});

$('#form-login').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = $('#login-username').value.trim();
  const password = $('#login-password').value;
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user && !(username === ADMIN.username && password === ADMIN.password)) {
    alert('用户名或密码错误'); return;
  }
  const u = user || { username: ADMIN.username, realname: '管理员' };
  setCurrentUser(u);
  goHome();
});

/* ===== 页面3：主页 ===== */
function goHome() {
  const u = currentUser();
  if (!u) { showPage('auth'); return; }
  $('#user-avatar').textContent = u.realname[0].toUpperCase();
  $('#user-name').textContent = u.realname;
  $('#user-greeting').textContent = `欢迎回来，${u.realname}`;

  // 身份卡片
  const grid = $('#identity-grid');
  grid.innerHTML = '';
  IDENTITIES.forEach(id => {
    const card = document.createElement('div');
    card.className = 'identity-card';
    card.innerHTML = `<div class="icon">${id.icon}</div><div class="name">${id.name}</div><div class="desc">${id.desc}</div>`;
    card.addEventListener('click', () => startQuiz(id));
    grid.appendChild(card);
  });

  // 占位入口
  const more = document.createElement('div');
  more.className = 'identity-card';
  more.innerHTML = `<div class="icon">➕</div><div class="name">更多身份</div><div class="desc">敬请期待</div>`;
  grid.appendChild(more);

  // 答题记录
  renderRecords();

  // 管理员面板
  if (u.username === ADMIN.username) {
    $('#admin-panel').classList.remove('hidden');
    const users = getUsers();
    const records = getRecords();
    $('#admin-user-count').textContent = users.length;
    $('#admin-record-count').textContent = records.length;
    renderAdminTable(records);
  } else {
    $('#admin-panel').classList.add('hidden');
  }

  showPage('home');
}

function renderRecords() {
  const u = currentUser();
  const
