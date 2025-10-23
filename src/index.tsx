import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer
app.use(renderer)

// 상단 정보바
const TopBar = () => (
  <div class="bg-navy text-white py-2 text-sm">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div class="flex items-center space-x-6">
          <span><i class="fas fa-phone mr-2"></i> 054-123-4567</span>
          <span><i class="fas fa-envelope mr-2"></i> info@gumidigital.co.kr</span>
          <span class="hidden md:inline"><i class="fas fa-clock mr-2"></i> 평일 09:00 - 18:00</span>
        </div>
        <div class="flex items-center space-x-4">
          <a href="#" class="hover:text-teal transition"><i class="fab fa-facebook"></i></a>
          <a href="#" class="hover:text-teal transition"><i class="fab fa-instagram"></i></a>
          <a href="#" class="hover:text-teal transition"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>
  </div>
)

// 공통 컴포넌트: 헤더
const Header = () => (
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <TopBar />
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        {/* 로고 */}
        <a href="/" class="flex items-center space-x-3">
          <img src="/static/images/logo.png" alt="구미디지털적층산업사업협동조합" class="h-16 md:h-20" />
        </a>
        
        {/* 데스크톱 메뉴 */}
        <nav class="hidden lg:flex items-center space-x-8">
          <a href="/" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm">HOME</a>
          
          {/* 조합 소개 드롭다운 */}
          <div class="relative group">
            <a href="/about" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm flex items-center">
              조합 소개
              <i class="fas fa-chevron-down ml-1 text-xs"></i>
            </a>
            <div class="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a href="/about" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">조합 개요</a>
              <a href="/about/greeting" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">조합장 인사말</a>
              <a href="/about/organization" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">조직 및 운영구조</a>
              <a href="/about#vision" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">비전 & 미션</a>
              <a href="/about#values" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">핵심 가치</a>
              <a href="/about#location" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">오시는 길</a>
            </div>
          </div>
          
          <a href="/services" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm">서비스</a>
          
          {/* 조합원 드롭다운 */}
          <div class="relative group">
            <a href="/members" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm flex items-center">
              조합원
              <i class="fas fa-chevron-down ml-1 text-xs"></i>
            </a>
            <div class="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a href="/members" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">조합원 소개</a>
              <a href="/members/join" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">조합원 가입</a>
            </div>
          </div>
          
          <a href="/news" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm">소식</a>
          <a href="/support" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm">문의</a>
        </nav>
        
        {/* CTA 버튼 */}
        <div class="hidden lg:flex items-center space-x-4">
          <a href="/members/join" class="px-6 py-3 bg-teal text-white rounded-md hover:bg-opacity-90 transition font-medium">
            조합원 가입
          </a>
        </div>
        
        {/* 모바일 메뉴 버튼 */}
        <button class="lg:hidden text-gray-700" id="mobile-menu-btn">
          <i class="fas fa-bars text-2xl"></i>
        </button>
      </div>
    </div>
    
    {/* 모바일 메뉴 */}
    <div id="mobile-menu" class="hidden lg:hidden bg-white border-t">
      <nav class="container mx-auto px-4 py-4 space-y-2">
        <a href="/" class="block py-2 text-gray-700 hover:text-teal">HOME</a>
        
        {/* 조합 소개 */}
        <div>
          <a href="/about" class="block py-2 text-gray-700 hover:text-teal font-medium">조합 소개</a>
          <div class="pl-4 space-y-1">
            <a href="/about" class="block py-1 text-sm text-gray-600 hover:text-teal">조합 개요</a>
            <a href="/about/greeting" class="block py-1 text-sm text-gray-600 hover:text-teal">조합장 인사말</a>
            <a href="/about/organization" class="block py-1 text-sm text-gray-600 hover:text-teal">조직 및 운영구조</a>
            <a href="/about#vision" class="block py-1 text-sm text-gray-600 hover:text-teal">비전 & 미션</a>
            <a href="/about#values" class="block py-1 text-sm text-gray-600 hover:text-teal">핵심 가치</a>
            <a href="/about#location" class="block py-1 text-sm text-gray-600 hover:text-teal">오시는 길</a>
          </div>
        </div>
        
        <a href="/services" class="block py-2 text-gray-700 hover:text-teal">서비스</a>
        
        {/* 조합원 */}
        <div>
          <a href="/members" class="block py-2 text-gray-700 hover:text-teal font-medium">조합원</a>
          <div class="pl-4 space-y-1">
            <a href="/members" class="block py-1 text-sm text-gray-600 hover:text-teal">조합원 소개</a>
            <a href="/members/join" class="block py-1 text-sm text-gray-600 hover:text-teal">조합원 가입</a>
          </div>
        </div>
        
        <a href="/news" class="block py-2 text-gray-700 hover:text-teal">소식</a>
        <a href="/support" class="block py-2 text-gray-700 hover:text-teal">문의</a>
      </nav>
    </div>
  </header>
)

// 공통 컴포넌트: 푸터
const Footer = () => (
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 조합 정보 */}
        <div class="col-span-1 md:col-span-2">
          <img src="/static/images/logo.png" alt="구미디지털적층산업사업협동조합" class="h-16 mb-4" />
          <p class="text-sm mb-4">
            3D 프린팅 및 적층제조 기술을 중심으로<br />
            회원사의 상생과 지역 산업 혁신을 위해 설립된 협동조합
          </p>
          <div class="space-y-2 text-sm">
            <p><i class="fas fa-map-marker-alt w-5"></i> 경상북도 구미시 산호대로 253</p>
            <p><i class="fas fa-phone w-5"></i> 054-123-4567</p>
            <p><i class="fas fa-envelope w-5"></i> info@gumidigital.co.kr</p>
          </div>
        </div>
        
        {/* 빠른 링크 */}
        <div>
          <h3 class="text-white font-bold mb-4">빠른 링크</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/about" class="hover:text-white transition">조합 소개</a></li>
            <li><a href="/services" class="hover:text-white transition">서비스/제품</a></li>
            <li><a href="/members" class="hover:text-white transition">조합원 정보</a></li>
            <li><a href="/news" class="hover:text-white transition">소식/공지</a></li>
          </ul>
        </div>
        
        {/* 고객지원 */}
        <div>
          <h3 class="text-white font-bold mb-4">고객지원</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/support/faq" class="hover:text-white transition">자주 묻는 질문</a></li>
            <li><a href="/support/contact" class="hover:text-white transition">문의하기</a></li>
            <li><a href="/support/quote" class="hover:text-white transition">견적 요청</a></li>
            <li><a href="/resources" class="hover:text-white transition">자료실</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>&copy; 2025 구미디지털적층산업사업협동조합. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

