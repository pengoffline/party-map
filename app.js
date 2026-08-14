import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import { PARTIES, QUESTIONS, computeScores } from "./data.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DIM_LABEL = { equality: "平等", democracy: "民主", individual: "個人" };

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let currentIndex = 0;
const answers = {};
let scores = null;
let historyResults = []; // fetched from supabase
let chartMode = { eqli: "mine", indem: "mine" }; // "mine" | "all"

// ---------------------------------------------------------------
// Screens
// ---------------------------------------------------------------
const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result"),
};
function showScreen(name) {
  for (const key in screens) screens[key].classList.toggle("hidden", key !== name);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("start-btn").addEventListener("click", () => {
  currentIndex = 0;
  showScreen("quiz");
  renderQuestion();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  for (const k in answers) delete answers[k];
  currentIndex = 0;
  scores = null;
  showScreen("intro");
});

// ---------------------------------------------------------------
// Quiz rendering
// ---------------------------------------------------------------
const quizRoot = document.getElementById("quiz-root");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");

function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  progressLabel.textContent = `Q${String(currentIndex + 1).padStart(2, "0")} / ${QUESTIONS.length}`;
  progressFill.style.width = `${(currentIndex / QUESTIONS.length) * 100}%`;

  const dimTag = `<span class="q-tag dim-${q.dimension}">${DIM_LABEL[q.dimension]}</span>`;
  let bodyHtml = "";

  if (q.scale === "pair10") {
    bodyHtml = `
      <div class="pair-labels"><span>${q.left}</span><span>${q.right}</span></div>
      <div class="scale-row" role="group" aria-label="1到10選擇">
        ${Array.from({ length: 10 }, (_, i) => i + 1)
          .map((n) => scaleBtn(q.id, n, answers[q.id]))
          .join("")}
      </div>
      <div class="scale-endlabels"><span>1</span><span>10</span></div>
    `;
  } else if (q.scale === "importance10") {
    bodyHtml = `
      <p class="q-text">${q.text}</p>
      <div class="scale-row" role="group" aria-label="1到10重要程度">
        ${Array.from({ length: 10 }, (_, i) => i + 1)
          .map((n) => scaleBtn(q.id, n, answers[q.id]))
          .join("")}
      </div>
      <div class="scale-endlabels"><span>完全不重要</span><span>非常重要</span></div>
    `;
  } else if (q.scale === "justify10") {
    bodyHtml = `
      <p class="q-text">${q.text}</p>
      <div class="scale-row" role="group" aria-label="1到10正當程度">
        ${Array.from({ length: 10 }, (_, i) => i + 1)
          .map((n) => scaleBtn(q.id, n, answers[q.id]))
          .join("")}
      </div>
      <div class="scale-endlabels"><span>從不正當</span><span>總是正當</span></div>
    `;
  } else if (q.scale === "agree4") {
    const labels = ["非常不同意", "不同意", "同意", "非常同意"];
    bodyHtml = `
      <p class="q-text">${q.text}</p>
      <div class="agree-row" role="group" aria-label="同意程度">
        ${labels
          .map((lab, i) => {
            const val = i + 1;
            const sel = answers[q.id] === val ? "selected" : "";
            return `<button class="agree-btn ${sel}" data-qid="${q.id}" data-val="${val}">${lab}</button>`;
          })
          .join("")}
      </div>
    `;
  }

  quizRoot.innerHTML = `
    <div class="q-card">
      ${dimTag}
      ${q.scale === "pair10" ? "" : ""}
      ${bodyHtml}
    </div>
    <div class="nav-row">
      <button class="btn secondary" id="prev-btn" ${currentIndex === 0 ? "disabled" : ""}>← 上一題</button>
      <span class="nav-hint">${answers[q.id] !== undefined ? "已作答" : "請選擇一個答案"}</span>
      <button class="btn" id="next-btn" ${answers[q.id] === undefined ? "disabled" : ""}>
        ${currentIndex === QUESTIONS.length - 1 ? "完成測驗 →" : "下一題 →"}
      </button>
    </div>
  `;

  quizRoot.querySelectorAll("[data-qid]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const qid = btn.getAttribute("data-qid");
      const val = Number(btn.getAttribute("data-val"));
      answers[qid] = val;
      renderQuestion();
      // auto-advance shortly after selection for scale questions
      if (q.scale !== "agree4") {
        setTimeout(() => goNext(), 180);
      }
    });
  });

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);
}

