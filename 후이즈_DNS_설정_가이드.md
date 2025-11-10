# 🌐 후이즈(Whois)에서 gdamic.kr 도메인 연동하기

**도메인**: gdamic.kr  
**등록 업체**: 후이즈 (Whois)  
**Cloudflare Pages URL**: gumi-digital-coop-website.pages.dev (추정)  
**작성 일시**: 2025-10-24

---

## 📋 작업 개요

후이즈에서 해야 할 작업:
1. ✅ 후이즈 웹사이트 로그인
2. ✅ gdamic.kr 도메인 관리 페이지 접속
3. ✅ DNS 설정/네임서버 설정 메뉴 찾기
4. ✅ CNAME 레코드 2개 추가
5. ✅ 설정 저장 및 적용

**예상 소요 시간**: 10~15분

---

## 🔍 Step 0: Cloudflare Pages URL 최종 확인 (중요!)

먼저 정확한 Cloudflare Pages URL을 확인해야 합니다.

### 확인 방법:

1. **Cloudflare 대시보드 접속**
   ```
   https://dash.cloudflare.com
   ```

2. **Workers & Pages 메뉴**
   - 왼쪽 사이드바에서 "Workers & Pages" 클릭

3. **프로젝트 찾기**
   - Pages 탭에서 `gumi-digital-coop-website` 또는 유사한 이름 찾기
   - 프로젝트를 클릭하면 상단에 URL이 표시됨

4. **URL 형식**
   ```
   예상: gumi-digital-coop-website.pages.dev
   또는: gumi-digital-coop.pages.dev
   또는: gumi-coop.pages.dev
   ```

📝 **확인된 URL**: __________________.pages.dev

> ⚠️ **중요**: 이 URL을 정확히 확인한 후 다음 단계로 진행하세요!

---

## 🚀 Step 1: 후이즈 웹사이트 로그인

### 1-1. 후이즈 접속
```
웹사이트: https://www.whois.co.kr
```

### 1-2. 로그인
- 우측 상단 "로그인" 버튼 클릭
- 아이디/비밀번호 입력
- 로그인

---

## 📱 Step 2: 도메인 관리 페이지 접속

### 2-1. 도메인 관리 메뉴 찾기

로그인 후 다음 경로로 이동:

```
방법 1: 상단 메뉴
→ "MY 서비스" 또는 "도메인 관리"
→ "도메인 리스트" 또는 "나의 도메인"

방법 2: 마이페이지
→ 마이페이지
→ 도메인 관리
→ 도메인 리스트
```

### 2-2. gdamic.kr 도메인 찾기

- 도메인 목록에서 **gdamic.kr** 찾기
- 우측에 "관리" 또는 "DNS 설정" 버튼 클릭

---

## ⚙️ Step 3: DNS 레코드 설정

### 3-1. DNS 설정 메뉴 접속

gdamic.kr 도메인의 관리 페이지에서:

```
옵션 A: "DNS 관리" 또는 "DNS 설정" 버튼 클릭
옵션 B: "네임서버 설정" → "DNS 직접 설정" 선택
옵션 C: "부가서비스" → "DNS 레코드 관리"
```

### 3-2. 현재 DNS 확인

현재 설정된 DNS 레코드가 있는지 확인합니다.
- 기존 A 레코드나 CNAME 레코드가 있다면 삭제하거나 수정해야 합니다.

---

## 📝 Step 4: CNAME 레코드 추가

### 4-1. 첫 번째 레코드 추가 (루트 도메인)

**"레코드 추가" 또는 "새 레코드" 버튼 클릭**

```
┌─────────────────────────────────────────────────────────┐
│ 레코드 추가                                                │
├─────────────────────────────────────────────────────────┤
│ 레코드 타입: CNAME                                        │
│                                                           │
│ 호스트명/이름: @                                          │
│ (또는 비워두거나 "gdamic.kr" 입력)                         │
│                                                           │
│ 값/대상/Target: gumi-digital-coop-website.pages.dev      │
│ (Step 0에서 확인한 정확한 URL 입력)                        │
│                                                           │
│ TTL: 3600 (또는 기본값)                                   │
│                                                           │
│ [ 저장 ] [ 취소 ]                                         │
└─────────────────────────────────────────────────────────┘
```

