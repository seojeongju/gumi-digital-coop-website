# 🚀 gdamic.kr 도메인 연동 - 초간단 가이드

**도메인**: gdamic.kr  
**등록 업체**: 후이즈 (Whois)  
**시작 시간**: 지금 바로!

---

## ⚡ 빠른 시작 (3단계만!)

### 📍 Step 1: Cloudflare Pages URL 확인 (2분)

#### 방법 1: GitHub Actions에서 확인 (가장 쉬움!)

1. **GitHub 저장소 접속**
   ```
   https://github.com/seojeongju/gumi-digital-coop-website
   ```

2. **Actions 탭 클릭**
   - 상단 메뉴에서 "Actions" 클릭

3. **최근 배포 로그 확인**
   - 가장 최근 workflow 클릭
   - 배포 로그에서 "Published to:" 찾기
   - 예시: `Published to: https://gumi-digital-coop-website.pages.dev`

4. **URL 기록**
   ```
   📝 확인된 URL: __________________.pages.dev
   ```

#### 방법 2: Cloudflare Dashboard에서 확인

1. **Cloudflare 대시보드**
   ```
   https://dash.cloudflare.com
   ```

2. **로그인**
   - 이메일: [귀하의 Cloudflare 계정]
   - 비밀번호: [입력]

3. **Workers & Pages 클릭**
   - 왼쪽 사이드바 메뉴

4. **프로젝트 찾기**
   - 프로젝트 목록에서 `gumi` 관련 프로젝트 찾기
   - 클릭하면 상단에 URL 표시됨

---

## 📝 Step 2: 후이즈 DNS 설정 (5분)

### 2-1. 후이즈 로그인

```
https://www.whois.co.kr
→ 우측 상단 "로그인"
```

### 2-2. DNS 관리 페이지 접속

```
1. MY 서비스 (또는 도메인 관리)
2. 도메인 리스트
3. gdamic.kr 찾기
4. "DNS 관리" 또는 "DNS 설정" 버튼 클릭
```

### 2-3. CNAME 레코드 추가 (중요!)

#### 첫 번째 레코드: 루트 도메인

```
┌───────────────────────────────────────────────┐
│ "레코드 추가" 또는 "새 레코드" 버튼 클릭        │
├───────────────────────────────────────────────┤
│ 레코드 타입: CNAME                             │
│ 호스트/이름: @                                 │
│ 값/대상: [Step 1에서 확인한 URL]               │
│          예: gumi-digital-coop-website.pages.dev │
│ TTL: 3600                                      │
│                                                │
│ [저장] 클릭                                     │
└───────────────────────────────────────────────┘
```

#### 두 번째 레코드: www 서브도메인

```
┌───────────────────────────────────────────────┐
│ 다시 "레코드 추가" 버튼 클릭                    │
├───────────────────────────────────────────────┤
│ 레코드 타입: CNAME                             │
│ 호스트/이름: www                               │
│ 값/대상: [Step 1에서 확인한 URL]               │
│          예: gumi-digital-coop-website.pages.dev │
│ TTL: 3600                                      │
│                                                │
│ [저장] 클릭                                     │
└───────────────────────────────────────────────┘
```

### 2-4. 설정 적용

```
→ "적용" 또는 "변경사항 저장" 버튼 클릭
```

### ✅ 최종 확인

DNS 레코드 목록에 다음 2개가 표시되어야 합니다:

```
타입    호스트    값/대상
CNAME   @         gumi-digital-coop-website.pages.dev
CNAME   www       gumi-digital-coop-website.pages.dev
```

---

## 🚨 문제 발생 시: 루트 도메인 CNAME 오류

### 증상
"루트 도메인(@)에는 CNAME을 설정할 수 없습니다" 오류

### 해결 방법 1: ANAME 레코드 사용 (권장)

후이즈에서 ANAME이나 ALIAS 레코드 타입이 있는지 확인:

```
레코드 타입: ANAME (또는 ALIAS)
호스트: @
값: gumi-digital-coop-website.pages.dev
```

### 해결 방법 2: URL 포워딩 사용

