# D1 Database 바인딩 제거 가이드

## 🔍 문제 상황

**에러 메시지:**
```
Error: Failed to publish your Function. 
Got error: Error 8000022: Invalid database UUID (local-development-only). 
Check your database UUID and try again.
```

**원인:**
- Cloudflare Pages 프로젝트 Settings에 D1 데이터베이스 바인딩이 설정되어 있음
- 하지만 실제 D1 데이터베이스가 생성되지 않았거나 UUID가 잘못됨
- 현재 프로젝트는 D1을 사용하지 않으므로 바인딩 제거가 필요

## ✅ 해결 방법 1: Cloudflare Dashboard (권장)

### 단계 1: Cloudflare Dashboard 접속

1. 브라우저에서 접속:
   ```
   https://dash.cloudflare.com/
   ```

2. 로그인 (이미 로그인되어 있을 수 있음)

### 단계 2: Workers & Pages 이동

1. 좌측 메뉴에서 **Workers & Pages** 클릭
2. 프로젝트 목록에서 **gumi-digital-coop-website** 찾기
3. 프로젝트 이름 클릭하여 들어가기

### 단계 3: Settings 탭 이동

1. 상단 탭 메뉴에서 **Settings** 클릭
2. 페이지를 아래로 스크롤

### 단계 4: Functions 섹션 찾기

1. **Functions** 섹션 찾기 (보통 페이지 중간쯤)
2. 다음 항목들이 표시됨:
   - **Environment variables**
   - **KV namespace bindings**
   - **D1 database bindings** ⬅️ 이것!
   - **R2 bucket bindings**
   - 등등...

### 단계 5: D1 바인딩 제거

1. **D1 database bindings** 섹션 클릭하여 확장
2. 바인딩이 있는지 확인:
   ```
   Variable name: DB (또는 다른 이름)
   D1 database: gumi-coop-db (또는 local-development-only)
   Environment: Production (또는 Preview)
   ```
3. 바인딩 오른쪽의 **Remove** 버튼 또는 **X** 버튼 클릭
4. 확인 팝업이 나오면 **Remove** 또는 **Confirm** 클릭

### 단계 6: 변경사항 저장

1. 페이지 맨 아래 또는 맨 위의 **Save** 버튼 클릭
2. "Settings saved successfully" 메시지 확인

### 단계 7: 재배포

**옵션 A: 기존 배포 재시도**
1. **Deployments** 탭으로 이동
2. 맨 위의 실패한 배포 항목 클릭
3. **Retry deployment** 버튼 클릭
4. 배포 진행 상황 모니터링

**옵션 B: 새 배포 트리거 (GitHub 연동)**
1. GitHub에서 빈 커밋 푸시:
   ```bash
   cd /home/user/webapp
   git commit --allow-empty -m "Trigger deployment after D1 binding removal"
   git push origin main
   ```
2. Cloudflare Pages가 자동으로 새 배포 시작

### 단계 8: 배포 성공 확인

1. **Deployments** 탭에서 배포 상태 확인
2. 상태가 **Success**로 변경되면 성공!
3. **Visit site** 버튼 클릭하여 웹사이트 확인
4. 프로덕션 URL 복사: `https://gumi-digital-coop-website.pages.dev`

---

## ✅ 해결 방법 2: Cloudflare API (CLI)

Dashboard 접근이 어려운 경우:

### 1. Wrangler 로그인

```bash
cd /home/user/webapp
npx wrangler login
```

브라우저가 열리면서 인증 요청이 나타납니다.

### 2. 직접 배포

```bash
cd /home/user/webapp
npx wrangler pages deploy dist --project-name gumi-digital-coop-website
```

**참고:** 이 방법은 D1 바인딩이 설정되어 있어도 로컬 설정(wrangler.jsonc)을 우선하므로 작동할 수 있습니다.

---

## 🔍 확인 체크리스트

배포 성공 후 다음 항목들을 확인하세요:

### 웹사이트 접속
- [ ] 프로덕션 URL 접속 가능: `https://gumi-digital-coop-website.pages.dev`
- [ ] 홈페이지(/) 정상 표시
- [ ] 조합 소개(/about) 정상 표시
- [ ] 조합장 인사말(/about/greeting) 정상 표시

### 페이지 요소 확인
- [ ] 헤더 네비게이션 작동
- [ ] 드롭다운 메뉴 작동 (조합 소개)
- [ ] INDUSTRY 섹션 5개 카드 표시
- [ ] 주요 사업 분야 4개 카드 표시
- [ ] Footer 정보 표시
- [ ] 로고 이미지 표시
- [ ] 반응형 디자인 작동 (모바일/태블릿)

### Cloudflare 설정 확인
- [ ] Settings > Functions > D1 database bindings: 비어있음
- [ ] Deployment 상태: Success
- [ ] Build log 에러 없음

---

## 🚨 트러블슈팅

### Q1: D1 바인딩 섹션이 보이지 않아요

**답변:**
- Functions 섹션을 확장해야 보입니다
- 또는 바인딩이 이미 제거되어 있을 수 있습니다
- "View all bindings" 링크를 클릭해보세요

### Q2: 바인딩을 제거했는데도 같은 에러가 나요

**답변:**
1. 브라우저 캐시 삭제 후 재시도
2. Production과 Preview 환경 모두 확인
3. 페이지를 새로고침하여 설정이 저장되었는지 확인
4. CLI로 직접 배포 시도 (해결 방법 2)

### Q3: Save 버튼이 보이지 않아요

**답변:**
- 변경사항이 없으면 Save 버튼이 비활성화됩니다
- 바인딩을 제거한 후에 Save 버튼이 활성화됩니다
- 페이지 맨 위 또는 맨 아래에 있을 수 있습니다

### Q4: 재배포 후에도 같은 에러가 발생해요

**답변:**
1. 빌드 캐시 삭제:
   ```bash
   cd /home/user/webapp
   rm -rf dist .wrangler
   npm run build
   git add dist
   git commit -m "Rebuild without D1"
   git push origin main
   ```

2. Cloudflare Pages 설정 다시 확인:
   - Settings > Builds & deployments
   - Build cache 삭제 옵션 확인

---

## 📞 추가 지원

문제가 계속되면 다음 정보를 제공해주세요:

1. **Cloudflare Pages Settings 스크린샷**
   - Settings > Functions 전체 화면

2. **배포 로그 스크린샷**
   - Deployments > 실패한 배포 > View details
   - Build log 전체 내용

3. **에러 메시지**
   - 정확한 에러 메시지 전체 복사

---

## 📚 참고 문서

- [Cloudflare Pages - D1 Bindings](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases)
- [Cloudflare D1 - Database Bindings](https://developers.cloudflare.com/d1/get-started/)
- [Wrangler CLI - Pages Deploy](https://developers.cloudflare.com/workers/wrangler/commands/#pages)

---

**작성일**: 2025-10-23
**프로젝트**: 구미디지털적층산업사업협동조합 웹사이트
**상태**: D1 바인딩 제거 대기 중
