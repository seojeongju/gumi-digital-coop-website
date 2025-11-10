# 📧 이메일 알림 설정 가이드

**작성일**: 2025-11-10  
**상태**: ✅ 코드 구현 완료, 환경 변수 설정 필요

---

## 🎯 개요

견적 요청과 문의 메시지가 접수될 때 **wow3d16@naver.com**으로 자동 이메일 알림이 발송됩니다.

### ✅ 구현 완료 사항
- Resend 패키지 설치 완료
- 이메일 발송 함수 구현
- 견적 요청 시 자동 알림
- 문의 메시지 시 자동 알림
- 한글 이메일 템플릿 (모바일 최적화)

### ⏰ 설정 필요 사항
- Resend API 키 발급 (5분)
- Cloudflare Pages 환경 변수 설정 (2분)

---

## 📝 Step 1: Resend 계정 생성 및 API 키 발급

### 1-1. Resend 회원가입

1. **Resend 웹사이트 접속**: https://resend.com
2. **Sign Up** 클릭
3. 이메일 인증 완료

### 1-2. API 키 발급

1. **대시보드 접속**: https://resend.com/api-keys
2. **Create API Key** 클릭
3. 키 이름 입력: `GDAMIC Production`
4. 권한: **Full Access** 선택
5. **Create** 클릭
6. 📋 **API 키 복사** (다시 볼 수 없으니 안전한 곳에 저장!)
   ```
   예시: re_123abc456def789ghi012jkl345mno678
   ```

### 1-3. 무료 플랜 확인

✅ **무료 플랜**: 월 3,000통 무료  
✅ **발송자 이메일**: `onboarding@resend.dev` (무료)  
✅ **한글 지원**: 완벽 지원

> 💡 **참고**: 나중에 자체 도메인 연결도 가능합니다 (예: noreply@gdamic.kr)

---

## 🔧 Step 2: Cloudflare Pages 환경 변수 설정

### 2-1. Cloudflare Dashboard 접속

1. **Cloudflare 로그인**: https://dash.cloudflare.com
2. **Workers & Pages** 메뉴 클릭
3. **gumi-digital-coop-website** 프로젝트 선택
4. **Settings** 탭 클릭
5. **Environment variables** 섹션 찾기

### 2-2. 환경 변수 추가

다음 2개의 환경 변수를 추가합니다:

#### Variable 1: RESEND_API_KEY (필수)
```
Variable name: RESEND_API_KEY
Value: re_123abc456def789ghi012jkl345mno678  (Step 1에서 복사한 키)
Environment: Production
```
**Add variable** 클릭

#### Variable 2: ADMIN_EMAIL (선택)
```
Variable name: ADMIN_EMAIL
Value: wow3d16@naver.com
Environment: Production
```
**Add variable** 클릭

> 💡 **ADMIN_EMAIL을 설정하지 않으면?**  
> 기본값으로 `wow3d16@naver.com`이 사용됩니다. (코드에 하드코딩됨)

### 2-3. 배포 트리거

환경 변수 추가 후:
1. **Deployments** 탭으로 이동
2. 최신 배포의 **...** 메뉴 클릭
3. **Retry deployment** 선택
4. 또는 GitHub에 새로운 커밋 푸시 시 자동 배포

---

## 📬 이메일 알림 내용

### 견적 요청 알림 이메일

**제목**: `[구미디지털적층] 새로운 견적 요청 - 홍길동님`

**포함 정보**:
- 🕐 접수 시간
- 👤 고객 정보 (이름, 회사명, 이메일, 전화번호)
- 🔧 서비스 유형
- 📦 수량, ⏰ 납기일, 💰 예산 범위
- 📝 상세 설명
- 📎 첨부 파일 (파일명, 크기)
- 🔗 관리자 페이지 바로가기 링크

**디자인**: 
- 파란색 그라데이션 헤더
- 깔끔한 카드형 레이아웃
- 모바일 최적화

### 문의 메시지 알림 이메일

**제목**: `[구미디지털적층] 새로운 문의 - 김철수님`

