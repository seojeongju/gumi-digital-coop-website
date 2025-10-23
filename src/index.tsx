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
          <a href="/about" class="text-gray-700 hover:text-teal font-medium transition uppercase text-sm">조합 소개</a>
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
        <a href="/about" class="block py-2 text-gray-700 hover:text-teal">조합 소개</a>
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
      
      {/* 히어로 섹션 - 이미지 배경 스타일 */}
      <section class="relative bg-navy text-white py-32 overflow-hidden">
        {/* 배경 이미지 */}
        <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style="background-image: url('https://page.gensparksite.com/v1/base64_upload/fda2eb52d8950c1250cdbec06b24d1e9');"
        ></div>
        {/* 어두운 오버레이 */}
        <div class="absolute inset-0 bg-gradient-to-r from-navy/80 via-purple/70 to-teal/70"></div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              디지털 제조 시대를<br />
              함께 열어가는 혁신 파트너
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
              3D 프린팅 및 적층제조 기술로 미래를 만듭니다
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="/members/join" class="px-8 py-4 bg-teal text-white rounded-md font-bold text-lg hover:bg-opacity-90 transition text-center">
                조합원 가입하기
              </a>
              <a href="/services" class="px-8 py-4 bg-white text-navy rounded-md font-bold text-lg hover:bg-opacity-90 transition text-center">
                서비스 둘러보기
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Welcome 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              구미디지털적층산업사업협동조합을 소개합니다
            </h2>
            <div class="w-20 h-1 bg-teal mx-auto mb-6"></div>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              3D 프린팅 등 적층제조기술을 중심으로 회원사의 상생과 지역 산업 혁신을 위해 설립되었습니다.<br />
              디지털 제조 시대를 선도하는 혁신적인 기술력과 네트워크를 제공합니다.
            </p>
          </div>
          
          {/* 번호가 있는 서비스 카드 */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 카드 1 */}
            <div class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div class="relative h-64 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-purple to-teal flex items-center justify-center">
                  <i class="fas fa-print text-white text-6xl"></i>
                </div>
                <div class="absolute top-4 left-4 w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center font-bold text-xl">
                  01
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-3 group-hover:text-teal transition">3D 프린팅 서비스</h3>
                <p class="text-gray-600 mb-4">
                  시제품 제작부터 대량 생산까지 다양한 적층제조 서비스를 제공합니다.
                </p>
                <a href="/services" class="text-teal font-medium hover:underline inline-flex items-center">
                  자세히 보기 <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
            
            {/* 카드 2 */}
            <div class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div class="relative h-64 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-teal to-navy flex items-center justify-center">
                  <i class="fas fa-drafting-compass text-white text-6xl"></i>
                </div>
                <div class="absolute top-4 left-4 w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center font-bold text-xl">
                  02
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-3 group-hover:text-teal transition">설계 및 모델링</h3>
                <p class="text-gray-600 mb-4">
                  3D 설계, 역설계, 최적화 설계 등 전문적인 모델링 서비스를 제공합니다.
                </p>
                <a href="/services" class="text-teal font-medium hover:underline inline-flex items-center">
                  자세히 보기 <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
            
            {/* 카드 3 */}
            <div class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div class="relative h-64 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-coral to-purple flex items-center justify-center">
                  <i class="fas fa-tools text-white text-6xl"></i>
                </div>
                <div class="absolute top-4 left-4 w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center font-bold text-xl">
                  03
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-3 group-hover:text-teal transition">후가공 서비스</h3>
                <p class="text-gray-600 mb-4">
                  표면 처리, 도장, 조립 및 품질 검사까지 완벽한 후가공 서비스를 제공합니다.
                </p>
                <a href="/services" class="text-teal font-medium hover:underline inline-flex items-center">
                  자세히 보기 <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Do 섹션 */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              우리가 제공하는 가치
            </h2>
            <div class="w-20 h-1 bg-teal mx-auto mb-6"></div>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              조합원 기업의 성장과 지역 산업 발전을 위한 다양한 서비스와 지원을 제공합니다.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 카드 1 */}
            <div class="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition">
              <div class="w-20 h-20 bg-teal bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-cogs text-4xl text-teal"></i>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">첨단 제조 기술 공유</h3>
              <p class="text-gray-600 mb-6">
                적층제조 핵심 기술과 시장 동향을 공유하고 협업을 통한 시너지를 창출합니다.
              </p>
              <a href="/technology" class="inline-block px-6 py-2 bg-teal text-white rounded-md hover:bg-opacity-90 transition text-sm font-medium">
                자세히 보기
              </a>
            </div>
            
            {/* 카드 2 */}
            <div class="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition">
              <div class="w-20 h-20 bg-teal bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-handshake text-4xl text-teal"></i>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">지역 기업 상생 네트워크</h3>
              <p class="text-gray-600 mb-6">
                회원사 간 협력과 공동 프로젝트를 통해 상생 발전을 도모합니다.
              </p>
              <a href="/members" class="inline-block px-6 py-2 bg-teal text-white rounded-md hover:bg-opacity-90 transition text-sm font-medium">
                자세히 보기
              </a>
            </div>
            
            {/* 카드 3 */}
            <div class="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition">
              <div class="w-20 h-20 bg-teal bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-graduation-cap text-4xl text-teal"></i>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">전문 기술 교육</h3>
              <p class="text-gray-600 mb-6">
                최신 기술 교육과 전문 인력 양성 프로그램을 제공합니다.
              </p>
              <a href="/about" class="inline-block px-6 py-2 bg-teal text-white rounded-md hover:bg-opacity-90 transition text-sm font-medium">
                자세히 보기
              </a>
            </div>
            
            {/* 카드 4 */}
            <div class="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition">
              <div class="w-20 h-20 bg-teal bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-globe text-4xl text-teal"></i>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">글로벌 시장 진출</h3>
              <p class="text-gray-600 mb-6">
                국제 경쟁력 확보와 해외 시장 진출을 적극 지원합니다.
              </p>
              <a href="/about" class="inline-block px-6 py-2 bg-teal text-white rounded-md hover:bg-opacity-90 transition text-sm font-medium">
                자세히 보기
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* 최신 소식 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between mb-12">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">최신 소식</h2>
              <div class="w-20 h-1 bg-teal"></div>
            </div>
            <a href="/news" class="text-teal hover:underline flex items-center font-medium">
              전체보기 <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notices.length > 0 ? notices.map((notice: any) => (
              <a href={`/news/${notice.id}`} class="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                <div class="p-6">
                  <span class="inline-block px-4 py-1 bg-teal text-white text-sm rounded-full mb-4">
                    {notice.category}
                  </span>
                  <h3 class="text-xl font-bold mb-3 line-clamp-2 group-hover:text-teal transition">{notice.title}</h3>
                  <div class="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
                    <span><i class="far fa-calendar mr-2"></i>{new Date(notice.created_at).toLocaleDateString('ko-KR')}</span>
                    <span><i class="far fa-eye mr-2"></i>{notice.views}</span>
                  </div>
                </div>
              </a>
            )) : (
              <div class="col-span-3 text-center text-gray-500 py-12">
                등록된 공지사항이 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA 배너 섹션 */}
      <section class="py-20 bg-gradient-to-r from-teal to-navy text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-pattern"></div>
        
        <div class="container mx-auto px-4 text-center relative z-10">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            협동조합과 함께 성장하고 싶으신가요?
          </h2>
          <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            구미디지털적층산업사업협동조합은 회원사의 성공적인 미래를 위해<br />
            최선을 다하고 있습니다.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/support/contact" class="inline-block px-8 py-4 bg-white text-teal rounded-md font-bold text-lg hover:bg-opacity-90 transition">
              <i class="fas fa-phone mr-2"></i>문의하기
            </a>
            <a href="/support/quote" class="inline-block px-8 py-4 bg-coral text-white rounded-md font-bold text-lg hover:bg-opacity-90 transition">
              <i class="fas fa-file-invoice mr-2"></i>견적 요청
            </a>
          </div>
        </div>
      </section>
      
      {/* 통계 섹션 */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="p-6">
              <div class="text-5xl font-bold text-teal mb-2">5+</div>
              <div class="text-gray-600">조합원 기업</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-teal mb-2">20+</div>
              <div class="text-gray-600">진행 프로젝트</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-teal mb-2">10+</div>
              <div class="text-gray-600">보유 특허</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-teal mb-2">100+</div>
              <div class="text-gray-600">교육 수료생</div>
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
    { title: '구미디지털적층산업사업협동조합 - 디지털 제조 시대의 혁신 파트너' }
  )
})

// API Routes
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
