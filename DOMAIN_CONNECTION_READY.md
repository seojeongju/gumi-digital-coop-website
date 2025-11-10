# 🌐 도메인 연동 준비 완료!

**작성 일시**: 2025-10-24  
**프로젝트 위치**: `/home/user/webapp`  
**상태**: ✅ 도메인 연동 준비 완료

---

## 📊 현재 프로젝트 상태

### ✅ 완료된 작업들

1. **프로젝트 빌드 및 배포**
   - GitHub Repository: https://github.com/seojeongju/gumi-digital-coop-website
   - Cloudflare Pages: 자동 배포 활성화
   - 최신 빌드: ✅ 성공 (357.89 kB)

2. **데이터베이스 구성**
   - D1 Database Name: `gumi-coop-db`
   - Database ID: `5f9b2685-5cc9-4f34-b4e7-ba108ce4e213`
   - 마이그레이션 파일: 5개 준비 완료

3. **R2 스토리지 구성**
   - R2 Bucket Name: `gumi-coop-resources`
   - 리소스 파일 업로드/다운로드 준비 완료

4. **모든 기능 구현 완료**
   - ✅ 공지사항 시스템
   - ✅ 자료실 시스템 (R2 연동)
   - ✅ 견적 요청 시스템
   - ✅ 문의하기 시스템 (신규)
   - ✅ 관리자 대시보드
   - ✅ 모든 관리자 페이지

---

## 🎯 도메인 연동 단계별 가이드

### 📋 사전 체크리스트

현재 상태를 확인해주세요:

- [x] 프로젝트 빌드 성공
- [x] GitHub에 모든 코드 푸시 완료
- [x] Cloudflare Pages 자동 배포 설정 완료
- [ ] **Cloudflare Pages 프로젝트 이름 확인 필요**
- [ ] **현재 .pages.dev URL 확인 필요**
- [ ] **연동할 도메인 이름 확인** (예: gumidlc.co.kr)
- [ ] **도메인 등록 업체 접속 정보 확인** (예: 가비아, 후이즈, 고대디 등)

---

## 🔍 Step 1: Cloudflare Pages 프로젝트 확인

### 필요한 정보 확인

아래 정보를 확인하여 알려주세요:

1. **Cloudflare 대시보드 접속**
   - URL: https://dash.cloudflare.com
   - 계정으로 로그인

2. **Pages 프로젝트 찾기**
   - 왼쪽 메뉴: `Workers & Pages` 클릭
   - 프로젝트 목록에서 `gumi-digital-coop-website` 또는 유사한 이름 찾기

3. **확인할 정보들**:
   ```
   📝 확인 필요:
   - Cloudflare Pages 프로젝트 이름: _________________
   - 현재 .pages.dev URL: _________________.pages.dev
   - 최신 배포 상태: Production / Preview
   - 배포 성공 여부: Success / Failed
   ```

### 명령어로 확인하기 (선택사항)

Cloudflare에 로그인되어 있다면:

```bash
cd /home/user/webapp

# Cloudflare 로그인 (브라우저 열림)
wrangler login

# Pages 프로젝트 목록 보기
wrangler pages project list

# 특정 프로젝트 정보 보기
wrangler pages project list | grep gumi
```

---

## 🌐 Step 2: 도메인 정보 준비

### 연동할 도메인 정보

아래 정보를 준비해주세요:

```
📝 도메인 정보:
1. 도메인 이름: ___________________ (예: gumidlc.co.kr)
2. 도메인 등록 업체: ___________________ (예: 가비아, 후이즈, GoDaddy)
3. 도메인 관리 페이지 로그인 가능 여부: [ ] 예 [ ] 아니오
4. DNS 설정 변경 권한 여부: [ ] 예 [ ] 아니오
```

### 도메인 등록 업체 접속

도메인 DNS 설정을 변경하려면 아래 정보가 필요합니다:

- **등록 업체 웹사이트**: (예: www.gabia.com)
- **로그인 아이디**: _________________
- **로그인 비밀번호**: _________________
- **DNS 설정 메뉴 위치**: 보통 "도메인 관리" → "DNS 관리" 또는 "네임서버 설정"

---

## 🔧 Step 3: Cloudflare Pages에 도메인 추가

### 3-1. Cloudflare 대시보드에서 설정

1. **Cloudflare Pages 프로젝트 열기**
   ```
   https://dash.cloudflare.com
   → Workers & Pages
   → [프로젝트 이름] 클릭
   ```

