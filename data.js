// ============================================================
// 政黨座標資料(來自世界政黨大圖工作簿,靜態背景點)
// ============================================================
export const PARTIES = [
  { country: "TW", party: "我", equality: 6.75, liberty: 7.67, democracy: 7.9, individual: 7.25 },
  { country: "GE", party: "左翼黨", equality: 6.49, liberty: 7.92, democracy: 8.5, individual: 7.14 },
  { country: "RU", party: "共產黨", equality: 6.35, liberty: 5.18, democracy: 6.11, individual: 4.05 },
  { country: "JP", party: "共產黨", equality: 6.34, liberty: 6.53, democracy: 8.16, individual: 4.7 },
  { country: "RU", party: "自民黨", equality: 6.19, liberty: 5.43, democracy: 6.19, individual: 4.47 },
  { country: "GE", party: "綠黨", equality: 6.1, liberty: 7.94, democracy: 8.44, individual: 7.25 },
  { country: "CA", party: "新民主黨", equality: 6.1, liberty: 7.45, democracy: 7.55, individual: 7.16 },
  { country: "CA", party: "魁人政團", equality: 6.07, liberty: 7.53, democracy: 7.96, individual: 6.9 },
  { country: "GB", party: "蘇格蘭民族黨", equality: 6.07, liberty: 7.58, democracy: 7.63, individual: 7.33 },
  { country: "RU", party: "統一黨", equality: 6.04, liberty: 5.21, democracy: 6.22, individual: 4.0 },
  { country: "GB", party: "工黨", equality: 6.02, liberty: 7.25, democracy: 7.42, individual: 6.87 },
  { country: "GE", party: "社民黨", equality: 5.94, liberty: 7.26, democracy: 8.13, individual: 6.19 },
  { country: "GB", party: "綠黨", equality: 5.92, liberty: 7.73, democracy: 7.75, individual: 7.5 },
  { country: "KR", party: "共同民主黨", equality: 5.78, liberty: 5.43, democracy: 6.95, individual: 3.71 },
  { country: "JP", party: "立憲民主黨", equality: 5.76, liberty: 6.52, democracy: 8.07, individual: 4.78 },
  { country: "CA", party: "自由黨", equality: 5.7, liberty: 7.05, democracy: 7.35, individual: 6.54 },
  { country: "AU", party: "綠黨", equality: 5.67, liberty: 6.99, democracy: 7.56, individual: 7.69 },
  { country: "KR", party: "自由韓國黨", equality: 5.66, liberty: 5.03, democracy: 6.49, individual: 3.37 },
  { country: "US", party: "綠黨", equality: 5.65, liberty: 6.81, democracy: 7.24, individual: 6.17 },
  { country: "GE", party: "基民盟", equality: 5.57, liberty: 7.02, democracy: 7.96, individual: 5.88 },
  { country: "HK", party: "青年新政", equality: 5.47, liberty: 6.68, democracy: 7.69, individual: 5.47 },
  { country: "AU", party: "工黨", equality: 5.38, liberty: 6.32, democracy: 7.02, individual: 6.51 },
  { country: "GE", party: "自民黨", equality: 5.37, liberty: 7.4, democracy: 8.04, individual: 6.56 },
  { country: "GB", party: "自民黨", equality: 5.35, liberty: 7.5, democracy: 7.6, individual: 7.2 },
  { country: "US", party: "民主黨", equality: 5.35, liberty: 6.61, democracy: 7.15, individual: 5.88 },
  { country: "TW", party: "民進黨", equality: 5.31, liberty: 5.44, democracy: 6.67, individual: 4.01 },
  { country: "HK", party: "民主黨", equality: 5.25, liberty: 5.95, democracy: 7.34, individual: 4.36 },
  { country: "TW", party: "國民黨", equality: 5.25, liberty: 5.28, democracy: 6.67, individual: 3.7 },
  { country: "JP", party: "自民黨", equality: 5.21, liberty: 6.07, democracy: 7.43, individual: 4.51 },
  { country: "MY", party: "國民陣線", equality: 5.21, liberty: 4.55, democracy: 5.34, individual: 3.57 },
  { country: "HK", party: "民建聯", equality: 5.17, liberty: 5.4, democracy: 6.57, individual: 4.04 },
  { country: "HK", party: "公民黨", equality: 5.16, liberty: 6.4, democracy: 7.66, individual: 4.93 },
  { country: "TW", party: "時代力量", equality: 5.15, liberty: 6.5, democracy: 7.47, individual: 5.34 },
  { country: "MY", party: "和諧陣線", equality: 5.0, liberty: 4.43, democracy: 5.27, individual: 3.39 },
  { country: "MY", party: "希望聯盟", equality: 4.93, liberty: 4.79, democracy: 5.58, individual: 3.8 },
  { country: "CA", party: "保守黨", equality: 4.57, liberty: 6.69, democracy: 7.3, individual: 5.87 },
  { country: "GB", party: "保守黨", equality: 4.53, liberty: 6.68, democracy: 6.89, individual: 6.27 },
  { country: "AU", party: "自由黨", equality: 4.4, liberty: 5.81, democracy: 6.73, individual: 6.26 },
  { country: "US", party: "自由意志黨", equality: 4.28, liberty: 6.34, democracy: 6.93, individual: 5.55 },
  { country: "US", party: "共和黨", equality: 3.75, liberty: 5.6, democracy: 6.59, individual: 4.42 },
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

// ============================================================
// 國家代碼 → 中文
// ============================================================
export const COUNTRY_NAME_ZH = {
  TW: "台灣", GE: "德國", RU: "俄羅斯", JP: "日本", GB: "英國",
  CA: "加拿大", US: "美國", HK: "香港", AU: "澳洲", KR: "韓國", MY: "馬來西亞",
};

// ============================================================
// 找出座標最接近的政黨(只看「平等 x 自由」兩維歐氏距離)
// ============================================================
export function findNearestParty(scores) {
  const dims = ["equality", "liberty"];
  let best = null;
  let bestDist = Infinity;
  for (const p of PARTIES) {
    let sumSq = 0;
    for (const d of dims) {
      const diff = scores[d] - p[d];
      sumSq += diff * diff;
    }
    const dist = Math.sqrt(sumSq);
    if (dist < bestDist) {
      bestDist = dist;
      best = p;
    }
  }
  return { party: best, distance: Math.round(bestDist * 100) / 100 };
}

// ============================================================
// 分數 → 光譜評語
// ============================================================
export function economicLabel(v) {
  if (v <= 3.0) return "極右";
  if (v <= 4.0) return "右翼";
  if (v <= 5.0) return "中間偏右";
  if (v <= 5.9) return "中間";
  if (v <= 6.9) return "中間偏左";
  if (v <= 7.9) return "左翼";
  return "極左";
}

// 「政治體制」(自由分數,即民主+個人平均),區間結構與經濟軸相同
export function politicalSystemLabel(v) {
  if (v <= 3.0) return "極權";
  if (v <= 4.0) return "威權";
  if (v <= 5.0) return "偏向威權";
  if (v <= 5.9) return "中間";
  if (v <= 6.9) return "偏向自由";
  if (v <= 7.9) return "自由";
  return "自由意志";
}

// 「政治自由」(民主分數)
export function democracyLabel(v) {
  if (v <= 3.0) return "極權";
  if (v <= 5.0) return "威權";
  if (v <= 6.4) return "混合";
  if (v <= 7.9) return "有限民主";
  return "完全民主";
}

// 「個人選擇」(個人分數)
export function individualLabel(v) {
  if (v <= 3.0) return "反動";
  if (v <= 4.5) return "保守";
  if (v <= 5.9) return "中立";
  if (v <= 7.9) return "進步";
  return "基進";
}

// 依維度名稱(equality/liberty/democracy/individual)取得對應評語
export function getTierLabel(dimension, v) {
  switch (dimension) {
    case "equality": return economicLabel(v);
    case "liberty": return politicalSystemLabel(v);
    case "democracy": return democracyLabel(v);
    case "individual": return individualLabel(v);
    default: return "";
  }
}
