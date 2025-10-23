# 구미디지털적층산업사업협동조합 홈페이지

## 📋 프로젝트 개요

구미디지털적층산업사업협동조합의 공식 웹사이트입니다. 3D 프린팅 및 적층제조 기술을 중심으로 조합원 간 협력과 지역 산업 혁신을 위한 정보 공유 플랫폼입니다.

## 🌟 주요 기능

### 완료된 기능
- ✅ 반응형 웹 디자인 (모바일/태블릿/데스크톱)
- ✅ 메인 페이지 (히어로 섹션, 핵심 가치, 서비스 소개)
- ✅ 공통 레이아웃 (헤더, 푸터, 네비게이션)
- ✅ 데이터베이스 스키마 (D1 SQLite)
- ✅ API 엔드포인트 (/api/notices, /api/members)
- ✅ 최신 소식 표시 (공지사항 3개)
- ✅ 조합원 소개 섹션
- ✅ 통계 카운터

### 진행 중인 기능
- 🚧 조합 소개 페이지
- 🚧 서비스/제품 상세 페이지
- 🚧 조합원 정보 페이지
- 🚧 소식/공지사항 상세 페이지
- 🚧 고객지원 페이지 (FAQ, 문의하기)

### 예정된 기능
- ⏳ 자료실 페이지
- ⏳ 미디어 갤러리
- ⏳ 관리자 대시보드
- ⏳ 조합원 가입 신청 시스템
- ⏳ 견적 요청 시스템

## 🛠️ 기술 스택

### Frontend
- **Hono** - Fast, lightweight web framework
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **FontAwesome** - Icon library

### Backend
- **Cloudflare Workers** - Edge runtime
- **Cloudflare D1** - SQLite database
- **Hono** - API routes

### Development
- **Vite** - Build tool
- **Wrangler** - Cloudflare CLI
- **PM2** - Process manager (sandbox only)

## 📂 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx           # 메인 앱 엔트리포인트
│   └── renderer.tsx        # HTML 렌더러
├── public/
│   └── static/
│       ├── css/
│       │   └── styles.css  # 커스텀 CSS
│       ├── js/
│       │   └── app.js      # 클라이언트 JavaScript
│       └── images/
│           └── logo.png    # 조합 로고
├── migrations/
│   ├── 0001_initial_schema.sql  # DB 스키마
│   └── 0002_seed_data.sql       # 샘플 데이터
├── wrangler.jsonc          # Cloudflare 설정
├── vite.config.ts          # Vite 설정
├── ecosystem.config.cjs    # PM2 설정 (개발용)
├── package.json
└── tsconfig.json
```

## 🚀 시작하기

### 개발 환경 구축

1. **의존성 설치**
```bash
npm install
```

2. **D1 데이터베이스 마이그레이션 (로컬)**
```bash
npm run db:migrate:local
```

3. **프로젝트 빌드**
```bash
npm run build
```

4. **개발 서버 시작 (샌드박스)**
```bash
# PM2로 시작
pm2 start ecosystem.config.cjs

# 또는 직접 실행
npm run dev:d1
```

5. **서비스 확인**
```bash
curl http://localhost:3000
```

### 주요 명령어

```bash
# 빌드
npm run build

# 로컬 개발 (샌드박스)
npm run dev:sandbox          # D1 없이
npm run dev:d1               # D1 포함

# 데이터베이스 관리
npm run db:migrate:local     # 로컬 마이그레이션
npm run db:migrate:prod      # 프로덕션 마이그레이션
npm run db:console:local     # 로컬 DB 콘솔
npm run db:console:prod      # 프로덕션 DB 콘솔

# 배포
npm run deploy               # 기본 배포
npm run deploy:prod          # 프로덕션 배포

# 유틸리티
npm run clean-port           # 포트 3000 정리
npm test                     # 서비스 테스트
```

## 🌐 URL 구조

### 메인 페이지
- `/` - 홈페이지

### 조합 소개
- `/about` - 조합 개요
- `/about/greeting` - 이사장 인사말
- `/about/history` - 연혁
- `/about/organization` - 조직 및 운영

### 서비스/제품
- `/services` - 서비스 목록
- `/services/printing` - 3D 프린팅
- `/services/modeling` - 설계 및 모델링
- `/services/finishing` - 후가공 서비스

### 기술 정보
- `/technology` - 기술 정보
- `/technology/patents` - 특허 및 인증

### 조합원 정보
- `/members` - 조합원 목록
- `/members/:id` - 조합원 상세
- `/members/join` - 조합원 가입

### 소식/공지
- `/news` - 소식 목록
- `/news/:id` - 소식 상세

### 고객지원
- `/support` - 고객지원 메인
- `/support/faq` - 자주 묻는 질문
- `/support/contact` - 문의하기
- `/support/quote` - 견적 요청

### API 엔드포인트
- `GET /api/notices` - 공지사항 목록
- `GET /api/notices?category=공지사항` - 카테고리별 필터
- `GET /api/members` - 조합원 목록
- `GET /api/members?category=제조` - 카테고리별 필터

## 📊 데이터베이스 스키마

### 테이블 목록
1. **notices** - 공지사항
2. **members** - 조합원 정보
3. **faqs** - 자주 묻는 질문
4. **inquiries** - 문의 내역
5. **resources** - 자료실
6. **events** - 행사 일정

## 🎨 디자인 시스템

### 컬러 팔레트
- **Navy**: #1B3A7D (메인)
- **Purple**: #7B3FF2 (액센트)
- **Teal**: #00A9CE (보조)
- **Coral**: #FF6B6B (CTA)

### 타이포그래피
- 한글: Noto Sans KR
- 영문: Roboto

## 📱 반응형 브레이크포인트
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 환경 변수

개발 환경에서는 `.dev.vars` 파일 사용:
```
# .dev.vars
# 필요시 API 키 등 추가
```

## 🚀 배포

### Cloudflare Pages 배포

1. **빌드**
```bash
npm run build
```

2. **배포**
```bash
npm run deploy:prod
```

3. **D1 마이그레이션 (프로덕션)**
```bash
npm run db:migrate:prod
```

## 📈 개발 현황

- **프로젝트 시작**: 2025년 1월
- **현재 버전**: 1.0.0-beta
- **완성도**: 약 40%

### Phase 1 ✅ (완료)
- [x] 개발 환경 구축
- [x] 데이터베이스 설계
- [x] 공통 레이아웃
- [x] 메인 페이지

### Phase 2 🚧 (진행 중)
- [ ] 서브 페이지 개발
- [ ] API 통합
- [ ] 폼 기능

### Phase 3 ⏳ (예정)
- [ ] 관리자 기능
- [ ] 테스트
- [ ] 배포

## 📞 연락처

- **주소**: 경상북도 구미시 산호대로 253
- **전화**: 054-123-4567
- **이메일**: info@gumidigital.co.kr
- **웹사이트**: (배포 후 업데이트 예정)

## 📄 라이선스

© 2025 구미디지털적층산업사업협동조합. All rights reserved.

---

**마지막 업데이트**: 2025년 1월
**개발**: Hono + Cloudflare Pages