// 메인 페이지
app.get('/', async (c) => {
  const { DB } = c.env
  
  // 최신 공지사항 3개 가져오기
  let notices = []
  try {
    const result = await DB.prepare(`
      SELECT id, category, title, created_at, views
      FROM notices
      ORDER BY is_pinned DESC, created_at DESC
      LIMIT 3
    `).all()
    notices = result.results || []
  } catch (e) {
    console.error('Database error:', e)
  }
  
  // 주요 조합원 가져오기
  let members = []
  try {
    const result = await DB.prepare(`
      SELECT id, name, logo_url, category
      FROM members
      WHERE is_featured = TRUE
      ORDER BY display_order ASC
      LIMIT 5
    `).all()
    members = result.results || []
  } catch (e) {
    console.error('Database error:', e)
  }
  
  return c.render(
    <div>
      <Header />
      
      {/* 히어로 섹션 - AKIS 스타일 */}
      <section class="relative bg-navy text-white overflow-hidden" style="height: 700px;">
        {/* 배경 이미지 */}
        <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style="background-image: url('https://page.gensparksite.com/v1/base64_upload/fda2eb52d8950c1250cdbec06b24d1e9');"
        ></div>
        {/* 어두운 오버레이 */}
        <div class="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/50"></div>
        
        <div class="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div class="max-w-2xl">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Value Partner
            </h1>
            <p class="text-lg md:text-xl mb-8 leading-relaxed">
              고객과 파트너사, 회원 기업과의<br />
              협업을 기반으로 최상의 가치를 제공하는 기업
            </p>
            <a href="/about" class="inline-block px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-navy transition">
              더 알아보기 →
            </a>
          </div>
        </div>
      </section>
      
      {/* INDUSTRY 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">INDUSTRY</h2>
            <p class="text-gray-600 text-lg">
              협동조합이 고객과 회원 기업에 제공하는 가치와 비즈니스<br />
              산업별 기술 / 서비스 분야의 디지털 혁신 모델 및 주요 레퍼런스 안내
            </p>
            <a href="/industry" class="inline-block mt-4 text-teal hover:underline">
              + VIEW MORE
            </a>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* 산업 카드 1 - IoT */}
            <div class="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" style="height: 320px;">
              <div 
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/df20553901c9762b475105ac430f6249');"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-t from-teal/90 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">IoT</h3>
                <p class="text-sm opacity-90">Internet of Things</p>
              </div>
            </div>
            
            {/* 산업 카드 2 - 3D 프린팅 */}
            <div class="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" style="height: 320px;">
              <div 
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/06e06713b22386f77560909b8570cd6b');"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-t from-purple/90 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">3D 프린팅</h3>
                <p class="text-sm opacity-90">3D Printing</p>
              </div>
            </div>
            
            {/* 산업 카드 3 - AI */}
            <div class="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" style="height: 320px;">
              <div 
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/c743825f2a9907e7bfa280f3d48e7998');"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">AI</h3>
                <p class="text-sm opacity-90">Artificial Intelligence</p>
              </div>
            </div>
            
            {/* 산업 카드 4 - 로봇 */}
            <div class="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" style="height: 320px;">
              <div 
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/9991bb70ecfdca973bf8f3c5b4ecd403');"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-t from-coral/90 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">로봇</h3>
                <p class="text-sm opacity-90">Robotics</p>
              </div>
            </div>
            
            {/* 산업 카드 5 - 빅데이터 */}
            <div class="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer" style="height: 320px;">
              <div 
                class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/7f8dbee2ffeb7b88195c73f17b8a9991');"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-t from-teal/90 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">빅데이터</h3>
                <p class="text-sm opacity-90">Big Data</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SERVICE 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">주요 사업 분야</h2>
            <p class="text-gray-600 text-lg">
              협동조합의 핵심 사업 영역과 전문 서비스를 소개합니다
            </p>
          </div>
          
          {/* 서비스 카드 그리드 - 2x2 레이아웃 */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* 1. 첨단 적층제조 기술 보급 및 R&D */}
            <div class="relative rounded-2xl p-8 border-l-4 border-teal hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
              {/* 배경 이미지 */}
              <div 
                class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/e985d0f133cca39aabb147ed71d9452d');"
              ></div>
              {/* 그라데이션 오버레이 */}
              <div class="absolute inset-0 bg-gradient-to-br from-teal/50 to-navy/50"></div>
              
              {/* 콘텐츠 */}
              <div class="relative z-10">
                <div class="flex items-start mb-6">
                  <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-cube text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white mb-2">첨단 적층제조 기술 보급 및 R&D</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-teal-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">3D 프린팅 기술 연구개발 지원</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-teal-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">최신 장비 및 기술 트렌드 공유</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-teal-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">산학연 공동 R&D 프로젝트 추진</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 2. 인력 양성 및 교육·세미나 */}
            <div class="relative rounded-2xl p-8 border-l-4 border-purple hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
              {/* 배경 이미지 */}
              <div 
                class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/02f72688e045858d8dcddfb723b006ba');"
              ></div>
              {/* 그라데이션 오버레이 */}
              <div class="absolute inset-0 bg-gradient-to-br from-purple/50 to-pink-600/50"></div>
              
              {/* 콘텐츠 */}
              <div class="relative z-10">
                <div class="flex items-start mb-6">
                  <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-graduation-cap text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white mb-2">인력 양성 및 교육·세미나</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-purple-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">적층제조 전문 기술 인력 양성</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-purple-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">정기 세미나 및 워크샵 개최</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-purple-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">산업 전문가 교류 네트워크 구축</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 3. 공동 구매, 장비 운용 및 인프라 제공 */}
            <div class="relative rounded-2xl p-8 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
              {/* 배경 이미지 */}
              <div 
                class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/1b6485fc8a9ba3ba29be7b5a52d27731');"
              ></div>
              {/* 그라데이션 오버레이 */}
              <div class="absolute inset-0 bg-gradient-to-br from-green-600/50 to-teal-700/50"></div>
              
              {/* 콘텐츠 */}
              <div class="relative z-10">
                <div class="flex items-start mb-6">
                  <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-industry text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white mb-2">공동 구매, 장비 운용 및 인프라 제공</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">원자재 및 장비 공동구매 지원</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">고가 장비 공동 활용 시스템 구축</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">테스트베드 및 공동 작업공간 제공</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 4. 정부 및 지자체 협력사업 */}
            <div class="relative rounded-2xl p-8 border-l-4 border-coral hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
              {/* 배경 이미지 */}
              <div 
                class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                style="background-image: url('https://page.gensparksite.com/v1/base64_upload/b6951dd5fc1e6e28ac54dff2aaef8362');"
              ></div>
              {/* 그라데이션 오버레이 */}
              <div class="absolute inset-0 bg-gradient-to-br from-coral/50 to-red-600/50"></div>
              
              {/* 콘텐츠 */}
              <div class="relative z-10">
                <div class="flex items-start mb-6">
                  <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-handshake text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white mb-2">정부 및 지자체 협력사업</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-orange-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">지역 산업 육성 정책 협력</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-orange-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">정부 R&D 사업 공동 참여</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-orange-300 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-white">지역 특화 산업 클러스터 구축</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEWS 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">구미 디지털적층제조산업사업협동조합 소식</h2>
            <p class="text-gray-600 text-lg">
              사업협동조합의 최신 소식을 가장 빠르게 전해드립니다
            </p>
            <a href="/news" class="inline-block mt-4 text-teal hover:underline">
              + VIEW MORE
            </a>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            {notices.length > 0 ? notices.map((notice: any, index: number) => (
              <a 
                href={`/news/${notice.id}`} 
                class={`group bg-white rounded-xl overflow-hidden border hover:shadow-xl transition ${index === 1 ? 'md:col-span-2 bg-teal text-white' : 'border-gray-200 shadow-md'}`}
              >
                <div class="p-6">
                  <div class="text-sm mb-3">
                    <span class={`${index === 1 ? 'text-white/80' : 'text-gray-500'}`}>
                      {new Date(notice.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').slice(0, -1)}
                    </span>
                  </div>
                  <h3 class={`font-bold mb-3 line-clamp-2 ${index === 1 ? 'text-2xl' : 'text-lg'} ${index === 1 ? '' : 'group-hover:text-teal'} transition`}>
                    {notice.title}
                  </h3>
                  {index === 1 && (
                    <p class="text-white/90 text-sm mb-4 line-clamp-3">
                      협동조합의 주요 소식과 업데이트를 확인하세요.
                    </p>
                  )}
                  <div class={`inline-flex items-center text-sm font-medium ${index === 1 ? 'text-white' : 'text-teal'}`}>
                    자세히 보기 <i class="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </a>
            )) : (
              <div class="col-span-4 text-center text-gray-500 py-12">
                등록된 공지사항이 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 클라이언트/파트너 섹션 */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-2xl font-bold text-gray-900 mb-8">협동조합 주요 파트너</h3>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {/* 파트너 로고 플레이스홀더 */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition flex items-center justify-center h-24">
                <div class="text-center">
                  <i class="fas fa-industry text-3xl text-gray-400 mb-2"></i>
                  <p class="text-xs text-gray-500">Partner {item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      
      <Footer />
      
      {/* Scroll to Top 버튼 */}
      <button 
        id="scroll-to-top" 
        onclick="scrollToTop()" 
        class="hidden fixed bottom-8 right-8 w-12 h-12 bg-teal text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-40"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
      
      {/* JavaScript */}
      <script src="/static/js/app.js"></script>
    </div>,
    { title: '구미디지털적층산업사업협동조합 - 디지털 제조 시대의 혁신 파트너' }
  )
})

// About 페이지
app.get('/about', (c) => {
  return c.render(
    <div>
      <Header />
      
      {/* 페이지 헤더 */}
      <section class="relative bg-navy text-white py-20">
        <div class="absolute inset-0 bg-gradient-to-r from-navy to-teal opacity-90"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">조합 소개</h1>
            <p class="text-xl opacity-90">About Us</p>
          </div>
        </div>
      </section>
      
      {/* 협동조합 소개 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <img 
                  src="https://cdn1.genspark.ai/user-upload-image/5_generated/a57703b8-97d7-4c8d-b6fb-9c660027e4df.jpeg" 
                  alt="협동조합" 
                  class="rounded-lg shadow-xl"
                />
              </div>
              <div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  구미디지털적층산업<br />사업협동조합
                </h2>
                <p class="text-gray-600 text-lg leading-relaxed mb-6">
                  구미디지털적층산업사업협동조합은 3D 프린팅 등 적층제조기술을 중심으로 
                  회원사의 상생과 지역 산업 혁신을 위해 설립된 협동조합입니다.
                </p>
                <p class="text-gray-600 text-lg leading-relaxed mb-6">
                  디지털 제조 시대를 선도하는 혁신적인 기술력과 네트워크를 바탕으로 
                  회원 기업의 성장과 지역 경제 발전에 기여하고 있습니다.
                </p>
                <div class="flex flex-wrap gap-4">
                  <div class="bg-teal/10 px-6 py-3 rounded-lg">
                    <div class="text-2xl font-bold text-teal mb-1">2024</div>
                    <div class="text-sm text-gray-600">설립연도</div>
                  </div>
                  <div class="bg-teal/10 px-6 py-3 rounded-lg">
                    <div class="text-2xl font-bold text-teal mb-1">5+</div>
                    <div class="text-sm text-gray-600">조합원 기업</div>
                  </div>
                  <div class="bg-teal/10 px-6 py-3 rounded-lg">
                    <div class="text-2xl font-bold text-teal mb-1">100+</div>
                    <div class="text-sm text-gray-600">완료 프로젝트</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 비전 & 미션 */}
      <section id="vision" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">비전 & 미션</h2>
              <p class="text-gray-600 text-lg">협동조합이 지향하는 가치와 목표</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 비전 */}
              <div class="bg-white rounded-xl p-8 shadow-lg">
                <div class="w-16 h-16 bg-teal rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i class="fas fa-eye text-3xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-center mb-4 text-gray-900">비전</h3>
                <p class="text-gray-600 text-center leading-relaxed">
                  디지털 제조 혁신을 선도하는<br />
                  글로벌 적층제조 전문 협동조합
                </p>
              </div>
              
              {/* 미션 */}
              <div class="bg-white rounded-xl p-8 shadow-lg">
                <div class="w-16 h-16 bg-navy rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i class="fas fa-rocket text-3xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-center mb-4 text-gray-900">미션</h3>
                <p class="text-gray-600 text-center leading-relaxed">
                  회원 기업의 기술 경쟁력 강화와<br />
                  지속 가능한 상생 발전 생태계 구축
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 핵심 가치 */}
      <section id="values" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">핵심 가치</h2>
              <p class="text-gray-600 text-lg">협동조합이 추구하는 4가지 핵심 가치</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 혁신 */}
              <div class="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal hover:shadow-lg transition">
                <div class="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-lightbulb text-3xl text-teal"></i>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">혁신</h3>
                <p class="text-gray-600 text-sm">
                  끊임없는 기술 혁신으로<br />
                  미래를 선도합니다
                </p>
              </div>
              
              {/* 협력 */}
              <div class="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal hover:shadow-lg transition">
                <div class="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-handshake text-3xl text-navy"></i>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">협력</h3>
                <p class="text-gray-600 text-sm">
                  상호 협력과 신뢰를<br />
                  바탕으로 성장합니다
                </p>
              </div>
              
              {/* 품질 */}
              <div class="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal hover:shadow-lg transition">
                <div class="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-award text-3xl text-purple"></i>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">품질</h3>
                <p class="text-gray-600 text-sm">
                  최고의 품질로<br />
                  고객 만족을 실현합니다
                </p>
              </div>
              
              {/* 지속가능성 */}
              <div class="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal hover:shadow-lg transition">
                <div class="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-leaf text-3xl text-coral"></i>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">지속가능성</h3>
                <p class="text-gray-600 text-sm">
                  환경과 사회를 고려한<br />
                  지속 가능한 발전
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 주요 사업 분야 */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">주요 사업 분야</h2>
              <p class="text-gray-600 text-lg">협동조합의 핵심 사업 영역과 전문 서비스를 소개합니다</p>
            </div>
            
            {/* 서비스 카드 그리드 - 2x2 레이아웃 */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 1. 첨단 적층제조 기술 보급 및 R&D */}
              <div class="relative rounded-2xl p-8 border-l-4 border-teal hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
                {/* 배경 이미지 */}
                <div 
                  class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                  style="background-image: url('https://page.gensparksite.com/v1/base64_upload/e985d0f133cca39aabb147ed71d9452d');"
                ></div>
                {/* 그라데이션 오버레이 */}
                <div class="absolute inset-0 bg-gradient-to-br from-teal/50 to-navy/50"></div>
                
                {/* 콘텐츠 */}
                <div class="relative z-10">
                  <div class="flex items-start mb-6">
                    <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                      <i class="fas fa-cube text-3xl"></i>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-white mb-2">첨단 적층제조 기술 보급 및 R&D</h3>
                    </div>
                  </div>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-teal-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">3D 프린팅 기술 연구개발 지원</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-teal-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">최신 장비 및 기술 트렌드 공유</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-teal-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">산학연 공동 R&D 프로젝트 추진</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* 2. 인력 양성 및 교육·세미나 */}
              <div class="relative rounded-2xl p-8 border-l-4 border-purple hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
                {/* 배경 이미지 */}
                <div 
                  class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                  style="background-image: url('https://page.gensparksite.com/v1/base64_upload/02f72688e045858d8dcddfb723b006ba');"
                ></div>
                {/* 그라데이션 오버레이 */}
                <div class="absolute inset-0 bg-gradient-to-br from-purple/50 to-pink-600/50"></div>
                
                {/* 콘텐츠 */}
                <div class="relative z-10">
                  <div class="flex items-start mb-6">
                    <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                      <i class="fas fa-graduation-cap text-3xl"></i>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-white mb-2">인력 양성 및 교육·세미나</h3>
                    </div>
                  </div>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-purple-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">적층제조 전문 기술 인력 양성</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-purple-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">정기 세미나 및 워크샵 개최</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-purple-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">산업 전문가 교류 네트워크 구축</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* 3. 공동 구매, 장비 운용 및 인프라 제공 */}
              <div class="relative rounded-2xl p-8 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
                {/* 배경 이미지 */}
                <div 
                  class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                  style="background-image: url('https://page.gensparksite.com/v1/base64_upload/1b6485fc8a9ba3ba29be7b5a52d27731');"
                ></div>
                {/* 그라데이션 오버레이 */}
                <div class="absolute inset-0 bg-gradient-to-br from-green-600/50 to-teal-700/50"></div>
                
                {/* 콘텐츠 */}
                <div class="relative z-10">
                  <div class="flex items-start mb-6">
                    <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                      <i class="fas fa-industry text-3xl"></i>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-white mb-2">공동 구매, 장비 운용 및 인프라 제공</h3>
                    </div>
                  </div>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-green-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">원자재 및 장비 공동구매 지원</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-green-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">고가 장비 공동 활용 시스템 구축</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-green-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">테스트베드 및 공동 작업공간 제공</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* 4. 정부 및 지자체 협력사업 */}
              <div class="relative rounded-2xl p-8 border-l-4 border-coral hover:shadow-xl transition-all duration-300 overflow-hidden group" style="min-height: 320px;">
                {/* 배경 이미지 */}
                <div 
                  class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                  style="background-image: url('https://page.gensparksite.com/v1/base64_upload/b6951dd5fc1e6e28ac54dff2aaef8362');"
                ></div>
                {/* 그라데이션 오버레이 */}
                <div class="absolute inset-0 bg-gradient-to-br from-coral/50 to-red-600/50"></div>
                
                {/* 콘텐츠 */}
                <div class="relative z-10">
                  <div class="flex items-start mb-6">
                    <div class="bg-white/20 backdrop-blur-sm text-white rounded-lg p-3 mr-4">
                      <i class="fas fa-handshake text-3xl"></i>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-white mb-2">정부 및 지자체 협력사업</h3>
                    </div>
                  </div>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-orange-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">지역 산업 육성 정책 협력</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-orange-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">정부 R&D 사업 공동 참여</span>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-check-circle text-orange-300 mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-white">지역 특화 산업 클러스터 구축</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 오시는 길 */}
      <section id="location" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">오시는 길</h2>
              <p class="text-gray-600 text-lg">협동조합 방문을 환영합니다</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 지도 */}
              <div class="bg-gray-200 rounded-xl overflow-hidden h-96 flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <i class="fas fa-map-marked-alt text-6xl mb-4"></i>
                  <p>지도 영역</p>
                  <p class="text-sm">(추후 Google Maps 연동)</p>
                </div>
              </div>
              
              {/* 주소 및 연락처 */}
              <div>
                <div class="space-y-6">
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-teal rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <i class="fas fa-map-marker-alt text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900 mb-2">주소</h3>
                      <p class="text-gray-600">경상북도 구미시 산호대로 253</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <i class="fas fa-phone text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900 mb-2">전화</h3>
                      <p class="text-gray-600">054-123-4567</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-purple rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <i class="fas fa-envelope text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900 mb-2">이메일</h3>
                      <p class="text-gray-600">info@gumidigital.co.kr</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-coral rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <i class="fas fa-clock text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900 mb-2">운영시간</h3>
                      <p class="text-gray-600">평일 09:00 - 18:00</p>
                      <p class="text-gray-500 text-sm">주말 및 공휴일 휴무</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Scroll to Top 버튼 */}
      <button 
        id="scroll-to-top" 
        onclick="scrollToTop()" 
        class="hidden fixed bottom-8 right-8 w-12 h-12 bg-teal text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-40"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
      
      {/* JavaScript */}
      <script src="/static/js/app.js"></script>
    </div>,
    { title: '조합 소개 - 구미디지털적층산업사업협동조합' }
  )
})

