// DOM 요소 선택
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const scrollTop = document.getElementById('scrollTop');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');

// 모바일 메뉴 토글
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 검색 버튼 클릭
searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
});

// 검색 닫기
searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
});

// 검색 오버레이 외부 클릭 시 닫기
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    }
});

// ESC 키로 검색 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    }
});

// 검색 기능
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            alert(`"${query}" 검색 결과를 표시합니다.`);
            // 실제 검색 기능 구현 시 여기에 로직 추가
        }
    }
});

// 스크롤 탑 버튼
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 슬라이더 기능
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    // 슬라이드 범위 체크
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    // 모든 슬라이드 숨기기
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 현재 슬라이드 표시
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// 이전 버튼
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// 다음 버튼
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// 도트 클릭
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// 자동 슬라이드
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// 슬라이더에 마우스 오버 시 자동 슬라이드 일시 정지
const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

hero.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 카드 호버 효과 강화
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 메뉴 아이템 클릭 이벤트
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const menuName = this.querySelector('h3').textContent;
        alert(`${menuName} 메뉴를 확인합니다.`);
    });
});

// 뉴스 아이템 클릭 이벤트
const newsItems = document.querySelectorAll('.news-item');
newsItems.forEach(item => {
    item.addEventListener('click', function() {
        const newsTitle = this.querySelector('h3').textContent;
        alert(`${newsTitle} 기사를 확인합니다.`);
    });
});

// 매장 검색 기능
const storeSearch = document.querySelector('.store-search');
const storeSearchInput = document.getElementById('storeSearch');
const storeSearchBtn = storeSearch.querySelector('.btn-primary');

storeSearchBtn.addEventListener('click', () => {
    const query = storeSearchInput.value.trim();
    if (query) {
        alert(`"${query}" 지역의 매장을 검색합니다.`);
    } else {
        alert('검색어를 입력해주세요.');
    }
});

storeSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        storeSearchBtn.click();
    }
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
const animateElements = document.querySelectorAll('.info-card, .menu-item, .news-item, .factory-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 헤더 스크롤 효과
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// 언어 선택 변경
const langSelect = document.querySelector('.lang-select');
langSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    alert(`언어가 ${selectedLang.toUpperCase()}로 변경되었습니다.`);
});

// 창업 버튼 클릭 이벤트
const franchiseButtons = document.querySelectorAll('.franchise-buttons a');
franchiseButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const buttonText = this.textContent.trim();
        alert(`${buttonText} 페이지로 이동합니다.`);
    });
});

// 드림 팩토리 아이템 클릭
const factoryItems = document.querySelectorAll('.factory-item');
factoryItems.forEach(item => {
    item.addEventListener('click', function() {
        const factoryName = this.querySelector('h3').textContent;
        alert(`${factoryName} 정보를 확인합니다.`);
    });
});

// 로딩 완료 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 첫 번째 슬라이드 표시
    showSlide(0);
    
    // 스크롤 위치 복원 방지
    window.scrollTo(0, 0);
});

