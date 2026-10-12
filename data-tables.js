import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import {
  PARTIES,
  COUNTRIES,
  COUNTRY_NAME_ZH,
  economicLabel,
  politicalSystemLabel,
  democracyLabel,
  individualLabel,
  getTierLabel,
} from "./data.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 四個面向各自對應的評語函式
const TIER_FN = {
  equality: economicLabel,
  liberty: politicalSystemLabel,
  democracy: democracyLabel,
  individual: individualLabel,
};

function formatScore(dim, value) {
  const tier = TIER_FN[dim](value);
  return `${value.toFixed(2)}<span class="table-tier">(${tier})</span>`;
}

// ---------------------------------------------------------------
// 政黨總表
// ---------------------------------------------------------------
let partySortKey = "country";
let partySortDir = "asc";

function renderPartyTable() {
  const rows = [...PARTIES].sort((a, b) => {
    let av = a[partySortKey];
    let bv = b[partySortKey];
    if (av === null || av === undefined) av = partySortDir === "asc" ? Infinity : -Infinity;
    if (bv === null || bv === undefined) bv = partySortDir === "asc" ? Infinity : -Infinity;
    if (typeof av === "string") {
      const cmp = av.localeCompare(bv, "zh-Hant");
      return partySortDir === "asc" ? cmp : -cmp;
    }
    return partySortDir === "asc" ? av - bv : bv - av;
  });

  const tbody = document.getElementById("party-tbody");
  tbody.innerHTML = rows
    .map((p) => {
      const countryZh = COUNTRY_NAME_ZH[p.country] || p.country;
      return `
        <tr>
          <td>${countryZh}</td>
          <td>${p.party}</td>
          <td class="num">${p.year ?? "—"}</td>
          <td class="num">${p.n ?? "—"}</td>
          <td class="num">${formatScore("equality", p.equality)}</td>
          <td class="num">${formatScore("liberty", p.liberty)}</td>
          <td class="num">${formatScore("democracy", p.democracy)}</td>
          <td class="num">${formatScore("individual", p.individual)}</td>
        </tr>
      `;
    })
    .join("");

  updateSortIndicators("party-table", partySortKey, partySortDir);
}

// ---------------------------------------------------------------
// 國家總表
// ---------------------------------------------------------------
let countrySortKey = "country";
let countrySortDir = "asc";

function renderCountryTable() {
  const rows = [...COUNTRIES].sort((a, b) => {
    let av = a[countrySortKey];
    let bv = b[countrySortKey];
    if (countrySortKey === "country") {
      av = COUNTRY_NAME_ZH[a.country] || a.country;
      bv = COUNTRY_NAME_ZH[b.country] || b.country;
      const cmp = av.localeCompare(bv, "zh-Hant");
      return countrySortDir === "asc" ? cmp : -cmp;
    }
    return countrySortDir === "asc" ? av - bv : bv - av;
  });

  const tbody = document.getElementById("country-tbody");
  tbody.innerHTML = rows
    .map((c) => {
      const countryZh = COUNTRY_NAME_ZH[c.country] || c.country;
      return `
        <tr>
          <td>${countryZh}</td>
          <td class="num">${formatScore("equality", c.equality)}</td>
          <td class="num">${formatScore("liberty", c.liberty)}</td>
          <td class="num">${formatScore("democracy", c.democracy)}</td>
          <td class="num">${formatScore("individual", c.individual)}</td>
        </tr>
      `;
    })
    .join("");

  updateSortIndicators("country-table", countrySortKey, countrySortDir);
}

// ---------------------------------------------------------------
// 共用:欄位標題排序狀態顯示 + 點擊事件
// ---------------------------------------------------------------
function updateSortIndicators(tableId, sortKey, sortDir) {
  const table = document.getElementById(tableId);
  table.querySelectorAll("th.sortable").forEach((th) => {
    th.classList.remove("sorted-asc", "sorted-desc");
    if (th.getAttribute("data-key") === sortKey) {
      th.classList.add(sortDir === "asc" ? "sorted-asc" : "sorted-desc");
    }
  });
}

