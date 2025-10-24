# Cloudflare R2 파일 스토리지 설정 가이드

## 개요
자료실에 실제 파일 업로드/다운로드 기능을 구현하기 위해 Cloudflare R2 오브젝트 스토리지를 설정해야 합니다.

## R2란?
Cloudflare R2는 AWS S3와 호환되는 오브젝트 스토리지 서비스로, egress(데이터 전송) 비용이 무료입니다.

---

## 1단계: R2 버킷 생성

### Cloudflare 대시보드에서:

1. [Cloudflare 대시보드](https://dash.cloudflare.com/) 로그인
2. 왼쪽 메뉴에서 **"R2"** 선택
3. **"Create bucket"** 버튼 클릭
4. 버킷 설정:
   - **Bucket name**: `gumi-coop-resources`
   - **Location**: `Automatic` (권장) 또는 원하는 지역 선택
5. **"Create bucket"** 클릭

---

## 2단계: R2 공개 액세스 설정 (선택사항)

파일을 공개 URL로 접근하려면:

1. 생성한 버킷 선택
2. **"Settings"** 탭 이동
3. **"Public access"** 섹션에서 **"Allow Access"** 클릭
4. 도메인 설정:
   - Custom domain을 설정하거나
   - Cloudflare가 제공하는 `pub-xxxxx.r2.dev` 도메인 사용
5. **공개 도메인 URL 복사** (나중에 사용)

---

## 3단계: Cloudflare Pages에 R2 바인딩 설정

### 옵션 A: Cloudflare 대시보드에서 설정 (권장)

1. Cloudflare 대시보드 → **Workers & Pages**
2. 프로젝트 선택: `gumi-digital-coop-website`
3. **Settings** 탭 → **Functions** 섹션
4. **R2 bucket bindings** 섹션 찾기
5. **"Add binding"** 클릭:
   - **Variable name**: `RESOURCES_BUCKET`
   - **R2 bucket**: `gumi-coop-resources` 선택
6. **"Save"** 클릭

### 옵션 B: wrangler.jsonc로 설정 (이미 완료됨)

```jsonc
{
  "r2_buckets": [
    {
      "binding": "RESOURCES_BUCKET",
      "bucket_name": "gumi-coop-resources"
    }
  ]
}
```

---

## 4단계: 공개 URL 업데이트

`src/index.tsx` 파일에서 R2 공개 URL을 업데이트해야 합니다.

**현재 코드 (5962줄 근처):**
```typescript
const publicUrl = `https://pub-YOUR_ACCOUNT_ID.r2.dev/${fileKey}`
```

**수정할 내용:**
```typescript
// R2 공개 도메인으로 교체
const publicUrl = `https://pub-YOUR_ACTUAL_ID.r2.dev/${fileKey}`

// 또는 커스텀 도메인 사용
const publicUrl = `https://resources.gumidigital.co.kr/${fileKey}`
```

---

## 5단계: 배포 및 테스트

### 배포:
```bash
git add -A
git commit -m "feat: Add R2 integration for file uploads"
git push origin main
```

### 테스트:
1. 관리자 로그인: `https://your-site.com/admin/login`
2. 자료 관리 페이지: `https://your-site.com/admin/resources`
3. 파일 업로드 테스트
4. 자료실 페이지에서 다운로드 테스트

---

## 주요 기능

### ✅ 구현된 기능:

1. **파일 업로드 API** (`POST /api/resources/upload`)
   - 관리자만 접근 가능
   - FormData를 통한 파일 업로드
   - R2에 파일 저장 후 DB에 메타데이터 저장

2. **파일 다운로드 API** (`GET /api/resources/:id/download`)
   - 다운로드 카운트 자동 증가
   - R2에서 파일 스트리밍
   - 파일명 자동 설정

3. **파일 삭제 API** (`DELETE /api/resources/:id`)
   - R2와 DB에서 동시 삭제
   - 관리자만 접근 가능

4. **자료 관리 페이지** (`/admin/resources`)
   - 파일 업로드 폼
   - 등록된 자료 목록
   - 삭제 기능

---

## 비용 안내

### Cloudflare R2 무료 플랜:
- **스토리지**: 10 GB/월
- **Class A 작업** (쓰기): 1백만 요청/월
- **Class B 작업** (읽기): 10백만 요청/월
- **Egress(데이터 전송)**: **무료** ⭐

대부분의 소규모 사이트에서 무료 플랜으로 충분합니다.

---

## 파일 형식 지원

현재 지원되는 파일 형식:
- **PDF**: `.pdf`
- **Word**: `.doc`, `.docx`
- **PowerPoint**: `.ppt`, `.pptx`
- **Excel**: `.xls`, `.xlsx`

추가 형식이 필요한 경우 `accept` 속성을 수정하세요.

---

## 보안 고려사항

1. **인증**: 파일 업로드는 관리자만 가능 (JWT 인증)
2. **파일 검증**: 파일 타입 및 크기 제한 권장
3. **바이러스 스캔**: 프로덕션에서는 Cloudflare Workers용 바이러스 스캔 고려

---

## 문제 해결

### R2 바인딩 오류
**증상**: `RESOURCES_BUCKET is undefined`
**해결**: Cloudflare Pages 설정에서 R2 바인딩 확인

### 파일 업로드 실패
**증상**: 403 Forbidden
**해결**: R2 버킷 권한 확인, 인증 토큰 확인

### 다운로드 링크 404
**증상**: 파일을 찾을 수 없음
**해결**: 공개 URL 설정 확인, 파일 키 경로 확인

---

## 다음 개선 사항

- [ ] 파일 크기 제한 설정 (예: 50MB)
- [ ] 이미지 파일 미리보기
- [ ] 파일 업로드 진행률 표시
- [ ] 대용량 파일 분할 업로드
- [ ] 파일 이름 중복 처리
- [ ] CDN 캐싱 최적화

---

## 참고 자료

- [Cloudflare R2 공식 문서](https://developers.cloudflare.com/r2/)
- [R2 Workers 바인딩](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/)
- [R2 가격 정책](https://www.cloudflare.com/products/r2/)