**입력 예시:**
- **타입**: CNAME
- **호스트**: `@` (또는 비워두기)
- **값**: `gumi-digital-coop-website.pages.dev`
- **TTL**: `3600` (1시간)

> ⚠️ **주의**: 일부 DNS 제공업체는 루트 도메인(@)에 CNAME을 지원하지 않을 수 있습니다.
> 이 경우 A 레코드로 대체하거나, ANAME/ALIAS 레코드를 사용해야 합니다.

### 4-2. 두 번째 레코드 추가 (www 서브도메인)

**다시 "레코드 추가" 버튼 클릭**

```
┌─────────────────────────────────────────────────────────┐
│ 레코드 추가                                                │
├─────────────────────────────────────────────────────────┤
│ 레코드 타입: CNAME                                        │
│                                                           │
│ 호스트명/이름: www                                        │
│                                                           │
│ 값/대상/Target: gumi-digital-coop-website.pages.dev      │
│                                                           │
│ TTL: 3600 (또는 기본값)                                   │
│                                                           │
│ [ 저장 ] [ 취소 ]                                         │
└─────────────────────────────────────────────────────────┘
```

**입력 예시:**
- **타입**: CNAME
- **호스트**: `www`
- **값**: `gumi-digital-coop-website.pages.dev`
- **TTL**: `3600`

---

## 💾 Step 5: 설정 저장 및 적용

### 5-1. 설정 저장
- 각 레코드마다 "저장" 또는 "추가" 버튼 클릭
- 전체 설정이 완료되면 "적용" 또는 "변경사항 저장" 클릭

### 5-2. 최종 확인

설정 후 DNS 레코드 목록에서 확인:

```
┌──────┬─────────┬──────────────────────────────────────┬──────┐
│ 타입  │ 호스트  │ 값/대상                               │ TTL  │
├──────┼─────────┼──────────────────────────────────────┼──────┤
│CNAME │ @       │ gumi-digital-coop-website.pages.dev  │ 3600 │
│CNAME │ www     │ gumi-digital-coop-website.pages.dev  │ 3600 │
└──────┴─────────┴──────────────────────────────────────┴──────┘
```

---

## 🚨 문제 해결: 루트 도메인 CNAME 오류

### 문제: "루트 도메인에는 CNAME을 설정할 수 없습니다"

후이즈에서 @ (루트 도메인)에 CNAME을 허용하지 않는 경우:

### 해결 방법 1: ANAME 또는 ALIAS 레코드 사용 (권장)

```
타입: ANAME 또는 ALIAS
호스트: @
값: gumi-digital-coop-website.pages.dev
```

### 해결 방법 2: A 레코드로 Cloudflare IP 설정

먼저 Cloudflare Pages의 IP 주소를 확인해야 합니다:

```bash
# 터미널에서 실행 (또는 온라인 도구 사용)
nslookup gumi-digital-coop-website.pages.dev
```

결과 IP 주소를 확인한 후:

```
타입: A
호스트: @
값: [확인된 IP 주소]
```

### 해결 방법 3: www만 사용하고 리다이렉트 설정

1. www.gdamic.kr만 CNAME으로 설정
2. gdamic.kr → www.gdamic.kr로 리다이렉트 설정
3. 후이즈의 "URL 포워딩" 기능 사용

---

## ⏱️ Step 6: DNS 전파 대기

### 6-1. 전파 시간

DNS 설정 변경 후 전파되는 시간:
- **최소**: 5~10분
- **일반적**: 30분~2시간
- **최대**: 24~48시간

### 6-2. 전파 상태 확인

#### 방법 1: 온라인 도구 사용 (가장 쉬움)

1. **DNSChecker.org 접속**
   ```
   https://dnschecker.org
   ```

2. **도메인 입력 및 확인**
   - 도메인: `gdamic.kr` 입력
   - 레코드 타입: `CNAME` 선택
   - "Search" 버튼 클릭

3. **결과 확인**
   - 전 세계 여러 DNS 서버에서 조회 결과 표시
   - 대부분 지역에서 `gumi-digital-coop-website.pages.dev`가 표시되면 전파 완료

#### 방법 2: 명령어로 확인 (Windows)