1. **www만 CNAME 설정**
   ```
   타입: CNAME
   호스트: www
   값: gumi-digital-coop-website.pages.dev
   ```

2. **루트 도메인 포워딩 설정**
   ```
   후이즈 도메인 관리 페이지에서:
   → "URL 포워딩" 또는 "도메인 포워딩" 메뉴
   → gdamic.kr → www.gdamic.kr로 리다이렉트 설정
   ```

---

## ⏱️ Step 3: DNS 전파 확인 (30분~2시간)

### 3-1. DNS 전파 상태 확인

가장 쉬운 방법: **온라인 도구 사용**

```
1. https://dnschecker.org 접속

2. 도메인 입력: gdamic.kr

3. 레코드 타입 선택: CNAME

4. "Search" 버튼 클릭

5. 결과 확인:
   → 전 세계 여러 지역에서 조회
   → 대부분 지역에서 "gumi-digital-coop-website.pages.dev" 표시
   → ✅ 전파 완료!
```

### 3-2. 간단 확인 (Windows)

```
명령 프롬프트(CMD) 열기:
→ nslookup gdamic.kr
→ nslookup www.gdamic.kr

결과에 gumi-digital-coop-website.pages.dev가 나오면 완료!
```

---

## 🔗 Cloudflare Pages에 도메인 추가

DNS 전파가 완료되면 Cloudflare에 도메인을 추가합니다.

### 4-1. Cloudflare 대시보드

```
1. https://dash.cloudflare.com 접속
2. 로그인
3. Workers & Pages 클릭
4. gumi-digital-coop-website 프로젝트 클릭
```

### 4-2. Custom domains 추가

```
1. 상단 탭에서 "Custom domains" 클릭

2. "Set up a custom domain" 버튼 클릭

3. 도메인 입력: gdamic.kr
   → "Continue" 클릭

4. DNS 확인 대기 (자동)
   → 상태가 "Active"로 변경되면 성공!

5. 다시 "Add a custom domain" 클릭

6. 도메인 입력: www.gdamic.kr
   → "Continue" 클릭

7. 상태가 "Active"로 변경될 때까지 대기
```

### 4-3. 완료 확인

Custom domains 페이지에서:

```
✅ gdamic.kr - Active (HTTPS enabled)
✅ www.gdamic.kr - Active (HTTPS enabled)
```

---

## 🔒 HTTPS 자동 활성화

Cloudflare가 자동으로 처리합니다:

- ✅ 무료 SSL 인증서 발급
- ✅ HTTPS 자동 활성화
- ✅ HTTP → HTTPS 자동 리다이렉트

### 확인 방법

브라우저에서 접속:

```
http://gdamic.kr → https://gdamic.kr 자동 리다이렉트
https://gdamic.kr → 🔒 녹색 자물쇠 표시
```

---

## 🎉 완료! 웹사이트 테스트

### 5-1. 도메인 접속 테스트

브라우저에서:

```
✅ https://gdamic.kr
✅ https://www.gdamic.kr
```

### 5-2. 페이지 확인

```
[ ] 홈페이지 (/)
[ ] 소개 (/about)
[ ] 서비스 (/services)
[ ] 자료실 (/resources)
[ ] 견적 요청 (/quote)
[ ] 문의하기 (/support)
[ ] 소식 (/news)
```

---

## 🗄️ 중요! D1 데이터베이스 마이그레이션

도메인 연동은 완료되었지만, **양식이 작동하려면** 데이터베이스를 설정해야 합니다!

### 언제 실행하나요?
- 도메인 연동 후 언제든지
- 견적 요청이나 문의하기 양식을 사용하기 전에

### 어떻게 실행하나요?

#### 방법 1: Cloudflare Dashboard (권장)

```
1. https://dash.cloudflare.com
2. Workers & Pages → D1 Databases
3. gumi-coop-db 선택
4. Console 탭 클릭
```

#### 5개 마이그레이션 파일 순서대로 실행:

**각 파일을 열어서 내용 전체를 복사 → D1 Console에 붙여넣기 → Execute**