function scaleBtn(qid, n, selectedVal) {
  const sel = selectedVal === n ? "selected" : "";
  return `<button class="scale-btn ${sel}" data-qid="${qid}" data-val="${n}">${n}</button>`;
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion();
  }
}
function goNext() {
  if (answers[QUESTIONS[currentIndex].id] === undefined) return;
  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

// ---------------------------------------------------------------
// Finish → compute scores → show results
// ---------------------------------------------------------------
async function finishQuiz() {
  scores = computeScores(answers);
  showScreen("result");
  renderScoreGrid();
  await refreshHistoryAndDraw();
}

function renderScoreGrid() {
  document.getElementById("score-grid").innerHTML = `
    <div class="score-cell eq"><div class="label">平等 Equality</div><div class="value">${scores.equality}</div></div>
    <div class="score-cell li"><div class="label">自由 Liberty</div><div class="value">${scores.liberty}</div></div>
    <div class="score-cell de"><div class="label">民主 Democracy</div><div class="value">${scores.democracy}</div></div>
    <div class="score-cell in"><div class="label">個人 Individual</div><div class="value">${scores.individual}</div></div>
  `;
}

// ---------------------------------------------------------------
// Chart rendering (SVG, range 2-9, gridline every 1.0)
// ---------------------------------------------------------------
const CHART_SIZE = 640;
const MARGIN = { top: 24, right: 24, bottom: 48, left: 52 };
const PLOT = CHART_SIZE - MARGIN.left - MARGIN.right;
const MIN_V = 2, MAX_V = 9;

function scalePos(v) {
  return ((v - MIN_V) / (MAX_V - MIN_V)) * PLOT;
}

function buildChartSVG({ xKey, yKey, xLabel, yLabel, myPoint, otherPoints, showAll }) {
  const w = CHART_SIZE;
  const h = CHART_SIZE;
  const gx = (v) => MARGIN.left + scalePos(v);
  const gy = (v) => h - MARGIN.bottom - scalePos(v);

  let gridLines = "";
  for (let v = MIN_V; v <= MAX_V; v++) {
    const x = gx(v);
    const y = gy(v);
    gridLines += `<line x1="${x}" y1="${MARGIN.top}" x2="${x}" y2="${h - MARGIN.bottom}" stroke="#D8D3CF" stroke-width="1"/>`;
    gridLines += `<line x1="${MARGIN.left}" y1="${y}" x2="${w - MARGIN.right}" y2="${y}" stroke="#D8D3CF" stroke-width="1"/>`;
    gridLines += `<text x="${x}" y="${h - MARGIN.bottom + 18}" font-size="11" text-anchor="middle">${v}</text>`;
    gridLines += `<text x="${MARGIN.left - 10}" y="${y + 4}" font-size="11" text-anchor="end">${v}</text>`;
  }
  // center reference lines at 5.5
  const cx = gx(5.5), cy = gy(5.5);
  gridLines += `<line x1="${cx}" y1="${MARGIN.top}" x2="${cx}" y2="${h - MARGIN.bottom}" stroke="#B9B2AA" stroke-width="1" stroke-dasharray="4 4"/>`;
  gridLines += `<line x1="${MARGIN.left}" y1="${cy}" x2="${w - MARGIN.right}" y2="${cy}" stroke="#B9B2AA" stroke-width="1" stroke-dasharray="4 4"/>`;

  let partyDots = "";
  for (const p of PARTIES) {
    const x = gx(p[xKey]);
    const y = gy(p[yKey]);
    const label = `${p.party}(${p.country})`;
    const title = `${p.country} ${p.party}`;
    partyDots += `<circle class="party-dot dot-click" cx="${x}" cy="${y}" r="4"
      data-title="${title}" data-xlabel="${xLabel}" data-xval="${p[xKey]}" data-ylabel="${yLabel}" data-yval="${p[yKey]}"></circle>`;
    partyDots += `<text class="party-label" x="${x + 6}" y="${y - 5}">${label}</text>`;
  }

  let otherDots = "";
  if (showAll && otherPoints && otherPoints.length) {
    for (const r of otherPoints) {
      const x = gx(r[xKey]);
      const y = gy(r[yKey]);
      const label = r.nickname || "匿名";
      otherDots += `<circle class="dot-click" cx="${x}" cy="${y}" r="4" fill="#3B5BA5" opacity="0.55"
        data-title="${label}" data-xlabel="${xLabel}" data-xval="${r[xKey]}" data-ylabel="${yLabel}" data-yval="${r[yKey]}"></circle>`;
      otherDots += `<text class="other-label" x="${x + 6}" y="${y - 5}">${label}</text>`;
    }
  }

  let meMark = "";
  if (myPoint) {
    const x = gx(myPoint[xKey]);
    const y = gy(myPoint[yKey]);
    meMark = `
      <line class="me-cross" x1="${x - 10}" y1="${y}" x2="${x + 10}" y2="${y}"/>
      <line class="me-cross" x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 10}"/>
      <circle class="me-dot dot-click" cx="${x}" cy="${y}" r="7"
        data-title="你" data-xlabel="${xLabel}" data-xval="${myPoint[xKey]}" data-ylabel="${yLabel}" data-yval="${myPoint[yKey]}"></circle>
      <text class="me-label" x="${x + 12}" y="${y - 10}">你</text>
    `;
  }

  return `
    <svg class="chart" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      ${gridLines}
      ${partyDots}
      ${otherDots}
      ${meMark}
      <text class="axis-label" x="${MARGIN.left + PLOT / 2}" y="${h - 10}" text-anchor="middle">${xLabel}</text>
      <text class="axis-label" x="${16}" y="${MARGIN.top + PLOT / 2}" text-anchor="middle" transform="rotate(-90 16 ${MARGIN.top + PLOT / 2})">${yLabel}</text>
    </svg>
  `;
}

function drawCharts() {
  hidePopover();
  const eqliShowAll = chartMode.eqli === "all";
  const indemShowAll = chartMode.indem === "all";

  document.getElementById("chart-eqli").innerHTML = buildChartSVG({
    xKey: "equality", yKey: "liberty", xLabel: "平等", yLabel: "自由",
    myPoint: scores, otherPoints: historyResults, showAll: eqliShowAll,
  });
  document.getElementById("chart-indem").innerHTML = buildChartSVG({
    xKey: "individual", yKey: "democracy", xLabel: "個人", yLabel: "民主",
    myPoint: scores, otherPoints: historyResults, showAll: indemShowAll,
  });
}

// ---------------------------------------------------------------
// Click-to-open popover for chart dots (speech-bubble style)
// ---------------------------------------------------------------
const popover = document.getElementById("dot-popover");
const popoverTitle = popover.querySelector(".dot-popover-title");
const popoverBody = popover.querySelector(".dot-popover-body");

function showPopover(targetEl) {
  const title = targetEl.getAttribute("data-title");
  const xLabel = targetEl.getAttribute("data-xlabel");
  const xVal = targetEl.getAttribute("data-xval");
  const yLabel = targetEl.getAttribute("data-ylabel");
  const yVal = targetEl.getAttribute("data-yval");

  popoverTitle.textContent = title;
  popoverBody.innerHTML = `
    <div class="dot-popover-row"><span>${xLabel}</span><strong>${xVal}</strong></div>
    <div class="dot-popover-row"><span>${yLabel}</span><strong>${yVal}</strong></div>
  `;

  popover.classList.remove("hidden");
  // measure after making visible (but keep 0 opacity handled by CSS class if needed)
  const rect = targetEl.getBoundingClientRect();
  const pw = popover.offsetWidth;
  const ph = popover.offsetHeight;
  let left = rect.left + rect.width / 2 - pw / 2;
  let top = rect.top - ph - 12;
  let arrowSide = "bottom"; // triangle points down toward the dot by default

  // clamp horizontally within viewport
  const margin = 8;
  if (left < margin) left = margin;
  if (left + pw > window.innerWidth - margin) left = window.innerWidth - margin - pw;

  // if not enough room above, place below the dot instead
  if (top < margin) {
    top = rect.bottom + 12;
    arrowSide = "top";
  }

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;

  // position the arrow to point at the dot's actual x position
  const arrowLeft = rect.left + rect.width / 2 - left;
  popover.style.setProperty("--arrow-left", `${arrowLeft}px`);
  popover.classList.toggle("arrow-top", arrowSide === "top");
  popover.classList.toggle("arrow-bottom", arrowSide === "bottom");
}

function hidePopover() {
  popover.classList.add("hidden");
}

document.addEventListener("click", (e) => {
  const dot = e.target.closest(".dot-click");
  if (dot) {
    showPopover(dot);
  } else if (!e.target.closest("#dot-popover")) {
    hidePopover();
  }
});
window.addEventListener("resize", hidePopover);
window.addEventListener("scroll", hidePopover, true);

async function refreshHistoryAndDraw() {
  drawCharts(); // draw immediately with "mine" mode, don't block on network
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("equality,liberty,democracy,individual,nickname")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error && data) {
      historyResults = data;
      drawCharts();
    }
  } catch (e) {
    // silently ignore — charts still work in "mine" mode
    console.warn("無法讀取歷史結果", e);
  }
}

