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

// 공통 컴포넌트: 헤더
const Header = () => (
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        {/* 로고 */}
        <a href="/" class="flex items-center space-x-3">
          <img src="/static/images/logo.png" alt="구미디지털적층산업사업협동조합" class="h-12" />
        </a>
        
        {/* 데스크톱 메뉴 */}
        <nav class="hidden lg:flex items-center space-x-8">
          <a href="/about" class="text-gray-700 hover:text-navy font-medium transition">조합 소개</a>
          <a href="/services" class="text-gray-700 hover:text-navy font-medium transition">서비스/제품</a>
          <a href="/technology" class="text-gray-700 hover:text-navy font-medium transition">기술 정보</a>
          <a href="/members" class="text-gray-700 hover:text-navy font-medium transition">조합원 정보</a>
          <a href="/news" class="text-gray-700 hover:text-navy font-medium transition">소식/공지</a>
          <a href="/support" class="text-gray-700 hover:text-navy font-medium transition">고객지원</a>
        </nav>
        
        {/* CTA 버튼 */}
        <div class="hidden lg:flex items-center space-x-4">
          <a href="/members/join" class="px-4 py-2 bg-coral text-white rounded-lg hover:bg-opacity-90 transition">
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
        <a href="/about" class="block py-2 text-gray-700 hover:text-navy">조합 소개</a>
        <a href="/services" class="block py-2 text-gray-700 hover:text-navy">서비스/제품</a>
        <a href="/technology" class="block py-2 text-gray-700 hover:text-navy">기술 정보</a>
        <a href="/members" class="block py-2 text-gray-700 hover:text-navy">조합원 정보</a>
        <a href="/news" class="block py-2 text-gray-700 hover:text-navy">소식/공지</a>
        <a href="/support" class="block py-2 text-gray-700 hover:text-navy">고객지원</a>
        <a href="/members/join" class="block py-2 text-coral font-medium">조합원 가입</a>
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
          <img src="/static/images/logo.png" alt="구미디지털적층산업사업협동조합" class="h-10 mb-4 brightness-0 invert" />
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
      
      {/* 히어로 섹션 */}
      <section class="relative bg-gradient-to-r from-navy via-purple to-teal text-white py-20 md:py-32">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            디지털 제조 시대를<br />함께 열어가는 혁신 파트너
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            3D 프린팅 및 적층제조 기술로 미래를 만듭니다
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/members/join" class="px-8 py-4 bg-coral text-white rounded-lg font-bold text-lg hover:bg-opacity-90 transition">
              조합원 가입하기
            </a>
            <a href="/services" class="px-8 py-4 bg-white text-navy rounded-lg font-bold text-lg hover:bg-opacity-90 transition">
              서비스 둘러보기
            </a>
          </div>
        </div>
      </section>
      
      {/* 핵심 가치 섹션 */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple to-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-cogs text-3xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-2">첨단 제조 기술 공유</h3>
              <p class="text-gray-600">적층제조 핵심 기술과 시장 동향 공유</p>
            </div>
            
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple to-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-handshake text-3xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-2">지역 기업 상생 네트워크</h3>
              <p class="text-gray-600">회원사 간 협력과 시너지 창출</p>
            </div>
            
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple to-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-graduation-cap text-3xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-2">전문 기술 교육</h3>
              <p class="text-gray-600">최신 기술 교육 및 인력 양성</p>
            </div>
            
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple to-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-globe text-3xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-2">글로벌 시장 진출</h3>
              <p class="text-gray-600">국제 경쟁력 확보와 시장 확대</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 주요 서비스 섹션 */}
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">주요 서비스</h2>
            <p class="text-xl text-gray-600">다양한 적층제조 서비스를 제공합니다</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="/services" class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div class="h-48 bg-gradient-to-br from-purple to-teal flex items-center justify-center">
                <i class="fas fa-print text-6xl text-white"></i>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-2 group-hover:text-purple transition">3D 프린팅 서비스</h3>
                <p class="text-gray-600">시제품 제작부터 대량 생산까지</p>
              </div>
            </a>
            
            <a href="/services" class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div class="h-48 bg-gradient-to-br from-teal to-navy flex items-center justify-center">
                <i class="fas fa-drafting-compass text-6xl text-white"></i>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-2 group-hover:text-teal transition">설계 및 모델링</h3>
                <p class="text-gray-600">3D 설계 및 최적화 서비스</p>
              </div>
            </a>
            
            <a href="/services" class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div class="h-48 bg-gradient-to-br from-coral to-purple flex items-center justify-center">
                <i class="fas fa-tools text-6xl text-white"></i>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-2 group-hover:text-coral transition">후가공 서비스</h3>
                <p class="text-gray-600">표면 처리 및 품질 검사</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      
      {/* 최신 소식 섹션 */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold">최신 소식</h2>
            <a href="/news" class="text-navy hover:underline flex items-center">
              전체보기 <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notices.length > 0 ? notices.map((notice: any) => (
              <a href={`/news/${notice.id}`} class="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <span class="inline-block px-3 py-1 bg-purple text-white text-sm rounded-full mb-3">
                  {notice.category}
                </span>
                <h3 class="text-xl font-bold mb-2 line-clamp-2">{notice.title}</h3>
                <div class="flex items-center justify-between text-sm text-gray-500 mt-4">
                  <span>{new Date(notice.created_at).toLocaleDateString('ko-KR')}</span>
                  <span><i class="fas fa-eye mr-1"></i> {notice.views}</span>
                </div>
              </a>
            )) : (
              <div class="col-span-3 text-center text-gray-500 py-8">
                등록된 공지사항이 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 조합원 소개 섹션 */}
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">조합원 기업</h2>
            <p class="text-xl text-gray-600">함께 성장하는 파트너</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
            {members.length > 0 ? members.map((member: any) => (
              <a href={`/members/${member.id}`} class="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center justify-center">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <i class="fas fa-building text-3xl text-gray-400"></i>
                </div>
                <h3 class="text-center font-bold text-sm">{member.name}</h3>
                <span class="text-xs text-gray-500 mt-1">{member.category}</span>
              </a>
            )) : (
              <div class="col-span-5 text-center text-gray-500 py-8">
                등록된 조합원 정보가 없습니다.
              </div>
            )}
          </div>
          
          <div class="text-center mt-8">
            <a href="/members" class="inline-block px-8 py-3 bg-navy text-white rounded-lg hover:bg-opacity-90 transition">
              전체 조합원 보기
            </a>
          </div>
        </div>
      </section>
      
      {/* 통계 섹션 */}
      <section class="py-16 bg-gradient-to-r from-navy to-purple text-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-5xl font-bold mb-2">5+</div>
              <div class="text-lg opacity-90">조합원 기업</div>
            </div>
            <div>
              <div class="text-5xl font-bold mb-2">20+</div>
              <div class="text-lg opacity-90">진행 프로젝트</div>
            </div>
            <div>
              <div class="text-5xl font-bold mb-2">10+</div>
              <div class="text-lg opacity-90">보유 특허</div>
            </div>
            <div>
              <div class="text-5xl font-bold mb-2">100+</div>
              <div class="text-lg opacity-90">교육 수료생</div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* JavaScript */}
      <script src="/static/js/app.js"></script>
    </div>,
    { title: '구미디지털적층산업사업협동조합' }
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