document.querySelectorAll("#party-table th.sortable").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.getAttribute("data-key");
    if (partySortKey === key) {
      partySortDir = partySortDir === "asc" ? "desc" : "asc";
    } else {
      partySortKey = key;
      // 文字欄位預設升冪,分數欄位預設降冪(高分排前面比較直覺)
      partySortDir = key === "country" || key === "party" ? "asc" : "desc";
    }
    renderPartyTable();
  });
});

document.querySelectorAll("#country-table th.sortable").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.getAttribute("data-key");
    if (countrySortKey === key) {
      countrySortDir = countrySortDir === "asc" ? "desc" : "asc";
    } else {
      countrySortKey = key;
      countrySortDir = key === "country" ? "asc" : "desc";
    }
    renderCountryTable();
  });
});

renderPartyTable();
renderCountryTable();

// ---------------------------------------------------------------
// 政黨與國家分布圖(跟 app.js 結果頁的兩張座標圖同一套邏輯,
// 差別只在這裡沒有「你的點」可畫,因為這個頁面沒有測驗分數)
// ---------------------------------------------------------------
const isHoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let historyResults = []; // 自 Supabase 讀回來的「所有填答者」座標
let chartMode = {
  eqli: { party: true, country: false, all: false },
  indem: { party: true, country: false, all: false },
};

const CHART_SIZE = 680;
const MARGIN = { top: 40, right: 46, bottom: 62, left: 70 };
const PLOT = CHART_SIZE - MARGIN.left - MARGIN.right;
const MIN_V = 1, MAX_V = 10;

function scalePos(v) {
  return ((v - MIN_V) / (MAX_V - MIN_V)) * PLOT;
}

