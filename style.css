/* ===== 全局 ===== */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  min-height: 100vh;
  color: #e0e0e0;
}

/* ===== 页面切换 ===== */
.page { display: none; min-height: 100vh; padding: 24px 16px; animation: fadeIn .4s ease; }
.page.active { display: flex; justify-content: center; align-items: flex-start; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
@keyframes typing { from { width: 0; } to { width: 100%; } }

.hidden { display: none !important; }

/* ===== 卡片 ===== */
.auth-card, .quiz-card, .result-card, .home-card {
  background: rgba(255,255,255,.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 16px;
  padding: 32px 28px;
  width: 100%;
  max-width: 520px;
  animation: slideUp .5s ease;
}

h1 { font-size: 1.6rem; margin-bottom: 4px; }
h2 { font-size: 1.3rem; margin-bottom: 16px; }
h3 { font-size: 1.05rem; margin: 20px 0 10px; }
.subtitle { color: #aaa; font-size: .85rem; margin-bottom: 20px; }

/* ===== 表单 ===== */
.tab-bar { display: flex; gap: 8px; margin-bottom: 16px; }
.tab-btn {
  flex: 1; padding: 8px; border: none; border-radius: 8px;
  background: rgba(255,255,255,.06); color: #ccc; cursor: pointer;
}
.tab-btn.active { background: #6c5ce7; color: #fff; }

.auth-form { display: flex; flex-direction: column; gap: 12px; }
input, textarea {
  width: 100%; padding: 10px 14px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.06);
  color: #fff; font-size: .95rem; outline: none;
}
input:focus, textarea:focus { border-color: #6c5ce7; }
.hint { font-size: .75rem; color: #888; margin-top: 12px; }

/* ===== 按钮 ===== */
.btn-primary, .btn-secondary, .btn-danger {
  padding: 10px 20px; border: none; border-radius: 10px;
  font-size: .95rem; cursor: pointer; transition: .2s;
}
.btn-primary { background: #6c5ce7; color: #fff; }
.btn-primary:hover { background: #5a4bd1; }
.btn-primary:disabled { opacity: .4; cursor: not-allowed; }
.btn-secondary { background: rgba(255,255,255,.1); color: #ddd; }
.btn-danger { background: #d63031; color: #fff; margin-top: 12px; }

/* ===== 场景动画 ===== */
.scene-box {
  background: rgba(0,0,0,.25); border-left: 3px solid #6c5ce7;
  border-radius: 8px; padding: 14px 16px; margin-bottom: 16px;
  min-height: 60px; font-size: .92rem; line-height: 1.6;
  animation: slideUp .4s ease;
}

.question-text { font-size: .95rem; margin-bottom: 8px; color: #c8bfff; }

/* ===== 答题进度 ===== */
.quiz-header { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: .85rem; color: #aaa; }
.quiz-footer { display: flex; gap: 10px; margin-top: 16px; }
.quiz-footer button { flex: 1; }

/* ===== 结果页 ===== */
.result-identity { font-size: 1.1rem; margin-bottom: 12px; }
.chart-wrap { max-width: 360px; margin: 0 auto 16px; }
.result-eval { font-size: .9rem; line-height: 1.7; margin-bottom: 10px; }
.result-score { font-size: 1.5rem; font-weight: bold; color: #6c5ce7; margin-bottom: 16px; }

/* ===== 主页 ===== */
.user-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: #6c5ce7; display: flex; align-items: center;
  justify-content: center; font-weight: bold; font-size: 1.1rem;
}
.user-name { font-weight: bold; }
.user-greeting { font-size: .8rem; color: #aaa; }

.identity-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
.identity-card {
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px; padding: 16px 12px; text-align: center;
  cursor: pointer; transition: .2s;
}
.identity-card:hover { background: rgba(108,92,231,.2); border-color: #6c5ce7; transform: translateY(-3px); }
.identity-card .icon { font-size: 1.6rem; margin-bottom: 6px; }
.identity-card .name { font-size: .9rem; }
.identity-card .desc { font-size: .7rem; color: #999; margin-top: 4px; }

.record-list { max-height: 260px; overflow-y: auto; }
.record-item {
  background: rgba(255,255,255,.04); border-radius: 8px;
  padding: 10px 12px; margin-bottom: 8px; font-size: .82rem;
  display: flex; justify-content: space-between; align-items: center;
}
.record-item .ri-left { flex: 1; }
.record-item .ri-score { font-weight: bold; color: #6c5ce7; }
.empty-hint { color: #666; font-size: .85rem; }

/* ===== 管理员 ===== */
.admin-panel { margin-top: 24px; border-top: 1px solid rgba(255,255,255,.1); padding-top: 16px; }
.admin-table-wrap { max-height: 200px; overflow-y: auto; margin-top: 8px; font-size: .78rem; }
.admin-table-wrap table { width: 100%; border-collapse: collapse; }
.admin-table-wrap th, .admin-table-wrap td { padding: 6px 8px; border-bottom: 1px solid rgba(255,255,255,.06); text-align: left; }

/* ===== 响应式 ===== */
@media (max-width: 480px) {
  .auth-card, .quiz-card, .result-card, .home-card { padding: 20px 16px; }
  .identity-grid { grid-template-columns: repeat(2, 1fr); }
}
