import {
  PARTIES,
  COUNTRIES,
  COUNTRY_NAME_ZH,
  economicLabel,
  politicalSystemLabel,
  democracyLabel,
  individualLabel,
} from "./data.js";

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
