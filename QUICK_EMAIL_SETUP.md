# ⚡ 이메일 알림 빠른 설정 (5분)

**목표**: 견적 요청, 문의 메시지를 `wow3d16@naver.com`으로 자동 수신

---

## 🎯 Step 1: Resend API 키 발급 (3분)

### 1. Resend 가입
```
URL: https://resend.com
- Sign Up 클릭
- 이메일 인증 완료
```

### 2. API 키 생성
```
1. https://resend.com/api-keys 접속
2. "Create API Key" 클릭
3. 이름: GDAMIC
4. 권한: Full Access
5. Create → API 키 복사! (재확인 불가)
```

**API 키 예시**:
```
re_123abc456def789ghi012jkl345mno678
```

---

## 🔧 Step 2: Cloudflare 환경 변수 설정 (2분)

### 1. Cloudflare 접속
```
URL: https://dash.cloudflare.com
→ Workers & Pages
→ gumi-digital-coop-website
→ Settings
→ Environment variables
```

### 2. 변수 추가 (Add variable 클릭)

**Variable 1 (필수)**:
```
Variable name: RESEND_API_KEY
Value: [위에서 복사한 API 키]
Environment: Production
```

**Variable 2 (선택, 기본값 있음)**:
```
Variable name: ADMIN_EMAIL
Value: wow3d16@naver.com
Environment: Production
```

### 3. 재배포
```
Deployments 탭
→ 최신 배포의 "..." 메뉴
→ "Retry deployment"
```

---

## ✅ 완료!

이제 다음 상황에 자동으로 이메일이 발송됩니다:

✉️ **견적 요청** → wow3d16@naver.com  
✉️ **문의 메시지** → wow3d16@naver.com

---

## 🧪 테스트

1. https://www.gdamic.kr/quote 에서 견적 요청
2. https://www.gdamic.kr/support 에서 문의하기
3. `wow3d16@naver.com` 메일 확인!

(안 오면 스팸 폴더 확인)

---

## 📊 무료 플랜 한도

✅ 월 3,000통 무료 (충분함!)  
✅ 예상 사용량: 월 200-300통

---

**상세 가이드**: `EMAIL_NOTIFICATION_SETUP.md` 참고