2. **Custom domains 탭 이동**
   ```
   프로젝트 페이지 상단 탭:
   - Deployments
   - Settings
   - Custom domains ← 여기 클릭
   ```

3. **도메인 추가하기**
   ```
   "Set up a custom domain" 버튼 클릭
   → 도메인 이름 입력 (예: gumidlc.co.kr)
   → "Continue" 클릭
   ```

4. **DNS 레코드 정보 확인**
   
   Cloudflare가 표시하는 DNS 레코드 정보를 메모하세요:
   
   ```
   📝 메모할 DNS 정보:
   
   Type: CNAME
   Name: @ (또는 루트 도메인)
   Target: ______________.pages.dev
   
   또는
   
   Type: CNAME  
   Name: www
   Target: ______________.pages.dev
   ```

---

## 🔌 Step 4: 도메인 DNS 설정 변경

### 4-1. 도메인 등록 업체에서 DNS 레코드 추가

**일반적인 설정 방법** (업체마다 메뉴 이름이 다를 수 있음):

1. **도메인 관리 페이지 접속**
   - 등록 업체 웹사이트 로그인
   - "나의 도메인" 또는 "도메인 관리" 메뉴

2. **DNS 설정 메뉴 찾기**
   - "DNS 설정" / "DNS 관리" / "네임서버 설정" / "레코드 관리"
   - 연동할 도메인 선택

3. **CNAME 레코드 추가**
   
   **루트 도메인 설정** (예: gumidlc.co.kr):
   ```
   레코드 타입: CNAME
   호스트/이름: @ (또는 비워둠)
   값/타겟: [프로젝트이름].pages.dev
   TTL: 3600 (또는 Auto)
   ```
   
   **www 서브도메인 설정** (예: www.gumidlc.co.kr):
   ```
   레코드 타입: CNAME
   호스트/이름: www
   값/타겟: [프로젝트이름].pages.dev
   TTL: 3600 (또는 Auto)
   ```

4. **설정 저장**
   - "추가" 또는 "저장" 버튼 클릭
   - 변경사항 적용 확인

### 4-2. 주요 도메인 등록 업체별 가이드

#### 🔹 가비아 (Gabia)
```
1. My가비아 로그인
2. "서비스 관리" → "도메인"
3. 도메인 선택 → "DNS 정보" → "설정" 버튼
4. "레코드 추가"
5. 타입: CNAME, 호스트: @, 값: [프로젝트].pages.dev
6. "저장" 클릭
```

#### 🔹 후이즈 (Whois)
```
1. 후이즈 로그인
2. "도메인 관리"
3. 해당 도메인 "관리" 버튼
4. "네임서버 설정" 또는 "DNS 설정"
5. CNAME 레코드 추가
6. "적용" 클릭
```

#### 🔹 Cloudflare DNS (도메인이 Cloudflare에 등록된 경우)
```
1. Cloudflare 대시보드
2. 해당 도메인 선택
3. "DNS" → "Records" 탭
4. "Add record" 클릭
5. Type: CNAME, Name: @, Target: [프로젝트].pages.dev
6. Proxy status: Proxied (주황색 구름)
7. "Save" 클릭
```

---

## ⏱️ Step 5: DNS 전파 대기

### DNS 변경사항이 적용되는 시간

- **최소**: 5-10분
- **일반적**: 30분 - 2시간
- **최대**: 24-48시간

### DNS 전파 확인 방법

#### 방법 1: 온라인 도구 사용
```
웹사이트 접속:
- https://dnschecker.org
- 도메인 입력 후 CNAME 레코드 확인
- 여러 지역에서 동일한 결과가 나오면 전파 완료
```

#### 방법 2: 명령어로 확인 (리눅스/맥)
```bash
# CNAME 레코드 확인
dig gumidlc.co.kr CNAME

# 또는 nslookup 사용
nslookup -type=CNAME gumidlc.co.kr

# 결과에 [프로젝트].pages.dev가 표시되면 성공
```

#### 방법 3: Cloudflare에서 확인
```
Cloudflare Pages 프로젝트
→ Custom domains 탭
→ 도메인 상태가 "Active"로 변경되면 완료
```

---

## 🔒 Step 6: HTTPS/SSL 설정 (자동)

### Cloudflare가 자동으로 처리

도메인이 연결되면 Cloudflare가 자동으로:

1. **SSL 인증서 발급** (무료 Let's Encrypt)
2. **HTTPS 자동 활성화**
3. **HTTP → HTTPS 자동 리다이렉트**

### 추가 설정 (선택사항)

Cloudflare Pages 프로젝트 → Settings → SSL/TLS:

```
✅ Always Use HTTPS: 활성화 (권장)
✅ Automatic HTTPS Rewrites: 활성화 (권장)
✅ Minimum TLS Version: TLS 1.2 (권장)
```

---

## ✅ Step 7: 연동 완료 확인 및 테스트

### 7-1. 도메인 접속 확인

브라우저에서 아래 URL들을 테스트:

```
✅ 테스트 체크리스트:

[ ] http://도메인.com → https://도메인.com 자동 리다이렉트
[ ] https://도메인.com → 사이트 정상 로드
[ ] https://www.도메인.com → 사이트 정상 로드
[ ] 주소창에 자물쇠 아이콘 표시 (HTTPS 활성화)
```

### 7-2. 전체 페이지 테스트

#### 공개 페이지:
```
[ ] 홈페이지 (/)
[ ] 소개 (/about)
[ ] 서비스 (/services)
[ ] 자료실 (/resources)
[ ] 견적 요청 (/quote)
[ ] 문의하기 (/support)
[ ] 소식 (/news)
```

#### 관리자 페이지:
```
[ ] 관리자 로그인 (/admin/login)
[ ] 관리자 대시보드 (/admin/dashboard)
[ ] 자료실 관리 (/admin/resources)
[ ] 견적 관리 (/admin/quotes)
[ ] 문의 관리 (/admin/contacts)
```

#### 기능 테스트:
```
[ ] 견적 요청 양식 제출
[ ] 문의하기 양식 제출
[ ] 자료실 파일 다운로드
[ ] 관리자 로그인
[ ] 관리자 CRUD 작업
```

---

## 🚨 문제 해결 가이드

### 문제 1: 도메인이 연결되지 않음

**증상**: 도메인 접속 시 "사이트를 찾을 수 없음" 오류

**해결방법**:
1. DNS 레코드가 올바르게 설정되었는지 확인
2. DNS 전파 대기 (최대 48시간)
3. 브라우저 캐시 삭제 후 재시도
4. Cloudflare Custom domains에서 도메인 상태 확인

### 문제 2: HTTPS가 작동하지 않음

**증상**: "안전하지 않은 연결" 경고

**해결방법**:
1. SSL 인증서 발급 대기 (최대 24시간)
2. Cloudflare Settings → SSL/TLS 확인
3. "Always Use HTTPS" 설정 활성화
4. 브라우저 캐시 삭제

### 문제 3: www 버전이 작동하지 않음

**증상**: www.도메인.com이 연결되지 않음

**해결방법**:
1. www CNAME 레코드 추가 확인
2. Cloudflare에서 www 도메인도 Custom domains에 추가
3. DNS 전파 대기

### 문제 4: 관리자 페이지 오류

**증상**: Internal Server Error 500

**해결방법**:
1. **D1 데이터베이스 마이그레이션 실행 필요!**
2. Cloudflare 대시보드 → D1 Databases
3. `gumi-coop-db` 선택 → Console
4. 5개 마이그레이션 파일 순서대로 실행:
   ```
   0001_create_notices_table.sql
   0002_add_notices_indexes.sql
   0003_create_resources_table.sql
   0004_create_quote_requests.sql
   0005_create_contact_messages.sql
   ```

---

## 📊 D1 데이터베이스 마이그레이션

### ⚠️ 중요: 도메인 연동 후 반드시 실행

도메인 연동이 완료되면 데이터베이스 테이블을 생성해야 모든 기능이 작동합니다.

### 방법 1: Cloudflare 대시보드 (권장)

1. **Cloudflare 대시보드 접속**
   ```
   https://dash.cloudflare.com
   → Workers & Pages
   → D1 Databases
   → gumi-coop-db 선택
   ```

2. **Console 탭 이동**
   ```
   상단 탭에서 "Console" 클릭
   ```

3. **마이그레이션 SQL 실행**
   
   아래 순서대로 각 파일의 내용을 복사하여 실행:
   
   ```sql
   -- 1단계: migrations/0001_create_notices_table.sql
   -- 파일 내용 복사 → Console에 붙여넣기 → Execute
   
   -- 2단계: migrations/0002_add_notices_indexes.sql
   -- 파일 내용 복사 → Console에 붙여넣기 → Execute
   
   -- 3단계: migrations/0003_create_resources_table.sql
   -- 파일 내용 복사 → Console에 붙여넣기 → Execute
   
   -- 4단계: migrations/0004_create_quote_requests.sql
   -- 파일 내용 복사 → Console에 붙여넣기 → Execute
   
   -- 5단계: migrations/0005_create_contact_messages.sql
   -- 파일 내용 복사 → Console에 붙여넣기 → Execute
   ```

4. **테이블 생성 확인**
   ```sql
   SELECT name FROM sqlite_master WHERE type='table';
   ```
   
   **기대 결과**:
   ```
   notices
   resources
   quote_requests
   contact_messages
   ```

### 방법 2: Wrangler CLI (로컬 환경)

```bash
cd /home/user/webapp

# Cloudflare 로그인
wrangler login

# 각 마이그레이션 실행
wrangler d1 execute gumi-coop-db --file=migrations/0001_create_notices_table.sql
wrangler d1 execute gumi-coop-db --file=migrations/0002_add_notices_indexes.sql
wrangler d1 execute gumi-coop-db --file=migrations/0003_create_resources_table.sql
wrangler d1 execute gumi-coop-db --file=migrations/0004_create_quote_requests.sql
wrangler d1 execute gumi-coop-db --file=migrations/0005_create_contact_messages.sql

# 테이블 확인
wrangler d1 execute gumi-coop-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

## 📝 도메인 연동 후 할 일

### 즉시 할 일:

1. **D1 마이그레이션 실행** ✅ 필수
2. **전체 기능 테스트**
3. **관리자 계정 설정**
4. **샘플 데이터 확인 및 정리**

### 추후 할 일 (선택사항):

1. **SEO 설정**
   - robots.txt 추가
   - sitemap.xml 생성
   - Google Search Console 등록

2. **분석 도구 설치**
   - Google Analytics
   - Cloudflare Web Analytics

3. **이메일 알림 설정**
   - 문의 접수 시 관리자 이메일 알림
   - 견적 요청 시 알림

4. **백업 자동화**
   - D1 데이터베이스 정기 백업
   - R2 파일 백업

---

## 📞 도움이 필요하신가요?

### 다음 정보를 확인하거나 제공해주세요:

1. **Cloudflare Pages 정보**
   ```
   - 프로젝트 이름: ?
   - 현재 .pages.dev URL: ?
   - 배포 상태: ?
   ```

2. **도메인 정보**
   ```
   - 연동할 도메인: ?
   - 도메인 등록 업체: ?
   - DNS 설정 권한: 있음/없음
   ```

3. **현재 진행 단계**
   ```
   - 어느 단계까지 완료했나요?
   - 어떤 문제가 발생했나요?
   - 오류 메시지가 있나요?
   ```

---

## 🎉 성공 기준

도메인 연동이 성공적으로 완료되면:

- ✅ 사용자 도메인으로 웹사이트 접속 가능
- ✅ HTTPS (자물쇠 아이콘) 정상 작동
- ✅ 모든 페이지 로드 정상
- ✅ 견적 요청 양식 작동
- ✅ 문의하기 양식 작동
- ✅ 자료실 파일 다운로드 작동
- ✅ 관리자 페이지 정상 작동
- ✅ 관리자 대시보드 통계 표시

---

## 📚 참고 문서

프로젝트 내 다른 문서들:

- `SESSION_HANDOFF_DOMAIN_SETUP.md` - 도메인 연동 상세 가이드
- `🎊_PROJECT_COMPLETE_🎊.md` - 프로젝트 완료 요약
- `QUICK_START_NEXT_SESSION.md` - 빠른 시작 가이드
- `CONTACT_FORM_SYSTEM.md` - 문의하기 시스템 문서
- `QUOTE_REQUEST_SYSTEM.md` - 견적 요청 시스템 문서

---

**준비 완료!** 🚀

위 단계를 따라 진행하시면 됩니다. 각 단계를 진행하면서 궁금한 점이나 문제가 발생하면 언제든지 알려주세요!

**현재 필요한 정보:**
1. Cloudflare Pages 프로젝트 이름 및 현재 URL
2. 연동할 도메인 이름
3. 어느 단계부터 시작할지

알려주시면 해당 단계부터 자세히 안내해드리겠습니다! 💪