```
1️⃣ migrations/0001_create_notices_table.sql
   → 파일 열기 → 전체 선택 (Ctrl+A)
   → 복사 (Ctrl+C)
   → D1 Console에 붙여넣기 (Ctrl+V)
   → "Execute" 버튼 클릭

2️⃣ migrations/0002_add_notices_indexes.sql
   → 동일한 방법으로 실행

3️⃣ migrations/0003_create_resources_table.sql
   → 동일한 방법으로 실행

4️⃣ migrations/0004_create_quote_requests.sql
   → 동일한 방법으로 실행

5️⃣ migrations/0005_create_contact_messages.sql
   → 동일한 방법으로 실행
```

#### 확인:

D1 Console에서 실행:

```sql
SELECT name FROM sqlite_master WHERE type='table';
```

**기대 결과:**
```
notices
resources
quote_requests
contact_messages
```

4개 테이블이 모두 표시되면 성공! ✅

---

## 📋 전체 체크리스트

```
[ ] 1. Cloudflare Pages URL 확인
[ ] 2. 후이즈 로그인
[ ] 3. DNS 관리 페이지 접속
[ ] 4. CNAME 레코드 추가 (@ → pages.dev)
[ ] 5. CNAME 레코드 추가 (www → pages.dev)
[ ] 6. DNS 설정 저장 및 적용
[ ] 7. DNS 전파 대기 (30분~2시간)
[ ] 8. DNS 전파 확인 (dnschecker.org)
[ ] 9. Cloudflare Pages에 gdamic.kr 추가
[ ] 10. Cloudflare Pages에 www.gdamic.kr 추가
[ ] 11. 도메인 상태 "Active" 확인
[ ] 12. https://gdamic.kr 접속 테스트
[ ] 13. HTTPS (녹색 자물쇠) 확인
[ ] 14. D1 마이그레이션 5개 실행
[ ] 15. 테이블 4개 생성 확인
[ ] 16. 견적 요청 양식 테스트
[ ] 17. 문의하기 양식 테스트
[ ] 18. 관리자 로그인 테스트
[ ] 19. 전체 기능 확인
[ ] 20. 완료! 🎉
```

---

## 🆘 도움이 필요하면?

### 각 단계에서 막히면:

1. **Cloudflare Pages URL을 못 찾겠어요**
   - GitHub Actions 로그 확인
   - 또는 프로젝트 이름이 "gumi-digital-coop-website"일 가능성 높음

2. **후이즈에서 @ 호스트에 CNAME을 못 넣겠어요**
   - ANAME 타입 사용
   - 또는 www만 설정하고 URL 포워딩 사용

3. **DNS가 전파되지 않아요**
   - 30분~2시간 정도 더 기다리기
   - 최대 24시간까지 소요될 수 있음

4. **Cloudflare에서 도메인이 Active 안 돼요**
   - DNS 전파 확인 (dnschecker.org)
   - DNS 레코드가 올바른지 재확인

5. **양식 제출이 안 돼요**
   - D1 마이그레이션 실행했는지 확인
   - D1 Console에서 테이블 존재 확인

---

## 📞 연락하기

문제가 발생하거나 도움이 필요하면:
- 어느 단계에서 막혔는지
- 오류 메시지가 무엇인지
- 스크린샷 (가능하면)

알려주시면 바로 도와드리겠습니다! 🚀

---

## 🎊 성공 후 모습

```
✅ https://gdamic.kr
   → 구미 디지털협동조합 웹사이트 표시
   → 🔒 HTTPS 보안 연결
   → 모든 페이지 정상 작동

✅ 견적 요청 양식
   → 고객이 견적 요청 가능
   → 관리자가 관리 페이지에서 확인

✅ 문의하기 양식
   → 고객이 문의 접수 가능
   → 관리자가 상태 변경 및 답변

✅ 관리자 페이지
   → https://gdamic.kr/admin/login
   → 모든 관리 기능 작동

✅ 프로페셔널한 웹사이트 완성! 🎉
```

---

**작성**: 2025-10-24  
**도메인**: gdamic.kr  
**예상 소요 시간**: 1~3시간 (DNS 전파 포함)

**지금 시작하세요!** 🚀
