# 카카오맵 API 설정 가이드

오시는 길 페이지에 카카오맵이 연동되었습니다.

## 🗺️ 카카오맵 API 키 발급 방법

### 1. 카카오 개발자 계정 생성
1. **https://developers.kakao.com** 접속
2. 카카오 계정으로 로그인
3. 개발자 등록 (처음 이용시)

### 2. 애플리케이션 등록
1. "내 애플리케이션" 메뉴 클릭
2. "애플리케이션 추가하기" 버튼 클릭
3. 앱 정보 입력:
   - 앱 이름: `구미디지털적층산업사업협동조합 웹사이트`
   - 사업자명: `구미디지털적층산업사업협동조합`

### 3. JavaScript 키 발급
1. 생성한 앱 선택
2. "앱 키" 탭 클릭
3. **JavaScript 키** 복사

### 4. 플랫폼 등록 (중요!)
1. "플랫폼" 탭 클릭
2. "Web 플랫폼 등록" 클릭
3. 사이트 도메인 등록:
   ```
   http://localhost:3000
   https://gumi-digital-coop-website.pages.dev
   ```

---

## 🔧 API 키 적용 방법

### src/index.tsx 파일 수정

**5105번 라인**에서 `YOUR_KAKAO_APP_KEY`를 발급받은 JavaScript 키로 교체:

```tsx
// 변경 전
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY&autoload=false"></script>

// 변경 후 (예시)
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=abcdef1234567890abcdef1234567890&autoload=false"></script>
```

---

## 📍 현재 설정된 위치 정보

```javascript
위도(latitude): 36.1191
경도(longitude): 128.3445
주소: 경상북도 구미시 산호대로 253
```

---

## 🎨 지도 기능

현재 구현된 기능:
- ✅ 기본 지도 표시
- ✅ 마커 표시
- ✅ 인포윈도우 (위치 정보)
- ✅ 지도 타입 컨트롤 (일반/위성)
- ✅ 줌 컨트롤
- ✅ 카카오맵 앱 연동 링크

---

## 🔄 위치 좌표 변경 방법

정확한 좌표를 확인하려면:

1. **카카오맵**에서 주소 검색
   - https://map.kakao.com
   - "경상북도 구미시 산호대로 253" 검색

2. **좌표 확인**
   - 지도에서 해당 위치 클릭
   - URL에서 좌표 확인 또는
   - 공유 > 링크 복사에서 좌표 확인

3. **코드 수정** (src/index.tsx, 약 5108-5112번 라인)
   ```javascript
   // 지도 중심 좌표
   center: new kakao.maps.LatLng(36.1191, 128.3445),
   
   // 마커 위치
   var markerPosition = new kakao.maps.LatLng(36.1191, 128.3445);
   ```

---

## ⚠️ 문제 해결

### 지도가 표시되지 않는 경우

1. **API 키 확인**
   - JavaScript 키가 올바르게 입력되었는지 확인
   - 키에 공백이나 특수문자가 없는지 확인

2. **플랫폼 등록 확인**
   - 카카오 개발자 콘솔에서 현재 도메인이 등록되었는지 확인
   - localhost와 배포 도메인 모두 등록

3. **브라우저 콘솔 확인**
   - F12 → Console 탭
   - 에러 메시지 확인

4. **일반적인 에러**
   ```
   - "appkey를 확인해주세요": API 키가 잘못됨
   - "플랫폼 미등록": 도메인이 등록되지 않음
   - "CORS 에러": 플랫폼 설정 문제
   ```

---

## 📚 참고 문서

- 카카오맵 API 문서: https://apis.map.kakao.com/web/
- 가이드: https://apis.map.kakao.com/web/guide/
- 샘플: https://apis.map.kakao.com/web/sample/

---

## 🎯 다음 단계

1. 카카오 개발자 계정에서 JavaScript 키 발급
2. `src/index.tsx` 파일에서 `YOUR_KAKAO_APP_KEY` 교체
3. 빌드 및 배포
4. 웹사이트에서 지도 정상 작동 확인

---

**작성일**: 2025-10-23
**위치**: /location 페이지