// 조합장 인사말 페이지
app.get('/about/greeting', (c) => {
  return c.render(
    <div>
      <Header />
      
      {/* 페이지 헤더 */}
      <section class="relative bg-navy text-white py-20">
        <div class="absolute inset-0 bg-gradient-to-r from-navy to-teal opacity-90"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">조합장 인사말</h1>
            <p class="text-xl opacity-90">Chairman's Greeting</p>
          </div>
        </div>
      </section>
      
      {/* 조합장 인사말 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* 왼쪽: 조합장 사진 */}
                <div class="lg:col-span-2 bg-gradient-to-br from-navy to-teal p-8 lg:p-12 flex flex-col items-center justify-center text-white">
                  <div class="w-48 h-48 rounded-full bg-white/20 mb-6 flex items-center justify-center overflow-hidden">
                    <i class="fas fa-user text-8xl text-white/60"></i>
                  </div>
                  <h3 class="text-2xl font-bold mb-2">김한수</h3>
                  <p class="text-lg opacity-90 mb-4">조합장</p>
                  <div class="text-sm opacity-75 text-center">
                    <p>구미디지털적층산업</p>
                    <p>사업협동조합</p>
                  </div>
                </div>
                
                {/* 오른쪽: 인사말 내용 */}
                <div class="lg:col-span-3 p-8 lg:p-12">
                  <div class="space-y-6 text-gray-700 leading-relaxed">
                    <p class="text-xl font-medium text-gray-900 mb-8">
                      안녕하십니까,<br />
                      구미디지털적층산업사업협동조합 조합장 <span class="text-teal">김한수</span>입니다.
                    </p>
                    
                    <p>
                      우리 협동조합 홈페이지를 방문해 주신 여러분께 진심으로 감사의 말씀을 드립니다.
                    </p>
                    
                    <p>
                      구미디지털적층산업사업협동조합은 <strong class="text-teal">3D 프린팅 및 적층제조 기술</strong>을 
                      중심으로 회원사의 상생과 지역 산업 혁신을 위해 설립되었습니다. 
                      급변하는 제조 환경 속에서 디지털 전환은 선택이 아닌 필수가 되었으며, 
                      우리 협동조합은 이러한 변화의 최전선에서 회원 기업들과 함께 성장하고 있습니다.
                    </p>
                    
                    <p>
                      우리는 단순히 기술을 공유하는 것을 넘어, <strong class="text-navy">협력과 상생의 가치</strong>를 
                      바탕으로 회원 기업 간의 시너지를 창출하고 있습니다. 
                      각 기업의 강점을 결합하여 더 큰 경쟁력을 만들어내고, 
                      함께 성장하는 것이 우리 협동조합의 핵심 철학입니다.
                    </p>
                    
                    <div class="bg-gray-50 p-6 rounded-lg my-8">
                      <p class="font-semibold text-gray-900 mb-4">
                        특히, 우리는 다음과 같은 가치를 최우선으로 추구합니다:
                      </p>
                      
                      <ul class="list-none space-y-3">
                        <li class="flex items-start">
                          <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                          <span><strong>혁신적인 기술 개발</strong>과 적용을 통한 산업 경쟁력 강화</span>
                        </li>
                        <li class="flex items-start">
                          <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                          <span><strong>회원 기업 간 협력</strong>을 통한 공동 성장 실현</span>
                        </li>
                        <li class="flex items-start">
                          <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                          <span><strong>지역 사회 발전</strong>에 기여하는 사회적 책임 이행</span>
                        </li>
                        <li class="flex items-start">
                          <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                          <span><strong>지속 가능한 제조 환경</strong> 조성을 통한 미래 가치 창출</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p>
                      우리 협동조합은 앞으로도 회원 기업의 든든한 파트너로서, 
                      그리고 지역 산업의 혁신을 이끄는 선도자로서 최선을 다하겠습니다. 
                      여러분의 많은 관심과 참여를 부탁드립니다.
                    </p>
                    
                    <div class="pt-8 border-t border-gray-200 mt-10">
                      <p class="text-right">
                        <span class="text-gray-600 text-lg">감사합니다.</span><br />
                        <span class="font-bold text-gray-900 text-lg mt-2 inline-block">구미디지털적층산업사업협동조합 조합장</span><br />
                        <span class="font-bold text-teal text-3xl mt-2 inline-block">김한수</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 조합 소개로 돌아가기 */}
      <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto text-center">
            <a 
              href="/about" 
              class="inline-flex items-center px-8 py-4 bg-teal text-white rounded-md hover:bg-opacity-90 transition font-medium text-lg"
            >
              <i class="fas fa-arrow-left mr-3"></i>
              조합 소개로 돌아가기
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Scroll to Top 버튼 */}
      <button 
        id="scroll-to-top" 
        onclick="scrollToTop()" 
        class="hidden fixed bottom-8 right-8 w-12 h-12 bg-teal text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-40"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
      
      {/* JavaScript */}
      <script src="/static/js/app.js"></script>
    </div>,
    { title: '조합장 인사말 - 구미디지털적층산업사업협동조합' }
  )
})

