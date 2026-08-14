// ============================================================
// 政黨座標資料(來自世界政黨大圖工作簿,靜態背景點)
// ============================================================
export const PARTIES = [
  { country: "TW", party: "我", equality: 6.75, liberty: 7.67, democracy: 7.9, individual: 7.25 },
  { country: "GE", party: "左翼黨", equality: 6.49, liberty: 7.92, democracy: 8.5, individual: 7.14 },
  { country: "RU", party: "共產黨", equality: 6.35, liberty: 5.18, democracy: 6.11, individual: 4.05 },
  { country: "JP", party: "共產黨", equality: 6.34, liberty: 6.53, democracy: 8.15, individual: 4.65 },
  { country: "GE", party: "綠黨", equality: 6.11, liberty: 7.94, democracy: 8.48, individual: 7.15 },
  { country: "GB", party: "綠黨", equality: 5.86, liberty: 7.71, democracy: 7.63, individual: 7.72 },
  { country: "CA", party: "魁人政團", equality: 6.06, liberty: 7.6, democracy: 7.98, individual: 7.15 },
  { country: "GB", party: "蘇格蘭民族黨", equality: 5.92, liberty: 7.68, democracy: 7.63, individual: 7.72 },
  { country: "CA", party: "新民主黨", equality: 5.92, liberty: 7.53, democracy: 7.53, individual: 7.53 },
  { country: "GB", party: "自民黨", equality: 4.53, liberty: 7.45, democracy: 7.5, individual: 7.5 },
  { country: "GE", party: "自民黨", equality: 4.56, liberty: 7.38, democracy: 8.06, individual: 6.62 },
  { country: "GE", party: "社民黨", equality: 5.77, liberty: 7.28, democracy: 8.19, individual: 6.11 },
  { country: "GB", party: "工黨", equality: 6.28, liberty: 7.28, democracy: 7.25, individual: 7.3 },
  { country: "CA", party: "自由黨", equality: 5.55, liberty: 7.07, democracy: 7.31, individual: 6.83 },
  { country: "GE", party: "基民盟", equality: 5.58, liberty: 7.05, democracy: 8.09, individual: 6.0 },
  { country: "AU", party: "綠黨", equality: 5.35, liberty: 7.05, democracy: 7.83, individual: 6.27 },
  { country: "US", party: "綠黨", equality: 5.75, liberty: 6.79, democracy: 7.29, individual: 6.29 },
  { country: "HK", party: "青年新政", equality: 5.15, liberty: 6.7, democracy: 7.66, individual: 5.75 },
  { country: "CA", party: "保守黨", equality: 4.55, liberty: 6.67, democracy: 7.6, individual: 5.73 },
  { country: "GB", party: "保守黨", equality: 4.51, liberty: 6.65, democracy: 6.98, individual: 6.32 },
  { country: "US", party: "民主黨", equality: 5.2, liberty: 6.63, democracy: 7.24, individual: 6.02 },
  { country: "JP", party: "立憲民主黨", equality: 5.83, liberty: 6.53, democracy: 8.13, individual: 4.92 },
  { country: "TW", party: "時代力量", equality: 5.13, liberty: 6.44, democracy: 7.33, individual: 5.55 },
  { country: "HK", party: "公民黨", equality: 5.11, liberty: 6.24, democracy: 7.55, individual: 4.94 },
  { country: "AU", party: "工黨", equality: 5.3, liberty: 6.2, democracy: 6.97, individual: 5.44 },
  { country: "US", party: "自由意志黨", equality: 4.29, liberty: 6.15, democracy: 6.94, individual: 5.35 },
  { country: "JP", party: "自民黨", equality: 5.25, liberty: 6.05, democracy: 7.35, individual: 4.75 },
  { country: "HK", party: "民主黨", equality: 5.25, liberty: 5.9, democracy: 7.35, individual: 4.45 },
  { country: "AU", party: "自由黨", equality: 5.01, liberty: 5.85, democracy: 6.65, individual: 5.05 },
  { country: "US", party: "共和黨", equality: 3.76, liberty: 5.6, democracy: 6.47, individual: 4.73 },
  { country: "TW", party: "民進黨", equality: 5.28, liberty: 5.5, democracy: 6.64, individual: 4.36 },
  { country: "HK", party: "民健聯", equality: 5.05, liberty: 5.48, democracy: 6.65, individual: 4.31 },
  { country: "KR", party: "共同民主黨", equality: 5.62, liberty: 5.47, democracy: 6.94, individual: 4.0 },
  { country: "RU", party: "自民黨", equality: 6.5, liberty: 5.45, democracy: 6.11, individual: 4.79 },
  { country: "TW", party: "國民黨", equality: 5.25, liberty: 5.25, democracy: 6.6, individual: 3.9 },
  { country: "RU", party: "統一黨", equality: 5.7, liberty: 5.21, democracy: 6.11, individual: 4.31 },
  { country: "RU", party: "共產黨", equality: 6.34, liberty: 5.15, democracy: 6.1, individual: 4.2 },
  { country: "KR", party: "自由韓國黨", equality: 5.87, liberty: 5.02, democracy: 6.65, individual: 3.4 },
  { country: "MY", party: "希望聯盟", equality: 4.95, liberty: 4.77, democracy: 5.6, individual: 3.94 },
  { country: "MY", party: "國民陣線", equality: 5.06, liberty: 4.5, democracy: 5.3, individual: 3.7 },
  { country: "MY", party: "和諧陣線", equality: 5.0, liberty: 4.4, democracy: 5.2, individual: 3.6 },
];

