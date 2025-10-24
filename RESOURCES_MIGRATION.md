# 자료실 마이그레이션 가이드

## 개요
자료실 페이지가 데이터베이스 기반으로 업그레이드되었습니다. 프로덕션 환경에서 작동하려면 데이터베이스 마이그레이션을 실행해야 합니다.

## 마이그레이션 실행 방법

### 1. Cloudflare 대시보드에서 실행 (권장)

1. [Cloudflare 대시보드](https://dash.cloudflare.com/)에 로그인
2. Workers & Pages 선택
3. D1 Database 섹션으로 이동
4. `gumi-coop-db` 데이터베이스 선택
5. Console 탭에서 아래 SQL을 실행:

```sql
-- 기존 resources 테이블 삭제 후 재생성
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

### 2. Wrangler CLI로 실행 (Cloudflare API 토큰 필요)

```bash
# Cloudflare API 토큰 설정
export CLOUDFLARE_API_TOKEN=your_api_token_here

# 마이그레이션 실행
npx wrangler d1 migrations apply gumi-coop-db --remote
```

## 새로운 기능

### 검색 기능
- 자료명이나 내용으로 검색 가능
- 실시간 검색 결과 개수 표시

### 카테고리 필터링
- 조합 소개서
- 신청서 양식
- 기술 자료
- 교육 자료
- 사업 안내

### 자료 정보 표시
- 파일 형식 (PDF, DOCX, PPTX 등)
- 파일 크기
- 다운로드 횟수
- 등록일

## 자료 추가 방법

관리자 대시보드에서 자료를 추가하려면 별도의 관리 페이지가 필요합니다. 
현재는 Cloudflare D1 콘솔에서 직접 SQL로 추가할 수 있습니다:

```sql
INSERT INTO resources (category, title, description, file_type, file_url, file_size, download_count)
VALUES 
('기술 자료', '새로운 자료 제목', '자료 설명', 'PDF', 'https://example.com/file.pdf', '1.5 MB', 0);
```

## 문제 해결

### 자료가 표시되지 않을 경우
1. 브라우저 캐시 삭제
2. Cloudflare Pages 재배포 확인
3. 데이터베이스 마이그레이션 실행 여부 확인

### 검색이 작동하지 않을 경우
- 검색어를 2자 이상 입력했는지 확인
- 한글과 영문 모두 지원됨

## 향후 개선 사항

- [ ] 관리자 대시보드에서 자료 업로드 기능
- [ ] 실제 파일 저장소 연동 (Cloudflare R2)
- [ ] 다운로드 카운트 자동 증가
- [ ] 파일 미리보기 기능
- [ ] 자료 수정/삭제 기능
