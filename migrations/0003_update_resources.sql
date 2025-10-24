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
