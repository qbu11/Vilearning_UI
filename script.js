// =========================
// Vilearning 官网 JavaScript
// =========================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 初始化所有功能
    initSmoothScrolling();
    initNavbarEffects();
    initParticleEffects();
    initCardAnimations();
    initTextAnimations();
    initHologramEffects();
    initPerformanceOptimizations();
}

// =========================
// 平滑滚动导航
// =========================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 添加滚动时的视觉反馈
                this.classList.add('active');
                setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
            }
        });
    });
}

// =========================
// 导航栏效果
// =========================
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    function updateNavbar() {
        const currentScrollY = window.scrollY;

        // 滚动时改变导航栏透明度
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // 滚动方向检测（可选：隐藏/显示导航栏）
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }

    // 使用 requestAnimationFrame 优化性能
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16); // 60fps limit
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// =========================
// 粒子效果增强
// =========================
function initParticleEffects() {
    const particleContainer = document.querySelector('.floating-particles');
    const particleCount = 20;

    // 创建动态粒子
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer, i);
    }

    function createParticle(container, index) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';

        // 随机初始位置
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;

        particle.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            width: ${size}px;
            height: ${size}px;
            background: var(--electric-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: particleFloat${index} ${duration}s linear infinite;
            opacity: 0.6;
            box-shadow: 0 0 10px var(--electric-blue);
        `;

        // 创建随机动画
        const keyframes = `
            @keyframes particleFloat${index} {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translate(${(Math.random() - 0.5) * 400}px, ${-window.innerHeight - 100}px) scale(0.5);
                    opacity: 0;
                }
            }
        `;

        // 添加动画到样式表
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

        container.appendChild(particle);

        // 粒子生命周期管理
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle(container, index); // 重新创建
            }
        }, duration * 1000);
    }
}

// =========================
// 卡片动画效果
// =========================
function initCardAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    const screenshotItems = document.querySelectorAll('.screenshot-item');

    // 功能卡片悬停效果
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 217, 255, 0.3)';

            // 添加发光边框动画
            this.style.borderColor = 'var(--electric-blue)';
            this.style.background = 'rgba(107, 70, 193, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.1)';
            this.style.borderColor = 'rgba(0, 217, 255, 0.2)';
            this.style.background = 'var(--card-bg)';
        });

        // 鼠标移动视差效果
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // 截图项目效果
    screenshotItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
}

// =========================
// 文本动画效果
// =========================
function initTextAnimations() {
    // 标题打字机效果
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        animateTextReveal(heroTitle);
    }

    // 滚动时的文本动画
    const animatedElements = document.querySelectorAll('.section-title, .feature-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // 添加fadeInUp动画
    const fadeInUpKeyframes = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(fadeInUpKeyframes, styleSheet.cssRules.length);
}

function animateTextReveal(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    let index = 0;
    const speed = 100;

    function typeChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, speed);
        }
    }

    // 延迟开始打字动画
    setTimeout(typeChar, 500);
}

// =========================
// 全息图效果增强
// =========================
function initHologramEffects() {
    const hologram = document.querySelector('.hologram');
    if (!hologram) return;

    // 添加鼠标交互
    hologram.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // 创建交互式光影效果
        this.style.background = `
            radial-gradient(circle at ${x * 100}% ${y * 100}%,
                rgba(0, 217, 255, 0.3) 0%,
                rgba(107, 70, 193, 0.1) 30%,
                rgba(236, 72, 153, 0.1) 100%)
        `;

        // 边框颜色变化
        const hue = (x + y) * 180;
        this.style.borderColor = `hsl(${hue}, 70%, 60%)`;
        this.style.boxShadow = `0 0 30px hsl(${hue}, 70%, 60%)`;
    });

    hologram.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });

    // 随机数据流效果
    createDataStream(hologram);
}

function createDataStream(container) {
    const streamCount = 3;

    for (let i = 0; i < streamCount; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';

        stream.style.cssText = `
            position: absolute;
            left: ${20 + i * 30}%;
            top: -10px;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom,
                rgba(0, 217, 255, 0.8),
                transparent);
            animation: dataFlow ${2 + i * 0.5}s linear infinite;
            border-radius: 1px;
        `;

        container.appendChild(stream);
    }

    // 数据流动画
    const dataFlowKeyframes = `
        @keyframes dataFlow {
            0% {
                top: -10px;
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                top: 100%;
                opacity: 0;
            }
        }
    `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(dataFlowKeyframes, styleSheet.cssRules.length);
}

// =========================
// 性能优化
// =========================
function initPerformanceOptimizations() {
    // 懒加载优化
    const lazyElements = document.querySelectorAll('.screenshot-placeholder');

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });

    lazyElements.forEach(el => lazyObserver.observe(el));

    // 防抖滚动事件
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 16);
    }, { passive: true });

    function handleScroll() {
        // 滚动相关的性能优化处理
        updateVisibleElements();
    }

    function updateVisibleElements() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // 只对可见区域的元素进行动画处理
        const visibleElements = document.querySelectorAll('.feature-card, .screenshot-item');

        visibleElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < windowHeight && rect.bottom > 0;

            if (isVisible) {
                el.classList.add('in-viewport');
            } else {
                el.classList.remove('in-viewport');
            }
        });
    }
}

// =========================
// 按钮交互效果
// =========================
document.querySelectorAll('.btn').forEach(button => {
    // 点击波纹效果
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
            z-index: 1;
        `;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 波纹动画
const rippleKeyframes = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

document.styleSheets[0].insertRule(rippleKeyframes, document.styleSheets[0].cssRules.length);

// =========================
// 错误处理和回退
// =========================
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.error);
    // 优雅降级，确保基本功能仍然可用
});

// =========================
// 响应式处理
// =========================
function handleResize() {
    // 重新计算动画和布局
    const hologram = document.querySelector('.hologram-container');
    if (hologram && window.innerWidth < 768) {
        hologram.style.width = '250px';
        hologram.style.height = '250px';
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =========================
// 初始化完成提示
// =========================
console.log('🚀 Vilearning 官网已加载完成！');
console.log('🎨 赛博朋克主题已激活');
console.log('⚡ 所有交互效果已就绪');