document.querySelectorAll(".toggle-group[data-chart]").forEach((group) => {
  group.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chart = group.getAttribute("data-chart");
      const mode = btn.getAttribute("data-mode");
      chartMode[chart] = mode;
      group.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
      drawCharts();
    });
  });
});

// ---------------------------------------------------------------
// Save to Supabase
// ---------------------------------------------------------------
const saveBtn = document.getElementById("save-btn");
const statusMsg = document.getElementById("save-status");
const nicknameInput = document.getElementById("nickname-input");

saveBtn.addEventListener("click", async () => {
  saveBtn.disabled = true;
  statusMsg.textContent = "儲存中…";
  statusMsg.className = "status-msg";
  try {
    const nickname = nicknameInput.value.trim() || null;
    const { data, error } = await supabase
      .from("quiz_results")
      .insert([{ ...scores, nickname }])
      .select()
      .single();
    if (error) throw error;

    // best-effort: store raw answers privately (insert-only table)
    try {
      await supabase.from("quiz_answers_private").insert([{ result_id: data.id, answers }]);
    } catch (e) {
      console.warn("原始作答儲存失敗(不影響主要結果)", e);
    }

    statusMsg.textContent = "已儲存！感謝你的填答。";
    statusMsg.className = "status-msg ok";
    saveBtn.textContent = "已儲存";
    await refreshHistoryAndDraw();
  } catch (e) {
    console.error(e);
    statusMsg.textContent = "儲存失敗,請確認 config.js 是否已填入你的 Supabase 專案資訊。";
    statusMsg.className = "status-msg err";
    saveBtn.disabled = false;
  }
});
