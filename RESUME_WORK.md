# 🚀 작업 재개 가이드

**다음 세션에서 이 문서를 먼저 읽어주세요!**

---

## 📍 현재 위치

프로젝트는 `/home/user/webapp` 디렉토리에 있습니다.

```bash
cd /home/user/webapp
```

---

## ✅ 마지막 작업 완료 상태 (2025-10-23)

### 최신 커밋
```
6db8d8c - feat: Add detailed pages for 5 industry sectors
4624a2f - feat: Restructure navigation menu and add quote request page
6db178d - fix: Update SME Cooperative English name to KBIZ
```

### 완료된 주요 기능
1. ✅ **고객지원 통합 메뉴** - 네비게이션 재구성
2. ✅ **견적 요청 페이지** - `/support/quote` 신규 생성
3. ✅ **5개 산업 상세 페이지** - IoT, 3D프린팅, AI, 로봇, 빅데이터

모든 변경사항은 커밋되고 원격 저장소에 푸시되었습니다.

---

## 🔄 작업 시작 체크리스트

### 1단계: 환경 확인
```bash
# 작업 디렉토리로 이동
cd /home/user/webapp

# 현재 브랜치 확인
git branch

# Git 상태 확인
git status

# 최근 커밋 확인
git log --oneline -5
```

### 2단계: 최신 코드 동기화
```bash
# 원격 저장소에서 최신 코드 가져오기
git fetch origin

# 로컬 브랜치 업데이트
git pull origin main
```

### 3단계: 의존성 확인 (필요시)
```bash
# node_modules가 없거나 업데이트가 필요한 경우
npm install
```

### 4단계: 프로젝트 상태 문서 읽기
```bash
# 프로젝트 전체 현황 확인
cat PROJECT_STATUS.md

# 또는 에디터로 열기
```

---

## 📂 주요 파일 위치

### 코어 파일
- **메인 애플리케이션**: `src/index.tsx` (4500+ 라인)
- **Cloudflare 설정**: `wrangler.jsonc`
- **패키지 설정**: `package.json`
- **Vite 설정**: `vite.config.ts`

### 문서 파일
- **프로젝트 상태**: `PROJECT_STATUS.md`
- **작업 재개 가이드**: `RESUME_WORK.md` (이 문서)

---

## 🗺️ 사이트 맵 (Quick Reference)

### 고객지원 메뉴
- `/news` - 조합소식
- `/support/faq` - 자주 묻는 질문
- `/support` - 문의하기
- `/support/quote` - 견적 요청 ⭐ 신규
- `/resources` - 자료실

### 산업 분야 상세
- `/industry/iot` - IoT ⭐ 신규
- `/industry/3d-printing` - 3D 프린팅 ⭐ 신규
- `/industry/ai` - AI ⭐ 신규
- `/industry/robotics` - 로봇 ⭐ 신규
- `/industry/big-data` - 빅데이터 ⭐ 신규

---

## 🛠️ 자주 사용하는 명령어

### 개발
```bash
# 프로덕션 빌드
npm run build

# 개발 서버 실행 (로컬)
npm run dev

# 타입 체크
npm run typecheck
```

### Git 작업
```bash
# 변경사항 확인
git status
git diff

# 스테이징
git add .

# 커밋
git commit -m "작업 내용"

# 푸시 (자동 배포 트리거)
git push origin main

# 커밋 히스토리
git log --oneline -10
```

### 파일 확인
```bash
# 메인 파일 라인 수 확인
wc -l src/index.tsx

# 프로젝트 구조 보기
tree -L 2 -I 'node_modules|dist'

# 백업 파일 확인
ls -lh /home/user/gumi-coop-backup-*.tar.gz
```

---

## 🎨 코드 스타일 가이드

### 컬러 변수 (Tailwind)
```
navy     - #1a365d (메인 브랜드)
teal     - #0d9488 (액센트)
purple   - #9333ea (3D 프린팅)
orange   - #f97316 (로봇)
cyan     - #06b6d4 (IoT)
```

### 아이콘 클래스
```html
<i class="fas fa-[icon-name]"></i>
```

### 반응형 브레이크포인트
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 📊 데이터베이스 (Cloudflare D1)

### 바인딩
```typescript
const { DB } = c.env
```

### 주요 테이블
- `notices` - 공지사항/뉴스
- `members` - 회원사 정보

### 쿼리 예시
```typescript
const result = await DB.prepare(`
  SELECT * FROM notices 
  WHERE category = ? 
  ORDER BY created_at DESC
`).bind('공지사항').all()
```

---

## 🐛 문제 해결

### 빌드 에러 발생시
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 클리어 후 빌드
npm run build
```

### Git 충돌 발생시
```bash
# 원격 변경사항 확인
git fetch origin
git log origin/main

# 병합
git merge origin/main

# 충돌 해결 후
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### 배포가 안될 때
1. GitHub 저장소 확인
2. Cloudflare Pages 대시보드 확인
3. 빌드 로그 확인
4. wrangler.jsonc 설정 확인

---

## 💡 작업 팁

### 새로운 페이지 추가시
1. `src/index.tsx`에 새 라우트 추가
2. 일관된 디자인 패턴 유지 (히어로, 섹션, CTA)
3. 네비게이션 메뉴 업데이트 (필요시)
4. 빌드 & 테스트
5. 커밋 & 푸시

### 컴포넌트 재사용
- `Header` 컴포넌트 사용
- `Footer` 컴포넌트 사용
- 일관된 버튼 스타일 유지
- FontAwesome 아이콘 활용

### 성능 고려사항
- 이미지는 CDN URL 사용
- 그라디언트 오버레이로 가독성 확보
- 모바일 반응형 우선 고려

---

## 📞 긴급 연락처

**조합 담당자**
- 전화: 054-478-8011
- 이메일: info@gumidigital.or.kr

**기술 지원**
- Git 저장소: https://github.com/seojeongju/gumi-digital-coop-website.git
- Cloudflare Pages 대시보드

---

## 🎯 다음 작업 제안 사항

우선순위가 높은 개선 항목:

1. **데이터 연동**
   - D1 데이터베이스에 실제 뉴스 데이터 추가
   - 회원사 정보 데이터베이스 연동

2. **기능 개선**
   - 견적 요청 폼 실제 제출 기능
   - 파일 업로드 구현
   - 이메일 발송 연동

3. **콘텐츠 추가**
   - 성공 사례 페이지
   - 갤러리 페이지
   - 블로그/기술 자료

4. **SEO & 성능**
   - 메타 태그 최적화
   - 이미지 최적화
   - 로딩 속도 개선

---

## ✅ 작업 전 체크리스트

- [ ] `cd /home/user/webapp` 디렉토리 이동
- [ ] `git status` 상태 확인
- [ ] `git pull origin main` 최신 코드 동기화
- [ ] `PROJECT_STATUS.md` 읽고 현황 파악
- [ ] 이전 커밋 로그 확인 (`git log --oneline -10`)
- [ ] 작업 계획 수립

---

## 🎊 준비 완료!

모든 준비가 끝났습니다. 이제 다음 세션에서 작업을 이어갈 수 있습니다!

**핵심 포인트**:
1. ✅ 모든 코드는 커밋되고 푸시됨
2. ✅ 백업 파일 생성됨
3. ✅ 프로젝트 문서 업데이트됨
4. ✅ Cloudflare 자동 배포 완료

**Happy Coding! 🚀**