function buildChartSVG({ xKey, yKey, xLabel, yLabel, poleLabels, otherPoints, showParty, showCountry, showAll }) {
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

  let partyDots = "";
  if (showParty) {
    for (const p of PARTIES) {
      const x = gx(p[xKey]);
      const y = gy(p[yKey]);
      const countryZh = COUNTRY_NAME_ZH[p.country] || p.country;
      const title = p.year ? `${countryZh} ${p.party} (${p.year})` : `${countryZh} ${p.party}`;
      if (isHoverCapable) {
        const nAttr = p.n ? ` data-n="${p.n}"` : "";
        const dataAttrs = `data-title="${title}"${nAttr} data-xdim="${xKey}" data-xlabel="${xLabel}" data-xval="${p[xKey]}" data-ydim="${yKey}" data-ylabel="${yLabel}" data-yval="${p[yKey]}"`;
        partyDots += `<circle class="party-dot" cx="${x}" cy="${y}" r="4"></circle>
          <circle class="dot-hitarea dot-click" cx="${x}" cy="${y}" r="11" fill="transparent" ${dataAttrs}></circle>`;
      } else {
        // 觸控裝置:改用固定顯示的小字標籤(國碼 政黨名),避免縮放後彈出框定位跑掉
        partyDots += `<circle class="party-dot" cx="${x}" cy="${y}" r="4"></circle>
          <text class="dot-label" x="${x + 4}" y="${y - 4}">${p.country} ${p.party}</text>`;
      }
    }
  }

  let countryDots = "";
  if (showCountry) {
    for (const c of COUNTRIES) {
      const x = gx(c[xKey]);
      const y = gy(c[yKey]);
      const countryZh = COUNTRY_NAME_ZH[c.country] || c.country;
      if (isHoverCapable) {
        // 國家層級的點不顯示樣本數,只顯示國名跟數值
        const dataAttrs = `data-title="${countryZh}" data-xdim="${xKey}" data-xlabel="${xLabel}" data-xval="${c[xKey]}" data-ydim="${yKey}" data-ylabel="${yLabel}" data-yval="${c[yKey]}"`;
        countryDots += `<circle class="country-dot" cx="${x}" cy="${y}" r="5"></circle>
          <circle class="dot-hitarea dot-click" cx="${x}" cy="${y}" r="12" fill="transparent" ${dataAttrs}></circle>`;
      } else {
        // 觸控裝置:改用固定顯示的國家名稱標籤
        countryDots += `<circle class="country-dot" cx="${x}" cy="${y}" r="5"></circle>
          <text class="dot-label dot-label-country" x="${x + 5}" y="${y - 5}">${countryZh}</text>`;
      }
    }
  }

  let otherDots = "";
  if (showAll && otherPoints && otherPoints.length) {
    for (const r of otherPoints) {
      const x = gx(r[xKey]);
      const y = gy(r[yKey]);
      const dataAttrs = `data-title="填答者" data-xdim="${xKey}" data-xlabel="${xLabel}" data-xval="${r[xKey]}" data-ydim="${yKey}" data-ylabel="${yLabel}" data-yval="${r[yKey]}"`;
      otherDots += `<circle class="other-dot" cx="${x}" cy="${y}" r="4" fill="#3B5BA5" opacity="0.55"></circle>
        <circle class="dot-hitarea dot-click" cx="${x}" cy="${y}" r="11" fill="transparent" ${dataAttrs}></circle>`;
    }
  }

  let poleText = "";
  if (poleLabels) {
    const { left, right, top, bottom } = poleLabels;
    const midX = MARGIN.left + PLOT / 2;
    const midY = MARGIN.top + PLOT / 2;
    poleText += `<text class="pole-label" x="${midX}" y="${MARGIN.top - 14}" text-anchor="middle">${top}</text>`;
    poleText += `<text class="pole-label" x="${midX}" y="${h - 12}" text-anchor="middle">${bottom}</text>`;
    poleText += `<text class="pole-label" x="${14}" y="${midY}" text-anchor="start">${left}</text>`;
    poleText += `<text class="pole-label" x="${w - 14}" y="${midY}" text-anchor="end">${right}</text>`;
  }

  // 這個頁面沒有「你的點」(myPoint) 可畫 —— 跟結果頁的圖唯一的差別就在這裡
  return `
    <svg class="chart" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      ${gridLines}
      ${poleText}
      ${countryDots}
      ${partyDots}
      ${otherDots}
    </svg>
  `;
}

function drawCharts() {
  hidePopover();

  document.getElementById("chart-eqli").innerHTML = buildChartSVG({
    xKey: "equality", yKey: "liberty", xLabel: "經濟", yLabel: "社會",
    poleLabels: { left: "市場", right: "平等", top: "自由", bottom: "威權" },
    otherPoints: historyResults,
    showParty: chartMode.eqli.party, showCountry: chartMode.eqli.country, showAll: chartMode.eqli.all,
  });
  document.getElementById("chart-indem").innerHTML = buildChartSVG({
    xKey: "individual", yKey: "democracy", xLabel: "個人選擇", yLabel: "政治體制",
    poleLabels: { left: "傳統", right: "進步", top: "民主", bottom: "威權" },
    otherPoints: historyResults,
    showParty: chartMode.indem.party, showCountry: chartMode.indem.country, showAll: chartMode.indem.all,
  });
}

// ---------------------------------------------------------------
// Click-to-open popover for chart dots (speech-bubble style)
// ---------------------------------------------------------------
const popover = document.getElementById("dot-popover");
const popoverTitle = popover.querySelector(".dot-popover-title");
const popoverBody = popover.querySelector(".dot-popover-body");

