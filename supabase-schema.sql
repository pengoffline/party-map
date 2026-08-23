-- ============================================================
-- 在 Supabase Dashboard → SQL Editor 貼上並執行整份檔案
-- ============================================================

-- 公開結果表:只存四個分數,用來畫散點圖(所有人都看得到,含匿名訪客)
create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  equality numeric not null,
  liberty numeric not null,
  democracy numeric not null,
  individual numeric not null,
  nickname text
);

alter table quiz_results enable row level security;

-- 任何人都可以新增一筆自己的結果
create policy "anyone can insert quiz_results"
  on quiz_results for insert
  to anon
  with check (true);

-- 任何人都可以讀取全部結果(用來畫「所有歷史填答者」的疊圖)
create policy "anyone can read quiz_results"
  on quiz_results for select
  to anon
  using (true);

-- ------------------------------------------------------------
-- 私人答案表(選用):存每一題的原始作答,不開放公開讀取,
-- 只有你自己用 service_role key(後台)才能查詢,適合之後做研究分析。
-- 如果不需要保留原始逐題資料,可以整段不建這張表,app.js 也可以不呼叫它。
--
-- answers:26 題計分題(平等/自由/民主/個人)的逐題原始作答,維持 JSON 格式
-- self_lr / residence / party_support / age:4 題附加題,各自獨立欄位,方便直接篩選查詢
-- ------------------------------------------------------------
create table if not exists quiz_answers_private (
  id uuid primary key default gen_random_uuid(),
  result_id uuid references quiz_results(id) on delete cascade,
  created_at timestamptz not null default now(),
  answers jsonb not null,
  self_lr numeric,
  residence text,
  party_support text,
  age text
);

alter table quiz_answers_private enable row level security;

-- 任何人可以新增(寫入自己的作答),但不開放任何人讀取
create policy "anyone can insert quiz_answers_private"
  on quiz_answers_private for insert
  to anon
  with check (true);

