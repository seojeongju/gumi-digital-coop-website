import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

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
            <div class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a href="/about" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">조합 개요</a>
              <a href="/about/greeting" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">조합장 인사말</a>
              <a href="/about#vision" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">비전 & 미션</a>
              <a href="/about#values" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">핵심 가치</a>
              <a href="/about#location" class="block px-4 py-3 text-sm text-gray-700 hover:bg-teal hover:text-white transition">오시는 길</a>
            </div>
          </div>
          
          <a href="/services" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm">서비스</a>
          <a href="/members" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm">조합원</a>
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
            <a href="/about#vision" class="block py-1 text-sm text-gray-600 hover:text-teal">비전 & 미션</a>
            <a href="/about#values" class="block py-1 text-sm text-gray-600 hover:text-teal">핵심 가치</a>
            <a href="/about#location" class="block py-1 text-sm text-gray-600 hover:text-teal">오시는 길</a>
          </div>
        </div>
        
        <a href="/services" class="block py-2 text-gray-700 hover:text-teal">서비스</a>
        <a href="/members" class="block py-2 text-gray-700 hover:text-teal">조합원</a>
        <a href="/news" class="block py-2 text-gray-700 hover:text-teal">소식</a>
        <a href="/support" class="block py-2 text-gray-700 hover:text-teal">문의</a>
        <a href="/members/join" class="block py-2 text-teal font-medium">조합원 가입</a>
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
  // Mock 데이터 (D1 Database 미사용)
  const notices = []
  const members = []
  
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
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-l-4 border-teal hover:shadow-xl transition-all duration-300">
              <div class="flex items-start mb-6">
                <div class="bg-teal text-white rounded-lg p-3 mr-4">
                  <i class="fas fa-cube text-3xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">첨단 적층제조 기술 보급 및 R&D</h3>
                </div>
              </div>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">3D 프린팅 기술 연구개발 지원</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">최신 장비 및 기술 트렌드 공유</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">산학연 공동 R&D 프로젝트 추진</span>
                </li>
              </ul>
            </div>
            
            {/* 2. 인력 양성 및 교육·세미나 */}
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple hover:shadow-xl transition-all duration-300">
              <div class="flex items-start mb-6">
                <div class="bg-purple text-white rounded-lg p-3 mr-4">
                  <i class="fas fa-graduation-cap text-3xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">인력 양성 및 교육·세미나</h3>
                </div>
              </div>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-purple mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">적층제조 전문 기술 인력 양성</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-purple mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">정기 세미나 및 워크샵 개최</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-purple mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">산업 전문가 교류 네트워크 구축</span>
                </li>
              </ul>
            </div>
            
            {/* 3. 공동 구매, 장비 운용 및 인프라 제공 */}
            <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300">
              <div class="flex items-start mb-6">
                <div class="bg-green-600 text-white rounded-lg p-3 mr-4">
                  <i class="fas fa-industry text-3xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">공동 구매, 장비 운용 및 인프라 제공</h3>
                </div>
              </div>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-600 mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">원자재 및 장비 공동구매 지원</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-600 mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">고가 장비 공동 활용 시스템 구축</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-green-600 mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">테스트베드 및 공동 작업공간 제공</span>
                </li>
              </ul>
            </div>
            
            {/* 4. 정부 및 지자체 협력사업 */}
            <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-l-4 border-coral hover:shadow-xl transition-all duration-300">
              <div class="flex items-start mb-6">
                <div class="bg-coral text-white rounded-lg p-3 mr-4">
                  <i class="fas fa-handshake text-3xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">정부 및 지자체 협력사업</h3>
                </div>
              </div>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-coral mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">지역 산업 육성 정책 협력</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-coral mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">정부 R&D 사업 공동 참여</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-coral mt-1 mr-3 flex-shrink-0"></i>
                  <span class="text-gray-700">지역 특화 산업 클러스터 구축</span>
                </li>
              </ul>
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
              <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-l-4 border-teal hover:shadow-xl transition-all duration-300">
                <div class="flex items-start mb-6">
                  <div class="bg-teal text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-cube text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">첨단 적층제조 기술 보급 및 R&D</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">3D 프린팅 기술 연구개발 지원</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">최신 장비 및 기술 트렌드 공유</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-teal mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">산학연 공동 R&D 프로젝트 추진</span>
                  </li>
                </ul>
              </div>
              
              {/* 2. 인력 양성 및 교육·세미나 */}
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple hover:shadow-xl transition-all duration-300">
                <div class="flex items-start mb-6">
                  <div class="bg-purple text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-graduation-cap text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">인력 양성 및 교육·세미나</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-purple mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">적층제조 전문 기술 인력 양성</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-purple mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">정기 세미나 및 워크샵 개최</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-purple mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">산업 전문가 교류 네트워크 구축</span>
                  </li>
                </ul>
              </div>
              
              {/* 3. 공동 구매, 장비 운용 및 인프라 제공 */}
              <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300">
                <div class="flex items-start mb-6">
                  <div class="bg-green-600 text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-industry text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">공동 구매, 장비 운용 및 인프라 제공</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">원자재 및 장비 공동구매 지원</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">고가 장비 공동 활용 시스템 구축</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">테스트베드 및 공동 작업공간 제공</span>
                  </li>
                </ul>
              </div>
              
              {/* 4. 정부 및 지자체 협력사업 */}
              <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-l-4 border-coral hover:shadow-xl transition-all duration-300">
                <div class="flex items-start mb-6">
                  <div class="bg-coral text-white rounded-lg p-3 mr-4">
                    <i class="fas fa-handshake text-3xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">정부 및 지자체 협력사업</h3>
                  </div>
                </div>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-coral mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">지역 산업 육성 정책 협력</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-coral mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">정부 R&D 사업 공동 참여</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-coral mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">지역 특화 산업 클러스터 구축</span>
                  </li>
                </ul>
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

// API Routes
app.get('/api/notices', async (c) => {
  // Mock data (D1 Database not in use)
  return c.json({ success: true, data: [] })
})

app.get('/api/members', async (c) => {
  // Mock data (D1 Database not in use)
  return c.json({ success: true, data: [] })
})

export default app
