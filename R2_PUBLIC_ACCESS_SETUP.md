# R2 공개 액세스 설정 가이드

## 현재 상태
- ✅ R2 버킷 생성 완료: `gumi-coop-resources`
- ✅ Account ID 확인: `85c8e953bdafb825af537f0d66ca5dc`
- ✅ 코드에 공개 URL 설정 완료
- ⏳ **R2 공개 액세스 설정 필요**

---

## R2 버킷 공개 액세스 설정

### 1단계: R2 버킷 설정 페이지 이동

1. [Cloudflare Dashboard R2](https://dash.cloudflare.com/?to=/:account/r2) 접속
2. `gumi-coop-resources` 버킷 클릭
3. **Settings** 탭 선택

### 2단계: 공개 액세스 활성화

#### 옵션 A: R2.dev 서브도메인 사용 (빠름, 권장)

1. **Public access** 섹션 찾기
2. **"Allow Access"** 버튼 클릭
3. **"Connect domain"** 선택
4. **"Enable R2.dev subdomain"** 선택
5. 생성된 도메인 확인:
   ```
   https://pub-85c8e953bdafb825af537f0d66ca5dc.r2.dev
   ```
6. **"Enable"** 클릭

#### 옵션 B: 커스텀 도메인 사용 (선택사항)

커스텀 도메인을 사용하려면 (예: `resources.gumidigital.co.kr`):

1. **Public access** 섹션에서 **"Connect domain"** 클릭
2. **"Custom domain"** 선택
3. 도메인 입력: `resources.gumidigital.co.kr`
4. DNS 레코드 추가:
   ```
   Type: CNAME
   Name: resources
   Target: gumi-coop-resources.85c8e953bdafb825af537f0d66ca5dc.r2.cloudflarestorage.com
   ```
5. **"Connect"** 클릭

**커스텀 도메인 사용 시 코드 수정 필요:**
```typescript
// src/index.tsx 6222줄 수정
const publicUrl = `https://resources.gumidigital.co.kr/${fileKey}`
```

---

## 3단계: Cloudflare Pages R2 바인딩 설정

### Cloudflare Dashboard에서:

1. **Workers & Pages** 메뉴 선택
2. 프로젝트 `gumi-digital-coop-website` 클릭
3. **Settings** 탭 선택
4. 아래로 스크롤하여 **Functions** 섹션 찾기
5. **R2 bucket bindings** 섹션에서 **"Add binding"** 클릭

### 바인딩 설정:
```
Variable name: RESOURCES_BUCKET
R2 bucket: gumi-coop-resources
Environment: Production
```

6. **"Save"** 클릭
7. **"Redeploy"** 클릭하여 변경사항 적용

---

## 4단계: 데이터베이스 마이그레이션 실행

자료실 테이블이 프로덕션 DB에 없다면:

### Cloudflare D1 Console에서:

1. **Workers & Pages** → **D1**
2. `gumi-coop-db` 데이터베이스 선택
3. **Console** 탭 선택
4. `RESOURCES_MIGRATION.md` 파일의 SQL 실행

---

## 5단계: 테스트

### 파일 업로드 테스트:

1. 관리자 로그인: `https://your-site.com/admin/login`
   - 기본 비밀번호: `admin1234`

2. 자료 관리 페이지: `https://your-site.com/admin/resources`

3. 파일 업로드:
   - 카테고리 선택
   - 제목 입력
   - 설명 입력
   - 파일 선택 (PDF, DOCX 등)
   - "업로드" 클릭

4. 업로드 확인:
   - 성공 메시지 확인
   - 자동 새로고침 후 목록에 표시

### 파일 다운로드 테스트:

1. 자료실 페이지: `https://your-site.com/resources`

2. 업로드한 자료 찾기:
   - 검색 사용
   - 카테고리 필터링

3. "다운로드" 버튼 클릭

4. 확인사항:
   - 파일이 정상적으로 다운로드됨
   - 파일명이 올바르게 설정됨
   - 다운로드 횟수가 증가함

---

## 문제 해결

### "Access Denied" 또는 403 오류

**원인**: R2 버킷 공개 액세스가 설정되지 않음

**해결**:
1. R2 버킷 설정에서 Public access 확인
2. R2.dev 서브도메인이 활성화되었는지 확인
3. 공개 URL이 코드와 일치하는지 확인

### "RESOURCES_BUCKET is undefined" 오류

**원인**: R2 바인딩이 설정되지 않음

**해결**:
1. Cloudflare Pages → Settings → Functions
2. R2 bucket bindings 확인
3. Variable name이 정확히 `RESOURCES_BUCKET`인지 확인
4. 바인딩 저장 후 사이트 재배포

### 파일이 업로드되었지만 다운로드되지 않음

**원인**: 파일은 R2에 저장되었지만 공개 액세스 문제

**해결**:
1. R2 콘솔에서 파일이 실제로 업로드되었는지 확인
2. 공개 URL 직접 접속 테스트
3. CORS 설정 확인 (필요시)

### 큰 파일 업로드 실패

**원인**: Cloudflare Workers 제한 (100MB)

**해결**:
- Workers에서는 최대 100MB까지 지원
- 더 큰 파일은 직접 R2 업로드 사용
- 또는 파일을 분할하여 업로드

---

## CORS 설정 (필요시)

파일 다운로드 시 CORS 오류가 발생하면:

### R2 버킷 CORS 설정:

```json
[
  {
    "AllowedOrigins": ["https://your-site.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

Cloudflare API 또는 Wrangler CLI로 설정 가능.

---

## 보안 고려사항

### 현재 보안 설정:

✅ **파일 업로드**: 관리자만 가능 (JWT 인증)
✅ **파일 삭제**: 관리자만 가능
⚠️ **파일 다운로드**: 공개 (URL을 아는 누구나 가능)

### 추가 보안 권장사항:

1. **서명된 URL 사용** (선택):
   - 일정 시간 후 만료되는 URL
   - 더 높은 보안 필요 시

2. **파일 검증**:
   - 업로드 전 파일 타입 검증
   - 바이러스 스캔 (프로덕션 권장)

3. **용량 제한**:
   - 파일 크기 제한 설정 (예: 50MB)
   - 사용자당 업로드 제한

---

## 현재 설정된 공개 URL

```typescript
https://pub-85c8e953bdafb825af537f0d66ca5dc.r2.dev/resources/{timestamp}_{filename}
```

이 URL은 R2 버킷의 공개 액세스가 활성화되면 자동으로 작동합니다.

---

## 다음 단계 체크리스트

- [ ] R2 버킷 공개 액세스 활성화
- [ ] Cloudflare Pages R2 바인딩 설정
- [ ] 데이터베이스 마이그레이션 실행 (필요시)
- [ ] 사이트 재배포
- [ ] 파일 업로드 테스트
- [ ] 파일 다운로드 테스트
- [ ] 다운로드 카운트 증가 확인

---

## 참고 자료

- [R2 공개 버킷 설정](https://developers.cloudflare.com/r2/buckets/public-buckets/)
- [R2 커스텀 도메인](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains)
- [Cloudflare Pages R2 바인딩](https://developers.cloudflare.com/pages/platform/functions/bindings/#r2-buckets)
