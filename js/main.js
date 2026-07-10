document.addEventListener('DOMContentLoaded', () => {

    // ===== 导航栏 =====
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 移动端菜单切换
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // 点击链接关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // 滚动 — 导航高亮
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== 深色模式 =====
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function getTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return prefersDark.matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    }

    function updateThemeIcon(theme) {
        const iconHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        [themeToggle, themeToggleMobile].forEach(btn => {
            if (btn) btn.innerHTML = iconHTML;
        });
    }

    setTheme(getTheme());

    themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // ===== 语言切换 =====
    const translations = {
        zh: {
            'nav.home': '首页', 'nav.professional': '专业领域', 'nav.skills': '技能',
            'nav.works': '项目作品', 'nav.blog': '原创文章', 'nav.contact': '联系',
            'blog.title': '原创文章', 'blog.subtitle': '公众号「zoomview」原创文章，聚焦文旅行业观察与趋势分析',
            'works.title': '我的项目作品', 'works.viewAll': '查看全部项目 →',
            'skills.title': '技能标签', 'professional.title': '我的专业领域',
            'contact.title': '联系我', 'contact.desc': '如果您对我的项目感兴趣，欢迎联系我',
            'tool.title': '精通的工具', 'tool.subtitle': '日常开发与设计中使用的主要工具',
            'hero.badge': '🟢 AVAILABLE FOR WORK', 'hero.cta1': '查看作品 ↓', 'hero.cta2': '联系我 ✉'
        },
        en: {
            'nav.home': 'Home', 'nav.professional': 'Professional', 'nav.skills': 'Skills',
            'nav.works': 'Works', 'nav.blog': 'Articles', 'nav.contact': 'Contact',
            'blog.title': 'Blog', 'blog.subtitle': 'Original articles on WeChat "zoomview", focusing on cultural tourism insights',
            'works.title': 'My Works', 'works.viewAll': 'View All Projects →',
            'skills.title': 'Skills', 'professional.title': 'My Professional',
            'contact.title': 'Contact Me', 'contact.desc': 'Feel free to reach out if interested in my projects',
            'tool.title': 'Tools', 'tool.subtitle': 'Main tools used in daily development and design',
            'hero.badge': '🟢 AVAILABLE FOR WORK', 'hero.cta1': 'View Works ↓', 'hero.cta2': 'Contact Me ✉'
        }
    };

    let currentLang = localStorage.getItem('preferredLanguage') || 'zh';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = translations[lang]?.[key];
            if (translation) el.textContent = translation;
        });
        // 同步两个选择器
        document.querySelectorAll('.lang-toggle').forEach(sel => { sel.value = lang; });
    }

    document.querySelectorAll('.lang-toggle').forEach(select => {
        select.addEventListener('change', (e) => setLanguage(e.target.value));
    });

    setLanguage(currentLang);

    // ===== 博客加载 =====
    async function loadBlog() {
        try {
            const res = await fetch('js/blog-posts.json');
            const data = await res.json();
            const posts = data.posts || data;
            displayBlog(posts);

            // 搜索过滤
            const searchInput = document.getElementById('blogSearch');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const keyword = e.target.value.toLowerCase();
                    const filtered = posts.filter(p =>
                        p.title.toLowerCase().includes(keyword) ||
                        (p.tags || []).some(t => t.toLowerCase().includes(keyword))
                    );
                    displayBlog(filtered);
                });
            }
        } catch (err) {
            console.error('博客加载失败:', err);
        }
    }

    function displayBlog(posts) {
        const container = document.getElementById('blogContainer');
        if (!container) return;
        container.innerHTML = posts.map(post => {
            const hasLink = !!post.link;
            const clickAttr = hasLink ? ` onclick="window.open('${post.link}','_blank')" style="cursor:pointer"` : '';
            return `
            <div class="blog-card${hasLink ? ' blog-card-linkable' : ''}"${clickAttr}>
                <div class="blog-card-title">${post.title}${hasLink ? ' <span class="blog-card-arrow">↗</span>' : ''}</div>
            </div>
        `}).join('');
    }

    loadBlog();

    // ===== 滚动入场动画（加固：异常时也能正常显示）=====
    const fadeEls = document.querySelectorAll('.fade-in');
    if (!('IntersectionObserver' in window)) {
        fadeEls.forEach(el => el.classList.add('visible'));
        window.__fadeOK = true;
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach(el => observer.observe(el));
        window.__fadeOK = true;
    }

    // ===== 平滑滚动 =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== 联系方式智能处理 =====
    function isMobile() {
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    document.querySelectorAll('.contact-item[data-type]').forEach(item => {
        item.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            const text = (this.textContent || '').trim();

            if (type === 'phone' && !isMobile()) {
                navigator.clipboard.writeText(text).then(() => showToast('电话号码已复制'));
            } else if (type === 'email') {
                navigator.clipboard.writeText(text).then(() => showToast('邮箱已复制'));
            }
        });
    });

    function showToast(msg) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // ===== 图片预览 =====
    window.previewImage = function(galleryItem) {
        const img = galleryItem.querySelector('img');
        if (!img) return;
        const overlay = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        if (overlay && previewImg) {
            previewImg.src = img.src;
            overlay.classList.add('active');
        }
    };

    // ESC 键关闭预览
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('imagePreview');
            if (overlay) overlay.classList.remove('active');
            const qrOverlay = document.getElementById('qrOverlay');
            if (qrOverlay) qrOverlay.classList.remove('active');
        }
    });
});