// ============================================================
// 題目與計分邏輯
// ------------------------------------------------------------
// 4 個維度: equality(平等) / democracy(民主) / individual(個人) / liberty(自由,由 democracy+individual 平均得出,不直接出題)
// scale: "pair10"(1-10 兩極敘述) | "importance10"(1-10 重要性) | "agree4"(1-4 同意度,換算後反向) | "justify10"(1-10 正當性)
// reverse: true 表示原始題義方向與維度分數方向相反,計分時需做 11-x
// ============================================================

export const QUESTIONS = [
  // ---- 組一:平等(1-10, 兩極敘述, 5題) ----
  { id: "e1", group: 1, scale: "pair10", dimension: "equality", reverse: false,
    left: "收入差距應擴大以鼓勵個人努力", right: "收入應盡可能平等" },
  { id: "e2", group: 1, scale: "pair10", dimension: "equality", reverse: false,
    left: "個人應該承擔更多責任來養活自己", right: "國家應該承擔更多責任來照顧每個人的生活" },
  { id: "e3", group: 1, scale: "pair10", dimension: "equality", reverse: false,
    left: "私營企業應擴大", right: "公營企業應擴大" },
  { id: "e4", group: 1, scale: "pair10", dimension: "equality", reverse: false,
    left: "競爭是好的", right: "競爭是有害的" },
  { id: "e5", group: 1, scale: "pair10", dimension: "equality", reverse: false,
    left: "長期而言，努力工作通常會帶來較好的生活", right: "努力工作通常不會帶來成功，更重要的是運氣和人際關係" },

  // ---- 組二:重要性(1-10, 8題) ----
  { id: "i1", group: 2, scale: "importance10", dimension: "equality", reverse: false,
    text: "政府向富人課稅並補助窮人" },
  { id: "i2", group: 2, scale: "importance10", dimension: "equality", reverse: false,
    text: "失業的人受到政府的補助" },
  { id: "i3", group: 2, scale: "importance10", dimension: "equality", reverse: false,
    text: "政府使民眾的收入平等" },
  { id: "i4", group: 2, scale: "importance10", dimension: "democracy", reverse: false,
    text: "人民自由地選舉領導者" },
  { id: "i5", group: 2, scale: "importance10", dimension: "democracy", reverse: true,
    text: "人民服從他們的統治者" },
  { id: "i6", group: 2, scale: "importance10", dimension: "democracy", reverse: false,
    text: "有公民權保護人民免於政府的壓迫" },
  { id: "i7", group: 2, scale: "importance10", dimension: "democracy", reverse: true,
    text: "政府無能時由軍隊接管" },
  { id: "i8", group: 2, scale: "importance10", dimension: "democracy", reverse: false,
    text: "施行民主體制" },

  // ---- 組三:同意度(1-4制, 5題, 全數反向) ----
  { id: "a1", group: 3, scale: "agree4", dimension: "democracy", reverse: true,
    text: "擁有一個不會受到立法院與選舉所干擾、強而有力的領導者" },
  { id: "a2", group: 3, scale: "agree4", dimension: "democracy", reverse: true,
    text: "施行軍事統治" },
  { id: "a3", group: 3, scale: "agree4", dimension: "democracy", reverse: true,
    text: "政府有權在公共場所裝監視器監視人" },
  { id: "a4", group: 3, scale: "agree4", dimension: "democracy", reverse: true,
    text: "政府有權監控網路上所有的電子郵件和訊息" },
  { id: "a5", group: 3, scale: "agree4", dimension: "democracy", reverse: true,
    text: "政府有權未經告知蒐集任何民眾的資訊" },

  // ---- 組四:正當性(1-10, 8題, 個人維度) ----
  { id: "j1", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "同性戀" },
  { id: "j2", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "墮胎" },
  { id: "j3", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "性交易" },
  { id: "j4", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "離婚" },
  { id: "j5", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "婚前性行為" },
  { id: "j6", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "性關係開放" },
  { id: "j7", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "自殺" },
  { id: "j8", group: 4, scale: "justify10", dimension: "individual", reverse: false, text: "安樂死" },
];

// 1-4 制轉 1-10 制: 1→1, 2→4, 3→7, 4→10
function agree4to10(x) {
  return 1 + (x - 1) * 3;
}

// 根據 dimension/scale/reverse,把單題原始答案轉成 1-10 的「維度分數」
function toDimensionValue(question, rawValue) {
  let v = rawValue;
  if (question.scale === "agree4") {
    v = agree4to10(v);
  }
  if (question.reverse) {
    v = 11 - v;
  }
  return v;
}

// answers: { [questionId]: rawValue }
export function computeScores(answers) {
  const buckets = { equality: [], democracy: [], individual: [] };
  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (raw === undefined || raw === null) continue;
    const v = toDimensionValue(q, raw);
    buckets[q.dimension].push(v);
  }
  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);

  const equality = avg(buckets.equality);
  const democracy = avg(buckets.democracy);
  const individual = avg(buckets.individual);
  const liberty = democracy !== null && individual !== null ? (democracy + individual) / 2 : null;

  return {
    equality: equality !== null ? Math.round(equality * 100) / 100 : null,
    democracy: democracy !== null ? Math.round(democracy * 100) / 100 : null,
    individual: individual !== null ? Math.round(individual * 100) / 100 : null,
    liberty: liberty !== null ? Math.round(liberty * 100) / 100 : null,
  };
}
