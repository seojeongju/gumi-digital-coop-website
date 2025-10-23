// 메인 JavaScript

// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
  }
  
  // 스크롤 시 헤더 그림자 효과
  const header = document.querySelector('header')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-lg')
    } else {
      header.classList.remove('shadow-lg')
    }
  })
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)
  
  // 모든 섹션에 애니메이션 적용
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section)
  })
  
  // 부드러운 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
  
  // 숫자 카운터 애니메이션
  const counters = document.querySelectorAll('.counter')
  counters.forEach(counter => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute('data-target'))
      const count = parseInt(counter.innerText)
      const increment = target / 200
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment)
        setTimeout(updateCount, 10)
      } else {
        counter.innerText = target + '+'
      }
    }
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount()
          counterObserver.unobserve(entry.target)
        }
      })
    })
    
    counterObserver.observe(counter)
  })
})

// 폼 유효성 검사
function validateForm(formId) {
  const form = document.getElementById(formId)
  if (!form) return false
  
  const requiredFields = form.querySelectorAll('[required]')
  let isValid = true
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('border-red-500')
      isValid = false
    } else {
      field.classList.remove('border-red-500')
    }
  })
  
  // 이메일 검증
  const emailFields = form.querySelectorAll('input[type="email"]')
  emailFields.forEach(field => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (field.value && !emailRegex.test(field.value)) {
      field.classList.add('border-red-500')
      isValid = false
    }
  })
  
  // 전화번호 검증
  const phoneFields = form.querySelectorAll('input[type="tel"]')
  phoneFields.forEach(field => {
    const phoneRegex = /^[0-9-+().\s]+$/
    if (field.value && !phoneRegex.test(field.value)) {
      field.classList.add('border-red-500')
      isValid = false
    }
  })
  
  return isValid
}

// 모달 관리
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add('hidden')
    document.body.style.overflow = 'auto'
  }
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('hidden')
    })
    document.body.style.overflow = 'auto'
  }
})

// AJAX 요청 헬퍼
async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    return { success: false, error: error.message }
  }
}

// 페이지 상단으로 스크롤 버튼
window.addEventListener('scroll', () => {
  const scrollBtn = document.getElementById('scroll-to-top')
  if (scrollBtn) {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('hidden')
    } else {
      scrollBtn.classList.add('hidden')
    }
  }
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 이미지 레이지 로딩
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute('data-src')
        observer.unobserve(img)
      }
    })
  })
  
  images.forEach(img => imageObserver.observe(img))
})

// 토스트 알림
function showToast(message, type = 'info') {
  const toast = document.createElement('div')
  toast.className = `fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 ${
    type === 'success' ? 'bg-green-500' :
    type === 'error' ? 'bg-red-500' :
    type === 'warning' ? 'bg-yellow-500' :
    'bg-blue-500'
  }`
  toast.textContent = message
  
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transition = 'opacity 0.5s'
    setTimeout(() => toast.remove(), 500)
  }, 3000)
}
