# 🗄️ D1 데이터베이스 마이그레이션 가이드

**작성일**: 2025-11-10  
**데이터베이스**: gumi-coop-db  
**마이그레이션 파일**: 5개

---

## 📋 목차

1. [개요](#개요)
2. [마이그레이션 접속 방법](#마이그레이션-접속-방법)
3. [마이그레이션 실행 순서](#마이그레이션-실행-순서)
4. [실행 후 확인](#실행-후-확인)
5. [문제 해결](#문제-해결)

---

## 🎯 개요

이 가이드는 Cloudflare D1 데이터베이스에 필요한 테이블과 샘플 데이터를 설정하는 방법을 설명합니다.

### 마이그레이션 파일 목록

| 순서 | 파일명 | 설명 | 테이블 |
|------|--------|------|--------|
| 1 | `0001_initial_schema.sql` | 초기 스키마 생성 | notices, members, faqs, inquiries, resources, events |
| 2 | `0002_seed_data.sql` | 샘플 데이터 추가 | 모든 테이블에 샘플 데이터 삽입 |
| 3 | `0003_update_resources.sql` | 자료실 테이블 업데이트 | resources 재생성 및 샘플 데이터 |
| 4 | `0004_create_quote_requests.sql` | 견적 요청 테이블 | quote_requests |
| 5 | `0005_create_contact_messages.sql` | 문의하기 테이블 | contact_messages |

---

## 🔗 마이그레이션 접속 방법

### Step 1: Cloudflare Dashboard 접속

1. 브라우저에서 https://dash.cloudflare.com 접속
2. Cloudflare 계정으로 로그인

### Step 2: D1 Console 이동

1. 왼쪽 사이드바에서 **"Workers & Pages"** 클릭
2. 상단 탭에서 **"D1"** 클릭  
   (또는 직접 URL 접속: https://dash.cloudflare.com/?to=/:account/workers/d1)
3. 데이터베이스 목록에서 **`gumi-coop-db`** 클릭
4. **"Console"** 탭 클릭

### Step 3: SQL 실행 준비

- Console 화면에 SQL 입력란이 표시됩니다
- 여기에 아래 SQL들을 순서대로 복사해서 실행하면 됩니다

---

## 📝 마이그레이션 실행 순서

### ⚠️ 중요 사항

- **반드시 순서대로 실행**하세요 (1번부터 5번까지)
- 각 SQL 실행 후 "Success" 또는 "Query executed" 메시지 확인
- 오류가 발생하면 다음 단계로 진행하지 말고 문제 해결 섹션 참고

---

### 1️⃣ Migration 1: Initial Schema

**파일**: `0001_initial_schema.sql`  
**목적**: 기본 테이블 생성

<details>
<summary><strong>📄 SQL 보기 (클릭하여 펼치기)</strong></summary>

```sql
-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK(category IN ('공지사항', '보도자료', '행사', '수상')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  views INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 조합원 테이블
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_en TEXT,
  category TEXT CHECK(category IN ('제조', '교육', '연구', '기타')),
  description TEXT,
  business_areas TEXT,
  products TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- FAQ 테이블
CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK(category IN ('서비스', '기술', '조합')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 문의 테이블
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK(type IN ('일반문의', '견적요청', '가입문의')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 자료실 테이블
CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK(category IN ('기술자료', '교육자료', '다운로드', '시장정보')),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_size INTEGER,
  download_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 행사 일정 테이블
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT,
  organizer TEXT,
  registration_url TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_notices_category ON notices(category);
CREATE INDEX IF NOT EXISTS idx_notices_created_at ON notices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notices_pinned ON notices(is_pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_members_category ON members(category);
CREATE INDEX IF NOT EXISTS idx_members_featured ON members(is_featured DESC, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
```

</details>

**실행 방법**:
1. 위 SQL 전체를 복사
2. Cloudflare D1 Console에 붙여넣기
3. "Execute" 또는 "Run" 버튼 클릭
4. 성공 메시지 확인

---

### 2️⃣ Migration 2: Seed Data

**파일**: `0002_seed_data.sql`  
**목적**: 테스트용 샘플 데이터 추가

⚠️ **참고**: 이 마이그레이션은 대량의 INSERT 문을 포함합니다.

**실행 방법**:
```bash
# 로컬에서 wrangler CLI로 실행하는 것이 더 안전합니다
cd /home/user/webapp
wrangler d1 execute gumi-coop-db --file=migrations/0002_seed_data.sql
```

또는 Cloudflare Console에서 파일 내용을 복사해서 실행하세요.

---

### 3️⃣ Migration 3: Update Resources Table

**파일**: `0003_update_resources.sql`  
**목적**: 자료실 테이블 재생성 (카테고리 업데이트)

<details>
<summary><strong>📄 SQL 보기 (클릭하여 펼치기)</strong></summary>

```sql
-- 기존 resources 테이블 삭제 후 재생성 (카테고리 업데이트)
DROP TABLE IF EXISTS resources;

CREATE TABLE resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK(category IN ('조합 소개서', '신청서 양식', '기술 자료', '교육 자료', '사업 안내')),
  title TEXT NOT NULL,
  description TEXT,
  file_type TEXT,
  file_url TEXT,
  file_size TEXT,
  download_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resources_title ON resources(title);

-- 샘플 데이터 추가
INSERT INTO resources (category, title, description, file_type, file_url, file_size, download_count, created_at) VALUES
('조합 소개서', '구미디지털적층산업사업협동조합 소개서', '협동조합의 비전, 주요 사업, 조직 구성 등을 담은 공식 소개 자료입니다.', 'PDF', '#', '2.5 MB', 124, '2025-01-15'),
('신청서 양식', '조합원 가입 신청서', '조합원 가입을 위한 신청서 양식입니다. 작성 후 이메일 또는 방문 제출해 주세요.', 'DOCX', '#', '156 KB', 89, '2025-01-10'),
('기술 자료', '3D 프린팅 기술 가이드북', '3D 프린팅 기술의 기초부터 활용까지, 실무자를 위한 종합 가이드북입니다.', 'PDF', '#', '8.3 MB', 256, '2025-01-08'),
('교육 자료', '디지털 제조 혁신 사례집', '국내외 디지털 제조 혁신 우수 사례를 소개하는 자료입니다.', 'PPTX', '#', '12.7 MB', 178, '2024-12-20'),
('사업 안내', '2025년 사업계획서', '2025년도 주요 사업 계획 및 추진 일정을 안내합니다.', 'PDF', '#', '3.2 MB', 95, '2025-01-05'),
('기술 자료', 'FDM 방식 3D 프린터 사용 가이드', 'FDM(Fused Deposition Modeling) 방식 3D 프린터의 사용법과 유지보수 방법을 설명합니다.', 'PDF', '#', '5.1 MB', 142, '2024-12-15'),
('교육 자료', '적층제조 기초 교육 자료', '적층제조(Additive Manufacturing)의 기본 개념과 활용 분야를 소개하는 교육 자료입니다.', 'PDF', '#', '6.8 MB', 203, '2024-12-10'),
('신청서 양식', '시설 이용 신청서', '조합 시설 이용을 위한 신청서 양식입니다.', 'DOCX', '#', '98 KB', 67, '2024-11-25');
```

</details>

**실행 방법**:
1. 위 SQL 전체를 복사
2. Cloudflare D1 Console에 붙여넣기
3. "Execute" 버튼 클릭

---

### 4️⃣ Migration 4: Quote Requests Table

**파일**: `0004_create_quote_requests.sql`  
**목적**: 견적 요청 시스템 테이블 생성

<details>
<summary><strong>📄 SQL 보기 (클릭하여 펼치기)</strong></summary>

```sql
-- Migration: Create quote_requests table
-- Date: 2025-10-24
-- Description: Table for storing quote requests from customers

CREATE TABLE IF NOT EXISTS quote_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Basic Information
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Project Information
  service_type TEXT NOT NULL,
  quantity INTEGER,
  deadline DATE,
  budget_range TEXT,
  description TEXT NOT NULL,
  
  -- File Attachment
  file_key TEXT,
  file_name TEXT,
  file_size TEXT,
  
  -- Status Management
  status TEXT DEFAULT 'pending',  -- pending, reviewing, quoted, completed, cancelled
  admin_notes TEXT,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);

-- Insert sample data for testing
INSERT INTO quote_requests (name, company, email, phone, service_type, quantity, deadline, budget_range, description, status) 
VALUES 
  ('홍길동', '(주)테크놀로지', 'hong@example.com', '010-1234-5678', '3d-printing', 10, '2025-11-15', '100-300', '제품 시제품 제작 요청입니다. 상세한 도면은 첨부 파일을 참고해주세요.', 'pending'),
  ('김철수', '(주)제조산업', 'kim@example.com', '010-2345-6789', 'design', 5, '2025-11-20', '300-500', '3D 디자인 작업이 필요합니다. 컨셉 이미지를 보내드렸습니다.', 'reviewing'),
  ('이영희', '스타트업코리아', 'lee@example.com', '010-3456-7890', 'consulting', NULL, '2025-12-01', 'consulting', '3D 프린팅 사업 진출을 위한 컨설팅이 필요합니다.', 'quoted'),
  ('박민수', '(주)디자인랩', 'park@example.com', '010-4567-8901', 'scanning', 20, '2025-11-10', '500-1000', '기존 제품의 역설계를 위한 3D 스캐닝이 필요합니다.', 'pending');
```

</details>

**실행 방법**:
1. 위 SQL 전체를 복사
2. Cloudflare D1 Console에 붙여넣기
3. "Execute" 버튼 클릭

---

### 5️⃣ Migration 5: Contact Messages Table

**파일**: `0005_create_contact_messages.sql`  
**목적**: 문의하기 시스템 테이블 생성

<details>
<summary><strong>📄 SQL 보기 (클릭하여 펼치기)</strong></summary>

```sql
-- Migration: Create contact_messages table
-- Date: 2025-10-24
-- Description: Table for storing contact/inquiry messages from customers

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Basic Information
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Inquiry Information
  inquiry_type TEXT NOT NULL,  -- membership, service, partnership, general, other
  message TEXT NOT NULL,
  
  -- Status Management
  status TEXT DEFAULT 'pending',  -- pending, reviewing, replied, closed
  admin_notes TEXT,
  replied_at DATETIME,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_inquiry_type ON contact_messages(inquiry_type);

-- Insert sample data for testing
INSERT INTO contact_messages (name, company, email, phone, inquiry_type, message, status) 
VALUES 
  ('김철수', '(주)테크놀로지', 'kim@tech.com', '010-1234-5678', 'membership', '조합원 가입 절차에 대해 문의드립니다. 가입 조건과 필요한 서류를 알려주세요.', 'pending'),
  ('이영희', '스타트업코리아', 'lee@startup.com', '010-2345-6789', 'service', '3D 프린팅 서비스 이용을 희망합니다. 견적 상담이 가능한가요?', 'reviewing'),
  ('박민수', '', 'park@example.com', '010-3456-7890', 'partnership', '귀 조합과의 협력 사업을 제안하고자 합니다. 미팅 일정을 잡을 수 있을까요?', 'replied'),
  ('최지훈', '(주)디자인랩', 'choi@design.com', '010-4567-8901', 'general', '교육 프로그램 일정을 확인하고 싶습니다.', 'pending');
```

</details>

**실행 방법**:
1. 위 SQL 전체를 복사
2. Cloudflare D1 Console에 붙여넣기
3. "Execute" 버튼 클릭

---

## ✅ 실행 후 확인

### 테이블 생성 확인

Cloudflare D1 Console에서 다음 쿼리를 실행하여 모든 테이블이 생성되었는지 확인:

```sql
SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
```

**예상 결과**:
```
contact_messages
events
faqs
inquiries
members
notices
quote_requests
resources
```

### 데이터 확인

각 테이블의 샘플 데이터 확인:

```sql
-- 공지사항 수 확인
SELECT COUNT(*) as notice_count FROM notices;

-- 자료실 데이터 확인
SELECT COUNT(*) as resource_count FROM resources;

-- 견적 요청 확인
SELECT COUNT(*) as quote_count FROM quote_requests;

-- 문의하기 확인
SELECT COUNT(*) as contact_count FROM contact_messages;
```

---

## 🔧 문제 해결

### 문제 1: "table already exists" 오류

**원인**: 테이블이 이미 존재함  
**해결책**: 
```sql
-- 테이블 삭제 후 다시 생성
DROP TABLE IF EXISTS [테이블명];
-- 그 다음 해당 마이그레이션 재실행
```

### 문제 2: "syntax error" 오류

**원인**: SQL 구문 오류 또는 복사 시 잘림  
**해결책**: 
- SQL 전체를 다시 복사하여 붙여넣기
- 특수문자나 줄바꿈이 올바르게 복사되었는지 확인

### 문제 3: "database locked" 오류

**원인**: 다른 쿼리가 실행 중  
**해결책**: 
- 잠시 기다린 후 다시 시도
- 페이지 새로고침 후 재시도

### 문제 4: 샘플 데이터가 너무 많음

**해결책**: 
```sql
-- 모든 데이터 삭제 (테이블 구조는 유지)
DELETE FROM notices;
DELETE FROM resources;
DELETE FROM quote_requests;
DELETE FROM contact_messages;
-- 필요한 테이블에만 적용
```

---

## 📞 추가 도움

### Wrangler CLI 사용 (로컬에서 실행)

```bash
cd /home/user/webapp

# 각 마이그레이션 실행
wrangler d1 execute gumi-coop-db --file=migrations/0001_initial_schema.sql
wrangler d1 execute gumi-coop-db --file=migrations/0002_seed_data.sql
wrangler d1 execute gumi-coop-db --file=migrations/0003_update_resources.sql
wrangler d1 execute gumi-coop-db --file=migrations/0004_create_quote_requests.sql
wrangler d1 execute gumi-coop-db --file=migrations/0005_create_contact_messages.sql

# 테이블 확인
wrangler d1 execute gumi-coop-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

### 관련 문서

- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Wrangler CLI 가이드](https://developers.cloudflare.com/workers/wrangler/)
- 프로젝트 내 `ADMIN_GUIDE.md` - 관리자 가이드

---

## ✨ 완료 체크리스트

마이그레이션 완료 후 다음 항목들을 확인하세요:

- [ ] 5개 마이그레이션 모두 성공적으로 실행
- [ ] 8개 테이블 생성 확인 (`SELECT name FROM sqlite_master...`)
- [ ] 각 테이블에 샘플 데이터 존재 확인
- [ ] 웹사이트 접속하여 자료실 페이지 확인
- [ ] 견적 요청 폼 제출 테스트
- [ ] 문의하기 폼 제출 테스트
- [ ] 관리자 대시보드 접속 및 데이터 확인

---

**마이그레이션 완료 후 다음 단계**: 도메인 연결 및 최종 테스트

**작성**: 2025-11-10  
**위치**: `/home/user/webapp/D1_MIGRATION_GUIDE.md`