// 조직 및 운영구조 페이지
app.get('/about/organization', (c) => {
  return c.render(
    <div>
      <Header />
      
      {/* 페이지 헤더 */}
      <section class="relative bg-navy text-white py-20">
        <div class="absolute inset-0 bg-gradient-to-r from-navy to-teal opacity-90"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">조직 및 운영구조</h1>
            <p class="text-xl opacity-90">Organization Structure</p>
          </div>
        </div>
      </section>
      
      {/* 조직도 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">주요조직 구성 및 역할</h2>
              <p class="text-gray-600 text-lg">협동조합의 체계적인 운영 구조를 소개합니다</p>
            </div>
            
            {/* 조직도 다이어그램 */}
            <div class="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200">
              {/* 로고 및 타이틀 */}
              <div class="text-center mb-12">
                <div class="inline-flex items-center justify-center w-24 h-24 bg-navy rounded-full mb-4">
                  <div class="text-white">
                    <div class="text-sm font-bold">조직 및 운영 구조</div>
                    <div class="text-xs">Organization</div>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mt-4">주요조직 구성 및 역할</h3>
              </div>
              
              {/* 주요 조직 (상단 3개) */}
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* 이사회 */}
                <div class="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 text-center">
                  <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-users text-2xl text-white"></i>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">이사회</h4>
                  <p class="text-sm text-gray-600">조합의 주요 정책심의 결정,<br/>사업 계획 수립</p>
                </div>
                
                {/* 총회 */}
                <div class="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 text-center">
                  <div class="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-user-friends text-2xl text-white"></i>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">총회</h4>
                  <p class="text-sm text-gray-600">조합의 최고 의사결정기구로<br/>조합원 전체로 구성</p>
                </div>
                
                {/* 감사 */}
                <div class="bg-green-50 rounded-xl p-6 border-2 border-green-200 text-center">
                  <div class="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-search text-2xl text-white"></i>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">감사</h4>
                  <p class="text-sm text-gray-600">조합의 업무 집행상황,<br/>재산상태, 장부 등 검사</p>
                </div>
              </div>
              
              {/* 연결선 */}
              <div class="flex justify-center mb-8">
                <div class="w-px h-12 bg-gray-300"></div>
              </div>
              
              {/* 이사장 (중앙) */}
              <div class="max-w-md mx-auto mb-8">
                <div class="bg-orange-50 rounded-xl p-6 border-2 border-orange-200 text-center">
                  <div class="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-user-tie text-2xl text-white"></i>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">이사장</h4>
                  <p class="text-sm text-gray-600">조합을 대표하고 업무를 총괄,<br/>이사의 의장</p>
                </div>
              </div>
              
              {/* 연결선 */}
              <div class="flex justify-center mb-8">
                <div class="w-px h-12 bg-gray-300"></div>
              </div>
              
              {/* 실행조직 및 기능 타이틀 */}
              <div class="text-center mb-6">
                <h3 class="text-xl font-bold text-teal">실행조직 및 기능</h3>
              </div>
              
              {/* 실행조직 (하단 4개) */}
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* 운영위원회 */}
                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-navy text-center">
                  <div class="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i class="fas fa-cog text-xl text-navy"></i>
                  </div>
                  <h5 class="text-sm font-bold text-gray-900 mb-2">운영위원회</h5>
                  <p class="text-xs text-gray-600">사업 운영 및 실무 전반을 위한 의사결정기구</p>
                </div>
                
                {/* 기술전문분과 */}
                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-teal text-center">
                  <div class="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i class="fas fa-laptop-code text-xl text-teal"></i>
                  </div>
                  <h5 class="text-sm font-bold text-gray-900 mb-2">기술전문분과</h5>
                  <p class="text-xs text-gray-600">3D프린팅 및 적층제조 관련 기술개발 및 자문</p>
                </div>
                
                {/* 교육연구분과 */}
                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-purple text-center">
                  <div class="w-12 h-12 bg-purple/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i class="fas fa-graduation-cap text-xl text-purple"></i>
                  </div>
                  <h5 class="text-sm font-bold text-gray-900 mb-2">교육연구분과</h5>
                  <p class="text-xs text-gray-600">교육 프로그램 개발 및 인력양성 업무</p>
                </div>
                
                {/* 사무국 */}
                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-coral text-center">
                  <div class="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i class="fas fa-building text-xl text-coral"></i>
                  </div>
                  <h5 class="text-sm font-bold text-gray-900 mb-2">사무국</h5>
                  <p class="text-xs text-gray-600">행정, 회계, 대외협력, 회원관리 등 실무 지원</p>
                </div>
              </div>
            </div>
                                
            {/* 실행조직 및 기능 */}
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-teal to-navy text-white px-8 py-6">
                <h3 class="text-2xl font-bold">실행조직 및 기능</h3>
              </div>
              
              <div class="divide-y divide-gray-200">
                {/* 운영위원회 */}
                <div class="p-6 hover:bg-gray-50 transition">
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i class="fas fa-cog text-2xl text-navy"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-xl font-bold text-gray-900 mb-2">운영위원회</h4>
                      <p class="text-gray-600">사업 운영 및 실무 전반을 위한 의사결정기구</p>
                    </div>
                  </div>
                </div>
                
                {/* 기술전문분과 */}
                <div class="p-6 hover:bg-gray-50 transition">
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i class="fas fa-laptop-code text-2xl text-teal"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-xl font-bold text-gray-900 mb-2">기술전문분과</h4>
                      <p class="text-gray-600">3D프린팅 및 적층제조 관련 기술개발 및 자문</p>
                    </div>
                  </div>
                </div>
                
                {/* 교육연구분과 */}
                <div class="p-6 hover:bg-gray-50 transition">
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-purple/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i class="fas fa-graduation-cap text-2xl text-purple"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-xl font-bold text-gray-900 mb-2">교육연구분과</h4>
                      <p class="text-gray-600">교육 프로그램 개발 및 인력양성 업무</p>
                    </div>
                  </div>
                </div>
                
                {/* 사무국 */}
                <div class="p-6 hover:bg-gray-50 transition">
                  <div class="flex items-start">
                    <div class="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i class="fas fa-building text-2xl text-coral"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-xl font-bold text-gray-900 mb-2">사무국</h4>
                      <p class="text-gray-600">행정, 회계, 대외협력, 회원관리 등 실무 지원</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 운영 방침 */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">운영 방침</h2>
              <p class="text-gray-600 text-lg">투명하고 효율적인 조합 운영을 위한 핵심 원칙</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 투명성 */}
              <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition text-center">
                <div class="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-eye text-3xl text-teal"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">투명성</h3>
                <p class="text-gray-600">
                  모든 의사결정과 운영 과정을<br />
                  투명하게 공개합니다
                </p>
              </div>
              
              {/* 민주성 */}
              <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition text-center">
                <div class="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-vote-yea text-3xl text-navy"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">민주성</h3>
                <p class="text-gray-600">
                  조합원의 의견을 존중하고<br />
                  민주적으로 운영합니다
                </p>
              </div>
              
              {/* 효율성 */}
              <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition text-center">
                <div class="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-chart-line text-3xl text-purple"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">효율성</h3>
                <p class="text-gray-600">
                  체계적인 시스템으로<br />
                  효율적으로 운영합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 조합 소개로 돌아가기 */}
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto text-center">
            <a 
              href="/about" 
              class="inline-flex items-center px-8 py-4 bg-teal text-white rounded-md hover:bg-opacity-90 transition font-medium text-lg"
            >
              <i class="fas fa-arrow-left mr-3"></i>
              조합 소개로 돌아가기
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Scroll to Top 버튼 */}
      <button 
        id="scroll-to-top" 
        onclick="scrollToTop()" 
        class="hidden fixed bottom-8 right-8 w-12 h-12 bg-teal text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-40"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
      
      {/* JavaScript */}
      <script src="/static/js/app.js"></script>
    </div>,
    { title: '조직 및 운영구조 - 구미디지털적층산업사업협동조합' }
  )
})

