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
      
      {/* 히어로 섹션 - 건설 스타일 */}
      <section class="relative bg-navy text-white overflow-hidden" style="height: 600px;">
        {/* 배경 이미지 */}
        <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style="background-image: url('https://page.gensparksite.com/v1/base64_upload/fda2eb52d8950c1250cdbec06b24d1e9');"
        ></div>
        {/* 어두운 오버레이 */}
        <div class="absolute inset-0 bg-navy/60"></div>
        
        <div class="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
          <div class="text-center max-w-4xl">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Best Digital Manufacturing<br />
              <span class="text-teal">Cooperative</span>
            </h1>
            <p class="text-lg md:text-xl mb-8 opacity-90">
              구미디지털적층산업사업협동조합 - 3D 프린팅 및 적층제조 기술로 미래를 만듭니다
            </p>
            <a href="/support/contact" class="inline-block px-8 py-4 bg-teal text-white rounded-md font-bold text-lg hover:bg-opacity-90 transition">
              문의하기
            </a>
          </div>
        </div>
      </section>
      
      {/* 서비스 아이콘 섹션 - 심플 스타일 */}
      <section class="py-16 bg-white border-b">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* 3D 프린팅 */}
            <div class="text-center group cursor-pointer">
              <div class="mb-4 flex justify-center">
                <i class="fas fa-print text-6xl text-gray-400 group-hover:text-teal transition"></i>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">3D 프린팅</h3>
              <p class="text-sm text-gray-600 mb-3">시제품 제작부터 대량 생산까지 다양한 적층제조 서비스</p>
              <a href="/services" class="text-teal text-sm hover:underline">More →</a>
            </div>
            
            {/* 설계/모델링 */}
            <div class="text-center group cursor-pointer">
              <div class="mb-4 flex justify-center">
                <i class="fas fa-drafting-compass text-6xl text-gray-400 group-hover:text-teal transition"></i>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">설계/모델링</h3>
              <p class="text-sm text-gray-600 mb-3">3D 설계, 역설계, 최적화 설계 전문 서비스</p>
              <a href="/services" class="text-teal text-sm hover:underline">More →</a>
            </div>
            
            {/* 품질관리 */}
            <div class="text-center group cursor-pointer">
              <div class="mb-4 flex justify-center">
                <i class="fas fa-check-circle text-6xl text-gray-400 group-hover:text-teal transition"></i>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">품질관리</h3>
              <p class="text-sm text-gray-600 mb-3">엄격한 품질 기준과 검사 시스템을 통한 완벽한 품질 보증</p>
              <a href="/services" class="text-teal text-sm hover:underline">More →</a>
            </div>
            
            {/* 후가공 */}
            <div class="text-center group cursor-pointer">
              <div class="mb-4 flex justify-center">
                <i class="fas fa-tools text-6xl text-gray-400 group-hover:text-teal transition"></i>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">후가공</h3>
              <p class="text-sm text-gray-600 mb-3">표면 처리, 도장, 조립까지 완벽한 마무리</p>
              <a href="/services" class="text-teal text-sm hover:underline">More →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* 통계 섹션 - Superheroes 스타일 */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 이미지 */}
            <div class="relative">
              <img 
                src="https://cdn1.genspark.ai/user-upload-image/5_generated/a57703b8-97d7-4c8d-b6fb-9c660027e4df.jpeg" 
                alt="Digital Manufacturing" 
                class="rounded-lg shadow-xl w-full"
              />
            </div>
            
            {/* 오른쪽: 통계 */}
            <div>
              <p class="text-teal font-semibold mb-2 uppercase text-sm">We Are Best</p>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Super<span class="text-teal">heroes</span>
              </h2>
              <p class="text-gray-600 mb-12">
                구미디지털적층산업사업협동조합은 3D 프린팅 및 적층제조 분야의 선두주자로서<br />
                회원사와 함께 지속적인 성장을 이루어가고 있습니다.
              </p>
              
              {/* 통계 그리드 */}
              <div class="grid grid-cols-2 gap-8">
                <div class="text-center p-6 bg-white rounded-lg shadow-md">
                  <div class="text-5xl font-bold text-teal mb-2">348</div>
                  <div class="text-gray-600 text-sm">완료 프로젝트</div>
                </div>
                <div class="text-center p-6 bg-white rounded-lg shadow-md">
                  <div class="text-5xl font-bold text-teal mb-2">500</div>
                  <div class="text-gray-600 text-sm">만족한 고객</div>
                </div>
                <div class="text-center p-6 bg-white rounded-lg shadow-md">
                  <div class="text-5xl font-bold text-teal mb-2">845</div>
                  <div class="text-gray-600 text-sm">제작 부품</div>
                </div>
                <div class="text-center p-6 bg-white rounded-lg shadow-md">
                  <div class="text-5xl font-bold text-teal mb-2">190</div>
                  <div class="text-gray-600 text-sm">전문 인력</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 프로젝트 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <p class="text-teal font-semibold mb-2 uppercase text-sm">Our Work</p>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
              Our Recent<br />
              <span class="text-teal">Projects</span>
            </h2>
            <p class="text-gray-600 mt-4">
              협동조합이 진행한 주요 프로젝트를 소개합니다
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 프로젝트 1 */}
            <div class="group relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://cdn1.genspark.ai/user-upload-image/5_generated/a57703b8-97d7-4c8d-b6fb-9c660027e4df.jpeg" 
                alt="Project 1" 
                class="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">자동차 부품 프로토타입</h3>
                  <p class="text-sm opacity-90">3D 프린팅을 활용한 신속한 시제품 제작</p>
                </div>
              </div>
            </div>
            
            {/* 프로젝트 2 */}
            <div class="group relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://cdn1.genspark.ai/user-upload-image/5_generated/7f3579e1-f906-48c0-8900-84353a817a87.jpeg" 
                alt="Project 2" 
                class="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">의료기기 금형 제작</h3>
                  <p class="text-sm opacity-90">정밀 금형 설계 및 제조 서비스</p>
                </div>
              </div>
            </div>
            
            {/* 프로젝트 3 */}
            <div class="group relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://cdn1.genspark.ai/user-upload-image/5_generated/fe2aac66-c63c-423f-8f72-31746563a63a.jpeg" 
                alt="Project 3" 
                class="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">항공 부품 후가공</h3>
                  <p class="text-sm opacity-90">표면 처리 및 정밀 마무리 작업</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 문의 폼 섹션 */}
      <section class="py-20 bg-gray-50 relative">
        {/* 배경 이미지 */}
        <div 
          class="absolute inset-0 bg-cover bg-center opacity-10"
          style="background-image: url('https://cdn1.genspark.ai/user-upload-image/5_generated/a57703b8-97d7-4c8d-b6fb-9c660027e4df.jpeg');"
        ></div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-2xl mx-auto text-center mb-12">
            <p class="text-teal font-semibold mb-2 uppercase text-sm">Contact Today</p>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free <span class="text-teal">Quote</span>
            </h2>
            <p class="text-gray-600">
              프로젝트 문의나 견적 요청을 남겨주시면 빠른 시일 내에 답변드리겠습니다
            </p>
          </div>
          
          <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="이름" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="이메일" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input 
                    type="tel" 
                    placeholder="연락처" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
                <div>
                  <select class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal text-gray-600">
                    <option>서비스 선택</option>
                    <option>3D 프린팅</option>
                    <option>설계/모델링</option>
                    <option>금형 제작</option>
                    <option>후가공</option>
                    <option>기타</option>
                  </select>
                </div>
              </div>
              
              <div>
                <textarea 
                  placeholder="문의 내용을 입력해주세요" 
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                ></textarea>
              </div>
              
              <div class="text-center">
                <button 
                  type="submit" 
                  class="px-12 py-4 bg-teal text-white rounded-md font-bold text-lg hover:bg-opacity-90 transition"
                >
                  문의하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* 리뷰 섹션 */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <p class="text-teal font-semibold mb-2 uppercase text-sm">Testimonials</p>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
              <span class="text-teal">Reviews</span>
            </h2>
            <p class="text-gray-600 mt-4">
              협동조합과 함께한 고객들의 생생한 후기
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 리뷰 1 */}
            <div class="bg-gray-50 rounded-xl p-8 shadow-md">
              <div class="flex items-start mb-6">
                <img 
                  src="https://ui-avatars.com/api/?name=Kim+Manager&background=00A9CE&color=fff&size=80" 
                  alt="Customer" 
                  class="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">김대리</h4>
                  <div class="flex text-yellow-400 mb-2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 leading-relaxed">
                "3D 프린팅 시제품 제작을 의뢰했는데, 품질과 납기 모두 만족스러웠습니다. 
                전문적인 상담과 빠른 대응이 인상적이었고, 앞으로도 계속 이용할 계획입니다."
              </p>
            </div>
            
            {/* 리뷰 2 */}
            <div class="bg-gray-50 rounded-xl p-8 shadow-md">
              <div class="flex items-start mb-6">
                <img 
                  src="https://ui-avatars.com/api/?name=Park+CEO&background=00A9CE&color=fff&size=80" 
                  alt="Customer" 
                  class="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">박대표</h4>
                  <div class="flex text-yellow-400 mb-2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 leading-relaxed">
                "금형 설계부터 제작까지 원스톱으로 진행했는데 결과물이 기대 이상이었습니다. 
                기술력과 경험이 풍부한 협동조합과 함께해서 든든했습니다."
              </p>
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