```cmd
# 명령 프롬프트 (CMD)
nslookup gdamic.kr
nslookup www.gdamic.kr
```

#### 방법 3: 명령어로 확인 (Mac/Linux)

```bash
dig gdamic.kr
dig www.gdamic.kr

# 또는
host gdamic.kr
host www.gdamic.kr
```

### 6-3. 전파 완료 기준

다음 결과가 나오면 전파 완료:
```
gdamic.kr → gumi-digital-coop-website.pages.dev
www.gdamic.kr → gumi-digital-coop-website.pages.dev
```

---

## 🔗 Step 7: Cloudflare Pages에 도메인 추가

DNS 설정이 완료되면 Cloudflare에서도 도메인을 추가해야 합니다.

### 7-1. Cloudflare Pages 프로젝트 열기

```
1. https://dash.cloudflare.com 접속
2. Workers & Pages 클릭
3. gumi-digital-coop-website 프로젝트 클릭
```

### 7-2. Custom domains 탭 이동

```
프로젝트 페이지 상단:
- Deployments
- Analytics  
- Settings
- Custom domains ← 여기 클릭
```

### 7-3. 도메인 추가

1. **"Set up a custom domain" 버튼 클릭**

2. **도메인 입력**
   ```
   Domain: gdamic.kr
   ```

3. **"Continue" 클릭**

4. **DNS 확인**
   - Cloudflare가 자동으로 DNS 레코드 확인
   - "Active" 상태로 변경되면 성공!

5. **www 도메인도 추가**
   - "Add a custom domain" 다시 클릭
   - `www.gdamic.kr` 입력
   - Continue 클릭

### 7-4. 도메인 상태 확인

Custom domains 페이지에서:
```
✅ gdamic.kr - Active (HTTPS enabled)
✅ www.gdamic.kr - Active (HTTPS enabled)
```

---

## 🔒 Step 8: HTTPS/SSL 자동 활성화

### 8-1. 자동 처리

