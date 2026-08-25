// ============================================================
// 政黨座標資料(來自世界政黨大圖工作簿,靜態背景點)
// ============================================================
export const PARTIES = [
  { country: "GE", party: "綠黨", equality: 6.1, liberty: 7.94, democracy: 8.64, individual: 7.25, year: 2018, n: 194 },
  { country: "GE", party: "左翼黨", equality: 6.49, liberty: 7.92, democracy: 8.7, individual: 7.14, year: 2018, n: 117 },
  { country: "GB", party: "綠黨", equality: 5.92, liberty: 7.73, democracy: 7.95, individual: 7.5, year: 2022, n: 178 },
  { country: "GB", party: "蘇格蘭民族黨", equality: 6.07, liberty: 7.58, democracy: 7.83, individual: 7.33, year: 2022, n: 175 },
  { country: "CA", party: "魁人政團", equality: 6.07, liberty: 7.53, democracy: 8.15, individual: 6.9, year: 2020, n: 240 },
  { country: "GB", party: "自民黨", equality: 5.35, liberty: 7.5, democracy: 7.8, individual: 7.2, year: 2022, n: 229 },
  { country: "CA", party: "新民主黨", equality: 6.1, liberty: 7.45, democracy: 7.75, individual: 7.16, year: 2020, n: 654 },
  { country: "GE", party: "自民黨", equality: 5.37, liberty: 7.4, democracy: 8.24, individual: 6.56, year: 2018, n: 98 },
  { country: "CA", party: "綠黨", equality: 5.87, liberty: 7.27, democracy: 7.59, individual: 6.95, year: 2020, n: 251 },
  { country: "GE", party: "社民黨", equality: 5.94, liberty: 7.26, democracy: 8.33, individual: 6.19, year: 2018, n: 255 },
  { country: "GB", party: "工黨", equality: 6.02, liberty: 7.25, democracy: 7.62, individual: 6.87, year: 2022, n: 702 },
  { country: "CA", party: "自由黨", equality: 5.7, liberty: 7.05, democracy: 7.55, individual: 6.54, year: 2020, n: 1004 },
  { country: "GE", party: "基民盟", equality: 5.57, liberty: 7.02, democracy: 8.16, individual: 5.88, year: 2018, n: 433 },
  { country: "AU", party: "綠黨", equality: 5.67, liberty: 6.99, democracy: 7.76, individual: 7.69, year: 2018, n: 236 },
  { country: "US", party: "綠黨", equality: 5.65, liberty: 6.81, democracy: 7.44, individual: 6.17, year: 2017, n: 57 },
  { country: "NI", party: "新芬黨", equality: 5.35, liberty: 6.79, democracy: 7.69, individual: 5.9, year: 2022, n: 61 },
  { country: "CA", party: "保守黨", equality: 4.57, liberty: 6.69, democracy: 7.5, individual: 5.87, year: 2020, n: 870 },
  { country: "GB", party: "保守黨", equality: 4.53, liberty: 6.68, democracy: 7.09, individual: 6.27, year: 2022, n: 552 },
  { country: "HK", party: "青年新政", equality: 5.47, liberty: 6.68, democracy: 7.89, individual: 5.47, year: 2020, n: 63 },
  { country: "US", party: "民主黨", equality: 5.35, liberty: 6.61, democracy: 7.35, individual: 5.88, year: 2017, n: 1125 },
  { country: "JP", party: "共產黨", equality: 6.34, liberty: 6.53, democracy: 8.36, individual: 4.7, year: 2019, n: 45 },
  { country: "JP", party: "立憲民主黨", equality: 5.76, liberty: 6.52, democracy: 8.27, individual: 4.78, year: 2019, n: 125 },
  { country: "TW", party: "時代力量", equality: 5.15, liberty: 6.5, democracy: 7.67, individual: 5.34, year: 2019, n: 51 },
  { country: "HK", party: "公民黨", equality: 5.16, liberty: 6.4, democracy: 7.86, individual: 4.93, year: 2020, n: 201 },
  { country: "US", party: "自由意志黨", equality: 4.28, liberty: 6.34, democracy: 7.13, individual: 5.55, year: 2017, n: 159 },
  { country: "AU", party: "工黨", equality: 5.38, liberty: 6.32, democracy: 7.22, individual: 6.51, year: 2018, n: 557 },
  { country: "JP", party: "自民黨", equality: 5.21, liberty: 6.07, democracy: 7.63, individual: 4.51, year: 2019, n: 429 },
  { country: "HK", party: "民主黨", equality: 5.25, liberty: 5.95, democracy: 7.54, individual: 4.36, year: 2020, n: 316 },
  { country: "AU", party: "自由黨", equality: 4.4, liberty: 5.81, democracy: 6.93, individual: 6.26, year: 2018, n: 651 },
  { country: "US", party: "共和黨", equality: 3.75, liberty: 5.6, democracy: 6.79, individual: 4.42, year: 2017, n: 829 },
  { country: "NI", party: "民主統一黨", equality: 4.61, liberty: 5.47, democracy: 6.58, individual: 4.35, year: 2022, n: 56 },
  { country: "TW", party: "民進黨", equality: 5.31, liberty: 5.44, democracy: 6.87, individual: 4.01, year: 2019, n: 251 },
  { country: "RU", party: "自民黨", equality: 6.19, liberty: 5.43, democracy: 6.39, individual: 4.47, year: 2017, n: 154 },
  { country: "KR", party: "共同民主黨", equality: 5.78, liberty: 5.43, democracy: 7.15, individual: 3.71, year: 2018, n: 533 },
  { country: "HK", party: "民建聯", equality: 5.17, liberty: 5.4, democracy: 6.77, individual: 4.04, year: 2020, n: 365 },
  { country: "TW", party: "國民黨", equality: 5.25, liberty: 5.28, democracy: 6.87, individual: 3.7, year: 2019, n: 320 },
  { country: "RU", party: "統一黨", equality: 6.04, liberty: 5.21, democracy: 6.42, individual: 4.0, year: 2017, n: 890 },
  { country: "RU", party: "共產黨", equality: 6.35, liberty: 5.18, democracy: 6.31, individual: 4.05, year: 2017, n: 141 },
  { country: "KR", party: "自由韓國黨", equality: 5.66, liberty: 5.03, democracy: 6.69, individual: 3.37, year: 2018, n: 183 },
  { country: "MY", party: "希望聯盟", equality: 4.93, liberty: 4.79, democracy: 5.78, individual: 3.8, year: 2018, n: 523 },
  { country: "MY", party: "國民陣線", equality: 5.21, liberty: 4.55, democracy: 5.54, individual: 3.57, year: 2018, n: 528 },
  { country: "MY", party: "和諧陣線", equality: 5.0, liberty: 4.43, democracy: 5.47, individual: 3.39, year: 2018, n: 155 },
];