**포함 정보**:
- 🕐 접수 시간
- 📋 문의 유형 (조합원 가입, 서비스 이용, 협력 제안 등)
- 👤 고객 정보 (이름, 회사명, 이메일, 전화번호)
- 💬 문의 내용
- 🔗 관리자 페이지 바로가기 링크

**디자인**:
- 보라색 그라데이션 헤더
- 깔끔한 카드형 레이아웃
- 모바일 최적화

---

## ✅ 테스트 방법

### 1. 로컬 테스트 (선택)

```bash
cd /home/user/webapp

# .dev.vars 파일 생성 (로컬 환경 변수)
cat > .dev.vars << 'EOF'
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=wow3d16@naver.com
EOF

# 로컬 개발 서버 실행
npm run dev
```

로컬에서 견적 요청 또는 문의하기 폼 제출 테스트

### 2. 프로덕션 테스트

환경 변수 설정 후:

1. **견적 요청 페이지**: https://www.gdamic.kr/quote
2. 테스트 정보 입력 및 제출
3. `wow3d16@naver.com` 이메일 수신 확인

또는

1. **문의하기 페이지**: https://www.gdamic.kr/support
2. 테스트 문의 작성 및 제출
3. 이메일 수신 확인

---

## 🔍 문제 해결

### ❌ 이메일이 도착하지 않는 경우

**원인 1: 환경 변수 미설정**
```
해결: Cloudflare Pages 환경 변수 확인
- RESEND_API_KEY가 정확히 설정되었는지 확인
- 배포 후 다시 시도
```

**원인 2: API 키 오류**
```
해결: Resend Dashboard에서 API 키 재확인
- API 키가 만료되지 않았는지 확인
- Full Access 권한이 있는지 확인
- 필요시 새 API 키 발급
```

**원인 3: Resend 일일 할당량 초과**
```
해결: Resend Dashboard에서 사용량 확인
- 무료 플랜: 월 3,000통
- 초과 시 유료 플랜 업그레이드 고려
```

**원인 4: 스팸 폴더**
```
해결: 받는 메일함 스팸 폴더 확인
- wow3d16@naver.com 스팸 폴더 확인
- 발신자를 안전한 발신자로 등록
```

### 📊 로그 확인

**Cloudflare Pages 로그**:
```
1. Cloudflare Dashboard > gumi-digital-coop-website
2. Deployments 탭 > 최신 배포 클릭
3. View logs 에서 에러 확인
```

로그에서 다음 메시지 확인:
- ✅ `Email sent successfully:` - 성공
- ⚠️ `RESEND_API_KEY not configured` - 환경 변수 미설정
- ❌ `Email sending failed:` - 발송 실패 (API 키 오류 등)

---

## 💰 비용 정보

### Resend 무료 플랜
- 월 3,000통 무료
- 발송자 이메일: onboarding@resend.dev
- API 접근 무제한
- 한글 완벽 지원

### 예상 사용량
```
일 평균 5건 문의 = 월 150통
일 평균 3건 견적 = 월 90통
--------------------------
총 월 240통 (무료 범위 내)
```

### 유료 플랜 (필요 시)
- $20/월: 월 50,000통
- 커스텀 도메인 사용 가능 (예: noreply@gdamic.kr)
- 전송 통계 및 분석

---

## 🚀 향후 개선 사항

### 단계 1 (현재)
- ✅ 관리자에게 이메일 알림

### 단계 2 (선택)
- 📧 고객에게도 접수 확인 이메일 발송
- 📨 HTML 템플릿 더 풍부하게
- 📊 이메일 전송 통계 대시보드

### 단계 3 (선택)
- 🎨 커스텀 도메인 설정 (noreply@gdamic.kr)
- 📱 SMS 알림 추가 (Twilio 등)
- 🤖 Slack/Discord 알림 연동

---

## 📞 지원

문제가 발생하면 다음 자료를 참고하세요:

- **Resend 문서**: https://resend.com/docs
- **Cloudflare Pages 문서**: https://developers.cloudflare.com/pages
- **이 프로젝트 문서**: `FINAL_PROJECT_STATUS.md`

---

**작성**: 2025-11-10  
**버전**: 1.0  
**상태**: 구현 완료, 설정 대기 중 ⏳