// 소식/공지사항 페이지
app.get('/news', async (c) => {
  const { DB } = c.env
  
  // 모든 공지사항 가져오기
  let notices = []
  try {
    const result = await DB.prepare(`
      SELECT id, category, title, content, author, created_at, views, is_pinned
      FROM notices
      ORDER BY is_pinned DESC, created_at DESC
    `).all()
    notices = result.results || []
  } catch (e) {
    console.error('Database error:', e)
  }
  
  return c.render(
    <div>
      <Header />
      
      {/* Hero Section */}
      <section class="relative bg-navy text-white py-20">
        <div class="absolute inset-0 bg-gradient-to-r from-navy to-teal opacity-90"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">소식 & 공지사항</h1>
            <p class="text-xl opacity-90">News & Announcements</p>
          </div>
        </div>
      </section>
      
      {/* 카테고리 필터 */}
      <section class="py-8 bg-white border-b">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center gap-4">
            <button class="px-6 py-2 rounded-full bg-teal text-white font-medium transition hover:bg-opacity-90">
              전체
            </button>
            <button class="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium transition hover:bg-gray-200">
              공지사항
            </button>
            <button class="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium transition hover:bg-gray-200">
              보도자료
            </button>
            <button class="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium transition hover:bg-gray-200">
              행사
            </button>
            <button class="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium transition hover:bg-gray-200">
              수상
            </button>
          </div>
        </div>
      </section>
      
      {/* 공지사항 목록 */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            {notices.length > 0 ? (
              <div class="space-y-4">
                {notices.map((notice) => (
                  <a 
                    href={`/news/${notice.id}`}
                    class="block bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                          {notice.is_pinned && (
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-coral text-white">
                              <i class="fas fa-thumbtack mr-1"></i>
                              공지
                            </span>
                          )}
                          <span class={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            notice.category === '공지사항' ? 'bg-blue-100 text-blue-800' :
                            notice.category === '보도자료' ? 'bg-green-100 text-green-800' :
                            notice.category === '행사' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {notice.category}
                          </span>
                        </div>
                        
                        <h3 class="text-xl font-bold text-gray-900 mb-2 hover:text-teal transition">
                          {notice.title}
                        </h3>
                        
                        <p class="text-gray-600 text-sm line-clamp-2 mb-3">
                          {notice.content}
                        </p>
                        
                        <div class="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            <i class="far fa-calendar mr-1"></i>
                            {new Date(notice.created_at).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }).replace(/\./g, '.').slice(0, -1)}
                          </span>
                          {notice.author && (
                            <span>
                              <i class="far fa-user mr-1"></i>
                              {notice.author}
                            </span>
                          )}
                          <span>
                            <i class="far fa-eye mr-1"></i>
                            {notice.views}
                          </span>
                        </div>
                      </div>
                      
                      <div class="ml-4 text-gray-400">
                        <i class="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div class="text-center py-20">
                <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">등록된 공지사항이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Scroll to Top 버튼 */}
      <button 
        id="scroll-to-top" 
        onclick="scrollToTop()" 
        class="hidden fixed bottom-8 right-8 w-12 h-12 bg-teal text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-40"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
      
      <script src="/static/js/app.js"></script>
    </div>,
    { title: '소식 & 공지사항 - 구미디지털적층산업사업협동조합' }
  )
})

// 공지사항 상세 페이지
app.get('/news/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  try {
    // 공지사항 조회
    const noticeResult = await DB.prepare(`
      SELECT id, category, title, content, author, created_at, updated_at, views, is_pinned
      FROM notices
      WHERE id = ?
    `).bind(id).first()
    
    if (!noticeResult) {
      return c.render(
        <div>
          <Header />
          <section class="py-20 bg-white">
            <div class="container mx-auto px-4 text-center">
              <i class="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
              <h2 class="text-2xl font-bold text-gray-900 mb-4">공지사항을 찾을 수 없습니다</h2>
              <p class="text-gray-600 mb-8">요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
              <a href="/news" class="inline-block px-8 py-3 bg-teal text-white rounded-md hover:bg-opacity-90 transition">
                목록으로 돌아가기
              </a>
            </div>
          </section>
          <Footer />
          <script src="/static/js/app.js"></script>
        </div>,
        { title: '공지사항을 찾을 수 없습니다' }
      )
    }
    
    // 조회수 증가
    await DB.prepare(`
      UPDATE notices
      SET views = views + 1
      WHERE id = ?
    `).bind(id).run()
    
    // 이전 공지사항 가져오기 (더 오래된 글)
    const prevResult = await DB.prepare(`
      SELECT id, title
      FROM notices
      WHERE created_at < (SELECT created_at FROM notices WHERE id = ?)
      ORDER BY created_at DESC
      LIMIT 1
    `).bind(id).first()
    
    // 다음 공지사항 가져오기 (더 최근 글)
    const nextResult = await DB.prepare(`
      SELECT id, title
      FROM notices
      WHERE created_at > (SELECT created_at FROM notices WHERE id = ?)
      ORDER BY created_at ASC
      LIMIT 1
    `).bind(id).first()
    
    return c.render(
      <div>
        <Header />
        
        {/* Hero Section */}
        <section class="relative bg-navy text-white py-16">
          <div class="absolute inset-0 bg-gradient-to-r from-navy to-teal opacity-90"></div>
          <div class="container mx-auto px-4 relative z-10">
            <div class="max-w-4xl mx-auto">
              <div class="flex items-center gap-3 mb-4">
                {noticeResult.is_pinned && (
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-coral text-white">
                    <i class="fas fa-thumbtack mr-1"></i>
                    공지
                  </span>
                )}
                <span class={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  noticeResult.category === '공지사항' ? 'bg-blue-500 text-white' :
                  noticeResult.category === '보도자료' ? 'bg-green-500 text-white' :
                  noticeResult.category === '행사' ? 'bg-purple-500 text-white' :
                  'bg-orange-500 text-white'
                }`}>
                  {noticeResult.category}
                </span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold mb-4">{noticeResult.title}</h1>
              <div class="flex flex-wrap items-center gap-4 text-sm opacity-90">
                <span>
                  <i class="far fa-calendar mr-2"></i>
                  {new Date(noticeResult.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {noticeResult.author && (
                  <span>
                    <i class="far fa-user mr-2"></i>
                    {noticeResult.author}
                  </span>
                )}
                <span>
                  <i class="far fa-eye mr-2"></i>
                  {noticeResult.views + 1}
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* 본문 내용 */}
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
              <div class="prose prose-lg max-w-none">
                <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {noticeResult.content}
                  </div>
                  
                  {noticeResult.updated_at && noticeResult.updated_at !== noticeResult.created_at && (
                    <div class="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
                      <i class="fas fa-pencil-alt mr-2"></i>
                      최종 수정일: {new Date(noticeResult.updated_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 이전/다음 글 네비게이션 */}
        <section class="py-8 bg-gray-50 border-t border-b">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 이전 글 */}
                {prevResult ? (
                  <a 
                    href={`/news/${prevResult.id}`}
                    class="group bg-white p-4 rounded-lg border border-gray-200 hover:border-teal hover:shadow-md transition"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-teal group-hover:text-white transition">
                        <i class="fas fa-chevron-left"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs text-gray-500 mb-1">이전 글</div>
                        <div class="text-sm font-medium text-gray-900 truncate group-hover:text-teal transition">
                          {prevResult.title}
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div class="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        <i class="fas fa-chevron-left"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-xs text-gray-400 mb-1">이전 글</div>
                        <div class="text-sm text-gray-400">이전 글이 없습니다</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 다음 글 */}
                {nextResult ? (
                  <a 
                    href={`/news/${nextResult.id}`}
                    class="group bg-white p-4 rounded-lg border border-gray-200 hover:border-teal hover:shadow-md transition"
                  >
                    <div class="flex items-center gap-3">
                      <div class="flex-1 min-w-0 text-right">
                        <div class="text-xs text-gray-500 mb-1">다음 글</div>
                        <div class="text-sm font-medium text-gray-900 truncate group-hover:text-teal transition">
                          {nextResult.title}
                        </div>
                      </div>
                      <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-teal group-hover:text-white transition">
                        <i class="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div class="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-3">
                      <div class="flex-1 text-right">
                        <div class="text-xs text-gray-400 mb-1">다음 글</div>
                        <div class="text-sm text-gray-400">다음 글이 없습니다</div>
                      </div>
                      <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        <i class="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* 목록으로 돌아가기 */}
        <section class="py-12 bg-white">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
              <a 
                href="/news" 
                class="inline-flex items-center px-8 py-4 bg-teal text-white rounded-md hover:bg-opacity-90 transition font-medium text-lg"
              >
                <i class="fas fa-list mr-3"></i>
                목록으로 돌아가기
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
        
        {/* Scroll to Top 버튼 */}
        <button 
          id="scroll-to-top" 
          onclick="scrollToTop()" 
          class="hidden fixed bottom-8 right-8 w-12 h-12 bg-teal text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-40"
        >
          <i class="fas fa-arrow-up"></i>
        </button>
        
        <script src="/static/js/app.js"></script>
      </div>,
      { title: `${noticeResult.title} - 구미디지털적층산업사업협동조합` }
    )
  } catch (e) {
    console.error('Database error:', e)
    return c.render(
      <div>
        <Header />
        <section class="py-20 bg-white">
          <div class="container mx-auto px-4 text-center">
            <i class="fas fa-exclamation-circle text-6xl text-red-300 mb-4"></i>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">오류가 발생했습니다</h2>
            <p class="text-gray-600 mb-8">공지사항을 불러오는 중 문제가 발생했습니다.</p>
            <a href="/news" class="inline-block px-8 py-3 bg-teal text-white rounded-md hover:bg-opacity-90 transition">
              목록으로 돌아가기
            </a>
          </div>
        </section>
        <Footer />
        <script src="/static/js/app.js"></script>
      </div>,
      { title: '오류 발생' }
    )
  }
})

// API Routes
// 조합원 가입 안내 페이지
app.get('/members/join', (c) => {
  return c.render(
    <div>
      <Header />
      
      {/* 페이지 헤더 */}
      <section class="relative bg-gradient-to-br from-navy via-teal to-purple text-white py-24">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <div class="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span class="text-sm font-semibold">Membership</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6">조합원 자격 및 가입안내</h1>
            <p class="text-xl opacity-90 mb-8">구미디지털적층산업사업협동조합과 함께 성장하세요</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#qualification" class="px-8 py-4 bg-white text-navy rounded-lg hover:bg-opacity-90 transition font-bold shadow-lg">
                가입자격 확인
              </a>
              <a href="#benefits" class="px-8 py-4 bg-teal/20 backdrop-blur-sm border-2 border-white text-white rounded-lg hover:bg-white hover:text-navy transition font-bold">
                가입혜택 보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 가입자격 섹션 */}
      <section id="qualification" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <div class="inline-block bg-teal/10 rounded-full px-6 py-2 mb-4">
                <span class="text-teal font-bold">Qualification</span>
              </div>
              <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">가입자격</h2>
              <p class="text-gray-600 text-lg">다음 조건 중 하나 이상을 충족하시는 분은 조합원 가입이 가능합니다</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 자격 1 */}
              <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-xl transition group">
                <div class="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <i class="fas fa-industry text-2xl text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">적층제조(3D 프린팅) 관련 기업</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  3D 프린팅 및 적층제조 기술을 활용하는 제조 기업
                </p>
              </div>

              {/* 자격 2 */}
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-xl transition group">
                <div class="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <i class="fas fa-desktop text-2xl text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">디지털 제조 기술 보유 기업</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  디지털 제조 기술 및 솔루션을 보유한 기업
                </p>
              </div>

              {/* 자격 3 */}
              <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200 hover:shadow-xl transition group">
                <div class="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <i class="fas fa-cubes text-2xl text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">첨단 소재 및 부품 제조 기업</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  적층제조에 사용되는 첨단 소재 및 부품을 제조하는 기업
                </p>
              </div>

              {/* 자격 4 */}
              <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200 hover:shadow-xl transition group">
                <div class="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <i class="fas fa-tools text-2xl text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">제조 솔루션 서비스 제공 기관</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  제조 관련 솔루션 및 서비스를 제공하는 기관
                </p>
              </div>

              {/* 자격 5 */}
              <div class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border-2 border-indigo-200 hover:shadow-xl transition group">
                <div class="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <i class="fas fa-flask text-2xl text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">관련 연구기관 및 대학교</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  적층제조 및 디지털 제조 관련 연구를 수행하는 기관
                </p>
              </div>

              {/* 자격 6 - 강조 */}
              <div class="bg-gradient-to-br from-teal to-navy text-white rounded-2xl p-8 border-2 border-teal hover:shadow-2xl transition group">
                <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <i class="fas fa-handshake text-2xl text-white"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">사업 참여 및 이익 분배</h3>
                <p class="text-sm leading-relaxed opacity-90">
                  조합 사업에 참여하고 이익을 분배받을 의향이 있는 모든 기업 및 기관
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 가입절차 섹션 */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <div class="inline-block bg-navy/10 rounded-full px-6 py-2 mb-4">
                <span class="text-navy font-bold">Process</span>
              </div>
              <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">가입절차</h2>
              <p class="text-gray-600 text-lg">간편한 4단계 절차로 조합원이 되실 수 있습니다</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div class="relative">
                <div class="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition h-full border-t-4 border-teal">
                  <div class="w-16 h-16 bg-teal text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    1
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">신청서 제출</h3>
                  <p class="text-gray-600 text-sm">
                    가입신청서 및 관련서류 제출
                  </p>
                </div>
                <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <i class="fas fa-arrow-right text-3xl text-teal"></i>
                </div>
              </div>

              {/* Step 2 */}
              <div class="relative">
                <div class="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition h-full border-t-4 border-navy">
                  <div class="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    2
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">산학연 협력 강화</h3>
                  <p class="text-gray-600 text-sm">
                    기술 개발 및 인재 양성
                  </p>
                </div>
                <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <i class="fas fa-arrow-right text-3xl text-navy"></i>
                </div>
              </div>

              {/* Step 3 */}
              <div class="relative">
                <div class="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition h-full border-t-4 border-purple">
                  <div class="w-16 h-16 bg-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    3
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">글로벌 시장 진출</h3>
                  <p class="text-gray-600 text-sm">
                    국제 경쟁력 확보 및 시장 확대
                  </p>
                </div>
                <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <i class="fas fa-arrow-right text-3xl text-purple"></i>
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <div class="bg-gradient-to-br from-teal to-navy text-white rounded-2xl p-8 text-center hover:shadow-2xl transition h-full">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    <i class="fas fa-check"></i>
                  </div>
                  <h3 class="text-xl font-bold mb-3">가입 완료</h3>
                  <p class="text-sm opacity-90">
                    조합원 혜택 이용 시작
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 조합원 권리와 의무 섹션 */}
      <section id="benefits" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <div class="inline-block bg-purple/10 rounded-full px-6 py-2 mb-4">
                <span class="text-purple font-bold">Rights & Duties</span>
              </div>
              <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">조합원 권리와 의무</h2>
              <p class="text-gray-600 text-lg">조합원으로서 누리는 권리와 지켜야 할 의무를 안내합니다</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 권리 */}
              <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border-2 border-blue-200 hover:shadow-2xl transition">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                    <i class="fas fa-crown text-3xl text-white"></i>
                  </div>
                  <h3 class="text-3xl font-bold text-gray-900">권리</h3>
                </div>
                
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">조합 총회 참석 및 의결권 행사</h4>
                      <p class="text-gray-600 text-sm">조합의 주요 의사결정에 직접 참여</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">조합의 공동시설 및 장비 이용</h4>
                      <p class="text-gray-600 text-sm">첨단 장비 및 시설 우선 사용</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">교육 및 기술 지원 서비스 이용</h4>
                      <p class="text-gray-600 text-sm">전문 교육 프로그램 무료 참여</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-check text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">사업 참여 및 이익 분배</h4>
                      <p class="text-gray-600 text-sm">조합 사업 성과에 따른 수익 배분</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 의무 */}
              <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 border-2 border-orange-200 hover:shadow-2xl transition">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mr-4">
                    <i class="fas fa-balance-scale text-3xl text-white"></i>
                  </div>
                  <h3 class="text-3xl font-bold text-gray-900">의무</h3>
                </div>
                
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-exclamation text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">조합 총회 참석 및 의결권 행사</h4>
                      <p class="text-gray-600 text-sm">조합 운영에 적극 참여</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-exclamation text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">출자금 및 회비 납부</h4>
                      <p class="text-gray-600 text-sm">조합 운영을 위한 재정 지원</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-exclamation text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">총회 및 주요 활동 참여</h4>
                      <p class="text-gray-600 text-sm">조합 행사 및 프로그램 참석</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <i class="fas fa-exclamation text-white"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">조합 발전을 위한 협력</h4>
                      <p class="text-gray-600 text-sm">상호 협력 및 정보 공유</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section class="py-20 bg-gradient-to-br from-navy via-teal to-purple text-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl md:text-5xl font-bold mb-6">지금 바로 조합원으로 가입하세요</h2>
            <p class="text-xl mb-8 opacity-90">
              구미디지털적층산업사업협동조합과 함께 미래를 열어가세요
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/support/contact" class="px-10 py-5 bg-white text-navy rounded-xl hover:bg-opacity-90 transition font-bold text-lg shadow-2xl">
                <i class="fas fa-envelope mr-2"></i>
                가입 문의하기
              </a>
              <a href="tel:054-123-4567" class="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl hover:bg-white hover:text-navy transition font-bold text-lg">
                <i class="fas fa-phone mr-2"></i>
                전화 상담
              </a>
            </div>
            <div class="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div class="text-3xl font-bold mb-2">054-123-4567</div>
                  <div class="text-sm opacity-80">대표 전화</div>
                </div>
                <div>
                  <div class="text-3xl font-bold mb-2">09:00 - 18:00</div>
                  <div class="text-sm opacity-80">평일 운영시간</div>
                </div>
                <div>
                  <div class="text-3xl font-bold mb-2">info@gumidigital.co.kr</div>
                  <div class="text-sm opacity-80">이메일 문의</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Scroll to Top Button */}
      <button 
        id="scroll-to-top" 
        onclick="scrollToTop()" 
        class="hidden fixed bottom-8 right-8 w-12 h-12 bg-teal text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-40"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
      
      {/* JavaScript */}
      <script src="/static/js/app.js"></script>
    </div>,
    { title: '조합원 가입안내 - 구미디지털적층산업사업협동조합' }
  )
})

app.get('/api/notices', async (c) => {
  const { DB } = c.env
  const category = c.req.query('category')
  const limit = parseInt(c.req.query('limit') || '10')
  
  let query = `
    SELECT id, category, title, created_at, views, is_pinned
    FROM notices
  `
  
  if (category) {
    query += ` WHERE category = ?`
  }
  
  query += ` ORDER BY is_pinned DESC, created_at DESC LIMIT ?`
  
  try {
    const result = category 
      ? await DB.prepare(query).bind(category, limit).all()
      : await DB.prepare(query).bind(limit).all()
    
    return c.json({ success: true, data: result.results })
  } catch (e) {
    return c.json({ success: false, error: 'Database error' }, 500)
  }
})

app.get('/api/members', async (c) => {
  const { DB } = c.env
  const category = c.req.query('category')
  
  let query = `SELECT * FROM members`
  
  if (category) {
    query += ` WHERE category = ?`
  }
  
  query += ` ORDER BY is_featured DESC, display_order ASC`
  
  try {
    const result = category
      ? await DB.prepare(query).bind(category).all()
      : await DB.prepare(query).all()
    
    return c.json({ success: true, data: result.results })
  } catch (e) {
    return c.json({ success: false, error: 'Database error' }, 500)
  }
})

export default app