// ============================================================
// 國家層級參考點(佔位測試資料:目前用各國政黨的樣本數加權平均計算,
// 之後有真實的國家調查數字,直接把對應國家那行換掉即可)
// ============================================================
// ============================================================
// 國家層級參考點(來自世界價值觀調查工作簿「國家」工作表,不顯示樣本數)
// ============================================================
// ============================================================
// 國家層級參考點(來自世界價值觀調查工作簿「國家」工作表,不顯示樣本數)
// ============================================================
export const COUNTRIES = [
  { country: "NL", equality: 5.59, liberty: 7.66, democracy: 7.81, individual: 7.51 },
  { country: "GE", equality: 5.84, liberty: 7.28, democracy: 8.29, individual: 6.26 },
  { country: "GB", equality: 5.35, liberty: 7.05, democracy: 7.37, individual: 6.72 },
  { country: "JP", equality: 5.55, liberty: 6.33, democracy: 7.81, individual: 4.85 },
  { country: "US", equality: 4.72, liberty: 6.12, democracy: 7.04, individual: 5.21 },
  { country: "HK", equality: 5.26, liberty: 5.78, democracy: 7.21, individual: 4.35 },
  { country: "TW", equality: 5.25, liberty: 5.55, democracy: 6.95, individual: 4.15 },
  { country: "BR", equality: 5.49, liberty: 5.43, democracy: 6.77, individual: 4.09 },
  { country: "RU", equality: 6.11, liberty: 5.37, democracy: 6.51, individual: 4.22 },
  { country: "KR", equality: 5.7, liberty: 5.34, democracy: 7.0, individual: 3.68 },
  { country: "SG", equality: 5.21, liberty: 5.24, democracy: 7.03, individual: 3.44 },
  { country: "CN", equality: 5.73, liberty: 4.29, democracy: 5.98, individual: 2.6 },
  { country: "IN", equality: 5.73, liberty: 4.18, democracy: 5.89, individual: 2.46 },
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
  NI: "北愛爾蘭", NL: "荷蘭", BR: "巴西", SG: "新加坡", CN: "中國", IN: "印度",
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
  if (v <= 4.5) return "傳統";
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

// ============================================================
// 各評語段落的說明文字(佔位文字,請自行逐條填寫)
// 「社會」軸不隨結果變化,只有一段固定文字,不放在這個對照表裡
// ============================================================
export const ECONOMIC_EXPLANATIONS = {
  "極左": "（請在此填寫「極左」的說明文字）",
  "左翼": "（請在此填寫「左翼」的說明文字）",
  "中間偏左": "（請在此填寫「中間偏左」的說明文字）",
  "中間": "（請在此填寫「中間」的說明文字）",
  "中間偏右": "（請在此填寫「中間偏右」的說明文字）",
  "右翼": "（請在此填寫「右翼」的說明文字）",
  "極右": "（請在此填寫「極右」的說明文字）",
};

export const DEMOCRACY_EXPLANATIONS = {
  "極權": "（請在此填寫「極權」的說明文字）",
  "威權": "（請在此填寫「威權」的說明文字）",
  "混合": "（請在此填寫「混合」的說明文字）",
  "有限民主": "（請在此填寫「有限民主」的說明文字）",
  "完全民主": "（請在此填寫「完全民主」的說明文字）",
};

export const INDIVIDUAL_EXPLANATIONS = {
  "反動": "（請在此填寫「反動」的說明文字）",
  "傳統": "（請在此填寫「傳統」的說明文字）",
  "中立": "（請在此填寫「中立」的說明文字）",
  "進步": "（請在此填寫「進步」的說明文字）",
  "基進": "（請在此填寫「基進」的說明文字）",
};

// 「社會」軸固定不變的說明文字(不隨結果改變)
export const SOCIAL_EXPLANATION_FIXED = "（請自行填寫此軸固定不變的說明文字）";

// ============================================================
// 人口統計題(第 27-29 題,不計入平等/自由/民主/個人分數計算,
// 只在使用者按「儲存我的結果」時一併存進 Supabase,不在網站上顯示)
// ============================================================
export const DEMOGRAPHIC_QUESTIONS = [
  {
    id: "self_lr",
    kind: "scale10Text",
    stem: "在政治上有所謂左派與右派，如果1代表極左派，10代表極右派，一般而言，你會怎麼定位自己？",
    leftEnd: "極左派",
    rightEnd: "極右派",
    note: "這個題目不會影響分析結果",
  },
  {
    id: "residence",
    kind: "choice",
    stem: "你住在哪裡？",
    options: ["台灣", "香港", "中國", "馬來西亞", "新加坡", "其他", "不願透露"],
    note: "這個題目不會影響分析結果",
  },
  {
    id: "party_support",
    kind: "conditionalChoice",
    // 只有居住地選「台灣」或「香港」才會出現這一題,選項也依居住地不同
    dependsOn: "residence",
    stemByValue: {
      "台灣": "你較支持以下哪個黨派？",
      "香港": "你較支持以下哪個黨派？",
    },
    optionsByValue: {
      "台灣": ["民進黨", "國民黨", "民眾黨", "時代力量/綠黨/基進黨/小歐盟", "無"],
      "香港": ["建制派", "民主派", "本土派與修憲派", "無"],
    },
    note: "這個題目不會影響分析結果",
  },
  {
    id: "age",
    kind: "choice",
    stem: "你現在幾歲？",
    // 「30-39歲」與「50-59歲」之間依等差補上「40-49歲」
    options: ["19歲以下", "20-29歲", "30-39歲", "40-49歲", "50-59歲", "60歲以上", "不願透露"],
    note: "這個題目不會影響分析結果",
  },
];