Cloudflare가 자동으로:
1. ✅ SSL 인증서 발급 (Let's Encrypt)
2. ✅ HTTPS 활성화
3. ✅ HTTP → HTTPS 자동 리다이렉트

### 8-2. 확인 방법

브라우저에서 접속:
```
http://gdamic.kr → https://gdamic.kr 자동 리다이렉트
https://gdamic.kr → 🔒 녹색 자물쇠 아이콘
https://www.gdamic.kr → 🔒 녹색 자물쇠 아이콘
```

### 8-3. SSL 설정 확인 (선택사항)

Cloudflare Pages 프로젝트 → Settings:
```
✅ Always Use HTTPS: 활성화
✅ Automatic HTTPS Rewrites: 활성화  
✅ Minimum TLS Version: TLS 1.2
```

---

## ✅ Step 9: 연동 완료 테스트

### 9-1. 도메인 접속 테스트

브라우저에서 다음 URL들을 테스트:

```
✅ http://gdamic.kr
✅ https://gdamic.kr
✅ http://www.gdamic.kr
✅ https://www.gdamic.kr
```

모두 정상적으로 웹사이트가 로드되어야 합니다.

### 9-2. 전체 페이지 테스트

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

#### 양식 제출 테스트 (중요!):
```
[ ] 견적 요청 양식 - 제출 가능 여부
[ ] 문의하기 양식 - 제출 가능 여부
```

> ⚠️ **참고**: 양식이 작동하려면 D1 데이터베이스 마이그레이션이 필요합니다!

---

## 🗄️ Step 10: D1 데이터베이스 마이그레이션 실행

도메인 연동 후 데이터베이스 테이블을 생성해야 모든 기능이 작동합니다.

### 10-1. Cloudflare D1 Console 접속

```
1. https://dash.cloudflare.com
2. Workers & Pages 메뉴
3. D1 Databases 클릭
4. gumi-coop-db 선택
5. Console 탭 클릭
```

### 10-2. 마이그레이션 SQL 실행

다음 5개 파일을 순서대로 실행:

#### 1단계: 공지사항 테이블
```
파일: migrations/0001_create_notices_table.sql
→ 파일 내용 전체 복사
→ D1 Console에 붙여넣기
→ Execute 버튼 클릭
```

#### 2단계: 공지사항 인덱스
```
파일: migrations/0002_add_notices_indexes.sql
→ 복사 → 붙여넣기 → Execute
```

#### 3단계: 자료실 테이블
```
파일: migrations/0003_create_resources_table.sql
→ 복사 → 붙여넣기 → Execute
```

#### 4단계: 견적 요청 테이블
```
파일: migrations/0004_create_quote_requests.sql
→ 복사 → 붙여넣기 → Execute
```

#### 5단계: 문의하기 테이블
```
파일: migrations/0005_create_contact_messages.sql
→ 복사 → 붙여넣기 → Execute
```

### 10-3. 테이블 생성 확인

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

---

## 🎉 완료 확인 체크리스트

모든 작업이 완료되었는지 확인:

### DNS 설정:
- [ ] 후이즈에서 CNAME 레코드 2개 추가 완료
- [ ] DNS 전파 완료 (dnschecker.org 확인)

### Cloudflare 설정:
- [ ] Cloudflare Pages에 gdamic.kr 추가
- [ ] Cloudflare Pages에 www.gdamic.kr 추가
- [ ] 도메인 상태 "Active"
- [ ] HTTPS 자동 활성화 완료

### 웹사이트 접속:
- [ ] https://gdamic.kr 정상 로드
- [ ] https://www.gdamic.kr 정상 로드
- [ ] 모든 페이지 정상 작동
- [ ] HTTPS (녹색 자물쇠) 표시

### 데이터베이스:
- [ ] D1 마이그레이션 5개 모두 실행
- [ ] 테이블 4개 생성 확인
- [ ] 견적 요청 양식 작동
- [ ] 문의하기 양식 작동

### 관리자 페이지:
- [ ] https://gdamic.kr/admin/login 접속 가능
- [ ] 관리자 로그인 가능
- [ ] 대시보드 정상 표시
- [ ] 모든 관리 기능 작동

---

## 📞 문제 발생 시 확인 사항

### 문제 1: 도메인이 연결되지 않음
```
원인: DNS 전파 미완료
해결: 30분~2시간 더 대기 후 재확인
확인: dnschecker.org에서 전파 상태 확인
```

### 문제 2: HTTPS가 작동하지 않음
```
원인: SSL 인증서 발급 중
해결: 최대 24시간 대기
확인: Cloudflare Pages Custom domains에서 상태 확인
```

### 문제 3: 양식 제출이 안 됨
```
원인: D1 마이그레이션 미실행
해결: Step 10의 마이그레이션 실행
확인: D1 Console에서 테이블 존재 확인
```

### 문제 4: 관리자 페이지 오류
```
원인: 데이터베이스 테이블 없음
해결: D1 마이그레이션 실행
확인: 각 마이그레이션 파일이 오류 없이 실행되었는지 확인
```

---

## 📚 참고 자료

### 프로젝트 문서:
- `DOMAIN_CONNECTION_READY.md` - 완전한 도메인 연동 가이드
- `도메인_연동_시작하기.md` - 빠른 시작 가이드
- `🎊_PROJECT_COMPLETE_🎊.md` - 프로젝트 완료 요약

### 후이즈 관련:
- 후이즈 웹사이트: https://www.whois.co.kr
- 후이즈 고객센터: 1544-2511
- 후이즈 FAQ: https://www.whois.co.kr/faq

### Cloudflare 관련:
- Cloudflare Dashboard: https://dash.cloudflare.com
- Cloudflare Docs: https://developers.cloudflare.com
- DNS 전파 확인: https://dnschecker.org

---

## 🎊 성공!

모든 단계가 완료되면:

✅ **https://gdamic.kr**로 구미 디지털협동조합 웹사이트 접속 가능  
✅ **HTTPS 보안 연결** (녹색 자물쇠)  
✅ **모든 기능 정상 작동** (견적 요청, 문의하기, 자료실 등)  
✅ **관리자 페이지** 완전 작동  
✅ **프로페셔널한 도메인**으로 운영 시작!

---

**작성일**: 2025-10-24  
**도메인**: gdamic.kr  
**등록 업체**: 후이즈 (Whois)  
**상태**: ✅ 준비 완료

궁금한 점이나 문제가 발생하면 언제든지 알려주세요! 🚀
