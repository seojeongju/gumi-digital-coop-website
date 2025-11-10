-- =====================================================
-- D1 Database Migration - All in One
-- =====================================================
-- Created: 2025-11-10
-- Database: gumi-coop-db
-- Description: Complete database setup with all tables
-- =====================================================

-- =====================================================
-- STEP 1: DROP EXISTING TABLES (if needed)
-- =====================================================

DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS quote_requests;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS notices;

-- =====================================================
-- STEP 2: CREATE TABLES
-- =====================================================

-- 1. notices 테이블
CREATE TABLE notices (
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

-- 2. members 테이블
CREATE TABLE members (
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

-- 3. faqs 테이블
CREATE TABLE faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK(category IN ('서비스', '기술', '조합')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. inquiries 테이블
CREATE TABLE inquiries (
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

-- 5. events 테이블
CREATE TABLE events (
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

-- 6. resources 테이블
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

-- 7. quote_requests 테이블
CREATE TABLE quote_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  quantity INTEGER,
  deadline DATE,
  budget_range TEXT,
  description TEXT NOT NULL,
  file_key TEXT,
  file_name TEXT,
  file_size TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. contact_messages 테이블
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  replied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- STEP 3: CREATE INDEXES
-- =====================================================

CREATE INDEX idx_notices_category ON notices(category);
CREATE INDEX idx_notices_created_at ON notices(created_at DESC);
CREATE INDEX idx_notices_pinned ON notices(is_pinned DESC, created_at DESC);
CREATE INDEX idx_members_category ON members(category);
CREATE INDEX idx_members_featured ON members(is_featured DESC, display_order ASC);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_created_at ON resources(created_at DESC);
CREATE INDEX idx_resources_title ON resources(title);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_email ON quote_requests(email);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_inquiry_type ON contact_messages(inquiry_type);

-- =====================================================
-- STEP 4: INSERT SAMPLE DATA
-- =====================================================

-- resources 샘플 데이터
INSERT INTO resources (category, title, description, file_type, file_url, file_size, download_count, created_at) VALUES
('조합 소개서', '구미디지털적층산업사업협동조합 소개서', '협동조합의 비전, 주요 사업, 조직 구성 등을 담은 공식 소개 자료입니다.', 'PDF', '#', '2.5 MB', 124, '2025-01-15'),
('신청서 양식', '조합원 가입 신청서', '조합원 가입을 위한 신청서 양식입니다. 작성 후 이메일 또는 방문 제출해 주세요.', 'DOCX', '#', '156 KB', 89, '2025-01-10'),
('기술 자료', '3D 프린팅 기술 가이드북', '3D 프린팅 기술의 기초부터 활용까지, 실무자를 위한 종합 가이드북입니다.', 'PDF', '#', '8.3 MB', 256, '2025-01-08'),
('교육 자료', '디지털 제조 혁신 사례집', '국내외 디지털 제조 혁신 우수 사례를 소개하는 자료입니다.', 'PPTX', '#', '12.7 MB', 178, '2024-12-20'),
('사업 안내', '2025년 사업계획서', '2025년도 주요 사업 계획 및 추진 일정을 안내합니다.', 'PDF', '#', '3.2 MB', 95, '2025-01-05'),
('기술 자료', 'FDM 방식 3D 프린터 사용 가이드', 'FDM(Fused Deposition Modeling) 방식 3D 프린터의 사용법과 유지보수 방법을 설명합니다.', 'PDF', '#', '5.1 MB', 142, '2024-12-15'),
('교육 자료', '적층제조 기초 교육 자료', '적층제조(Additive Manufacturing)의 기본 개념과 활용 분야를 소개하는 교육 자료입니다.', 'PDF', '#', '6.8 MB', 203, '2024-12-10'),
('신청서 양식', '시설 이용 신청서', '조합 시설 이용을 위한 신청서 양식입니다.', 'DOCX', '#', '98 KB', 67, '2024-11-25');

-- quote_requests 샘플 데이터
INSERT INTO quote_requests (name, company, email, phone, service_type, quantity, deadline, budget_range, description, status) VALUES 
('홍길동', '(주)테크놀로지', 'hong@example.com', '010-1234-5678', '3d-printing', 10, '2025-11-15', '100-300', '제품 시제품 제작 요청입니다. 상세한 도면은 첨부 파일을 참고해주세요.', 'pending'),
('김철수', '(주)제조산업', 'kim@example.com', '010-2345-6789', 'design', 5, '2025-11-20', '300-500', '3D 디자인 작업이 필요합니다. 컨셉 이미지를 보내드렸습니다.', 'reviewing'),
('이영희', '스타트업코리아', 'lee@example.com', '010-3456-7890', 'consulting', NULL, '2025-12-01', 'consulting', '3D 프린팅 사업 진출을 위한 컨설팅이 필요합니다.', 'quoted'),
('박민수', '(주)디자인랩', 'park@example.com', '010-4567-8901', 'scanning', 20, '2025-11-10', '500-1000', '기존 제품의 역설계를 위한 3D 스캐닝이 필요합니다.', 'pending');

-- contact_messages 샘플 데이터
INSERT INTO contact_messages (name, company, email, phone, inquiry_type, message, status) VALUES 
('김철수', '(주)테크놀로지', 'kim@tech.com', '010-1234-5678', 'membership', '조합원 가입 절차에 대해 문의드립니다. 가입 조건과 필요한 서류를 알려주세요.', 'pending'),
('이영희', '스타트업코리아', 'lee@startup.com', '010-2345-6789', 'service', '3D 프린팅 서비스 이용을 희망합니다. 견적 상담이 가능한가요?', 'reviewing'),
('박민수', '', 'park@example.com', '010-3456-7890', 'partnership', '귀 조합과의 협력 사업을 제안하고자 합니다. 미팅 일정을 잡을 수 있을까요?', 'replied'),
('최지훈', '(주)디자인랩', 'choi@design.com', '010-4567-8901', 'general', '교육 프로그램 일정을 확인하고 싶습니다.', 'pending');

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
