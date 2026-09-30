const jobs = {
  engineer: {
    title: "工程师",
    desc: "负责系统设计、开发与维护，日常涉及需求分析、编码和调试。",
    skills: ["逻辑思维", "编程能力", "问题排查"]
  },
  designer: {
    title: "设计师",
    desc: "负责视觉与交互设计，把需求转化为可用的界面方案。",
    skills: ["审美能力", "软件操作", "沟通表达"]
  },
  teacher: {
    title: "教师",
    desc: "负责教学与知识传递，需要备课、授课和评估学习效果。",
    skills: ["表达能力", "耐心", "知识体系"]
  }
};

const select = document.getElementById("jobSelect");
const result = document.getElementById("result");

select.addEventListener("change", function () {
  const job = jobs[this.value];
  if (!job) {
    result.innerHTML = "";
    return;
  }
  result.innerHTML = `
    <h2>${job.title}</h2>
    <p>${job.desc}</p>
    <p><strong>核心能力：</strong>${job.skills.join("、")}</p>
  `;
});