function showDotPopover(targetEl) {
  const title = targetEl.getAttribute("data-title");
  const n = targetEl.getAttribute("data-n");
  const xDim = targetEl.getAttribute("data-xdim");
  const xLabel = targetEl.getAttribute("data-xlabel");
  const xVal = targetEl.getAttribute("data-xval");
  const yDim = targetEl.getAttribute("data-ydim");
  const yLabel = targetEl.getAttribute("data-ylabel");
  const yVal = targetEl.getAttribute("data-yval");

  const xTier = getTierLabel(xDim, Number(xVal));
  const yTier = getTierLabel(yDim, Number(yVal));

  popoverTitle.textContent = title;
  const nRow = n ? `<div class="dot-popover-n">N=${n}</div>` : "";
  popoverBody.innerHTML = `
    ${nRow}
    <div class="dot-popover-row"><span>${xLabel}</span><strong>${xVal}<span class="dot-popover-tier">(${xTier})</span></strong></div>
    <div class="dot-popover-row"><span>${yLabel}</span><strong>${yVal}<span class="dot-popover-tier">(${yTier})</span></strong></div>
  `;
  positionPopover(targetEl);
}

function showInfoPopover(targetEl) {
  const title = targetEl.getAttribute("data-info-title");
  const body = targetEl.getAttribute("data-info-body");
  popoverTitle.textContent = title;
  popoverBody.innerHTML = `<p class="dot-popover-text">${body}</p>`;
  positionPopover(targetEl);
}

function positionPopover(targetEl) {
  popover.classList.remove("hidden");
  const rect = targetEl.getBoundingClientRect();
  const pw = popover.offsetWidth;
  const ph = popover.offsetHeight;
  let left = rect.left + rect.width / 2 - pw / 2;
  let top = rect.top - ph - 12;
  let arrowSide = "bottom"; // triangle points down toward the dot by default

  const margin = 8;
  if (left < margin) left = margin;
  if (left + pw > window.innerWidth - margin) left = window.innerWidth - margin - pw;

  if (top < margin) {
    top = rect.bottom + 12;
    arrowSide = "top";
  }

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;

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
  const infoBtn = e.target.closest(".info-btn");
  if (dot) {
    showDotPopover(dot);
  } else if (infoBtn) {
    showInfoPopover(infoBtn);
  } else if (!e.target.closest("#dot-popover")) {
    hidePopover();
  }
});

if (isHoverCapable) {
  document.addEventListener("mouseover", (e) => {
    const dot = e.target.closest(".dot-hitarea");
    if (dot) {
      dot.previousElementSibling?.classList.add("dot-hovered");
      showDotPopover(dot);
      return;
    }
    const infoBtn = e.target.closest(".info-btn");
    if (infoBtn) showInfoPopover(infoBtn);
  });

  document.addEventListener("mouseout", (e) => {
    const dot = e.target.closest(".dot-hitarea");
    const related = e.relatedTarget;
    const movingIntoPopover = related && related.closest && related.closest("#dot-popover");
    const movingIntoSameDot = related && related.closest && related.closest(".dot-hitarea") === dot;
    if (dot && !movingIntoPopover && !movingIntoSameDot) {
      dot.previousElementSibling?.classList.remove("dot-hovered");
      hidePopover();
    }
    const infoBtn = e.target.closest(".info-btn");
    if (infoBtn && !movingIntoPopover) hidePopover();
  });
}

window.addEventListener("resize", hidePopover);
window.addEventListener("scroll", hidePopover, true);

document.querySelectorAll(".toggle-group[data-chart]").forEach((group) => {
  group.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chart = group.getAttribute("data-chart");
      const mode = btn.getAttribute("data-mode");
      chartMode[chart][mode] = !chartMode[chart][mode];
      btn.classList.toggle("active", chartMode[chart][mode]);
      drawCharts();
    });
  });
});

async function refreshHistoryAndDraw() {
  drawCharts(); // 先畫一次(不等網路),再嘗試讀取所有填答者的資料
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("equality,liberty,democracy,individual")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error && data) {
      historyResults = data;
      drawCharts();
    }
  } catch (e) {
    // 讀取失敗不影響「政黨」「國家」兩個圖層的顯示
    console.warn("無法讀取歷史結果", e);
  }
}

refreshHistoryAndDraw();
