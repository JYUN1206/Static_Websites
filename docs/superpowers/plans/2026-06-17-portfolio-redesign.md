# 个人作品集视觉重设计 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有作品集网站整体重设计为「青绿 + 纸白 + 暗湖绿」高对比现代风格，保留全部现有功能。

**Architecture:** 单页静态网站，通过 CSS 变量驱动配色双轨（深色/浅色），JavaScript 模块化管理交互功能。移除 `index.html` 内联样式和重复代码，统一深色模式方案。

**Tech Stack:** HTML5, CSS3 (CSS Variables, Flexbox, Grid), Vanilla JavaScript ES6+, Font Awesome 6.0 CDN

**源设计文档:** `docs/superpowers/specs/2026-06-17-portfolio-redesign-design.md`

---

## 文件职责映射

| 文件 | 修改类型 | 职责 |
|------|---------|------|
| `index.html` | 重写 | 页面结构，移除内联 `<style>` 标签和内联 `<script>` |
| `css/style.css` | 重写 | CSS 变量定义、全局样式、导航栏、Hero、section 通用容器、深色模式双轨、响应式 |
| `css/features.css` | 大幅修改 | 卡片组件、标签 pill、CTA 区块、博客列表、联系区块、动画 |
| `js/main.js` | 大幅修改 | 合并所有 JS 功能（导航、深色模式、博客、语言切换、联系方式），移除轮播图 |
| `js/features.js` | 删除 | 功能已合并至 `main.js`，移除冗余的 `.dark-mode` 深色管理器 |

---

### Task 1: 重写 `css/style.css` — CSS 变量 + 全局基础样式

**Files:**
- Modify: `css/style.css`（完全重写）

- [ ] **Step 1: 写入新的 CSS 变量和重置样式**

将 `css/style.css` 替换为以下内容：

```css
/* ===== CSS 变量 ===== */
:root {
    --bg-color: #fdfbf7;
    --accent: #009f8c;
    --accent-rgb: 0, 159, 140;
    --dark-block: #0f1f1a;
    --card-bg: #ffffff;
    --heading-color: #0f1f1a;
    --text-color: #555555;
    --text-muted: #888888;
    --border-color: #e8e3da;
    --tag-bg: rgba(0, 159, 140, 0.08);
    --hero-gradient-start: #fdfbf7;
    --hero-gradient-end: #e8e3da;
    --header-height: 64px;
    --transition-speed: 0.3s;
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 20px;
    --font-stack: 'PingFang SC', 'Microsoft YaHei', Inter, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ===== 深色模式 ===== */
[data-theme="dark"] {
    --bg-color: #111111;
    --accent: #00e6be;
    --accent-rgb: 0, 230, 190;
    --dark-block: #000000;
    --card-bg: #1a1a1a;
    --heading-color: #f0f0f0;
    --text-color: #aaaaaa;
    --text-muted: #777777;
    --border-color: #2a2a2a;
    --tag-bg: rgba(0, 230, 190, 0.1);
    --hero-gradient-start: #111111;
    --hero-gradient-end: #1a1a1a;
}

/* ===== 重置与全局 ===== */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-stack);
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-color);
    background-color: var(--bg-color);
    -webkit-font-smoothing: antialiased;
    transition: background-color var(--transition-speed), color var(--transition-speed);
}

a {
    color: var(--accent);
    text-decoration: none;
    transition: color var(--transition-speed);
}

img {
    max-width: 100%;
    display: block;
}

/* ===== 通用容器 ===== */
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
}

.section {
    padding: 80px 0;
}

.section-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.section-title {
    font-size: 30px;
    font-weight: 800;
    color: var(--heading-color);
    margin-bottom: 12px;
    line-height: 1.3;
}

.section-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    max-width: 480px;
}

.section-header {
    text-align: center;
    margin-bottom: 48px;
}

.section-header .section-subtitle {
    margin: 0 auto;
}
```

- [ ] **Step 2: 验证** — 用浏览器打开 `index.html`，确认页面背景变为纸白色，字体生效。

---

### Task 2: 继续重写 `css/style.css` — 导航栏样式

**Files:**
- Modify: `css/style.css`（追加内容）

- [ ] **Step 1: 在 `css/style.css` 末尾追加导航栏样式**

```css
/* ===== 导航栏 ===== */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    background: rgba(253, 251, 247, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 1px solid var(--border-color);
    transition: background var(--transition-speed), border-color var(--transition-speed);
}

[data-theme="dark"] .navbar {
    background: rgba(17, 17, 17, 0.85);
}

.nav-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-size: 16px;
    font-weight: 800;
    color: var(--heading-color);
    letter-spacing: -0.5px;
}

.nav-menu {
    display: flex;
    gap: 28px;
    list-style: none;
    align-items: center;
}

.nav-link {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-color);
    padding: 6px 0;
    position: relative;
    transition: color var(--transition-speed);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent);
    border-radius: 1px;
    transition: width var(--transition-speed);
}

.nav-link:hover,
.nav-link.active {
    color: var(--accent);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.theme-toggle,
.lang-toggle {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    cursor: pointer;
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-family: var(--font-stack);
    transition: all var(--transition-speed);
}

.theme-toggle:hover,
.lang-toggle:hover {
    border-color: var(--accent);
    color: var(--accent);
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 20px;
    color: var(--text-color);
    cursor: pointer;
}

/* ===== 移动端导航 ===== */
@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-menu {
        position: fixed;
        top: var(--header-height);
        left: 0;
        width: 100%;
        background: var(--card-bg);
        flex-direction: column;
        padding: 24px;
        gap: 16px;
        border-bottom: 1px solid var(--border-color);
        transform: translateY(-100%);
        opacity: 0;
        transition: transform var(--transition-speed), opacity var(--transition-speed);
        pointer-events: none;
    }

    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }

    .nav-right {
        display: none;
    }

    .nav-menu .nav-right-mobile {
        display: flex;
        gap: 12px;
        margin-top: 8px;
    }
}
```

- [ ] **Step 2: 验证** — 浏览器打开页面，确认导航栏固定顶部、毛玻璃效果、hover 下划线动画正常。

---

### Task 3: 重写 `css/style.css` — Hero 区块样式

**Files:**
- Modify: `css/style.css`（追加内容）

- [ ] **Step 1: 追加 Hero 样式**

```css
/* ===== Hero 区块 ===== */
.hero {
    padding: 120px 24px 80px;
    text-align: center;
    background: linear-gradient(135deg, var(--hero-gradient-start) 0%, var(--hero-gradient-end) 100%);
    transition: background var(--transition-speed);
}

.hero-badge {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    padding: 5px 16px;
    border-radius: var(--radius-lg);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 20px;
}

.hero-title {
    font-size: 52px;
    font-weight: 800;
    color: var(--heading-color);
    line-height: 1.15;
    letter-spacing: -1px;
}

.hero-title .highlight {
    color: var(--accent);
}

.hero-subtitle {
    font-size: 18px;
    color: var(--text-color);
    margin-top: 12px;
    font-weight: 500;
}

.hero-desc {
    font-size: 13px;
    color: var(--text-muted);
    max-width: 460px;
    margin: 16px auto 0;
    line-height: 1.7;
}

.hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 28px;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 12px 28px;
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-stack);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-speed);
    border: none;
}

.btn-primary {
    background: var(--dark-block);
    color: #fff;
}

.btn-primary:hover {
    background: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
}

.btn-outline {
    background: transparent;
    color: var(--heading-color);
    border: 1.5px solid var(--heading-color);
}

.btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .hero {
        padding: 100px 20px 60px;
    }

    .hero-title {
        font-size: 34px;
    }

    .hero-subtitle {
        font-size: 15px;
    }

    .hero-actions {
        flex-direction: column;
        align-items: center;
    }
}
```

- [ ] **Step 2: 验证** — 打开页面，确认 Hero 区域纸白渐变背景、大标题、按钮 hover 效果。

---

### Task 4: 重写 `css/style.css` — section 通用 + 动画 + 页脚

**Files:**
- Modify: `css/style.css`（追加内容）

- [ ] **Step 1: 追加 section 布局、fade-in 动画、页脚样式**

```css
/* ===== Section 通用 ===== */
.section-alt {
    background: var(--card-bg);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    transition: background var(--transition-speed), border-color var(--transition-speed);
}

/* ===== 滚动入场动画 ===== */
.fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ===== 页脚 ===== */
.footer {
    text-align: center;
    padding: 24px;
    font-size: 11px;
    color: var(--text-muted);
    background: var(--bg-color);
    border-top: 1px solid var(--border-color);
    transition: background var(--transition-speed), border-color var(--transition-speed);
}

.footer-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
}
```

- [ ] **Step 2: 验证** — 确认 `fade-in` 类可用、页脚样式正常。

---

### Task 5: 重写 `css/features.css` — 专业领域卡片 + 技能标签 + 工具卡片

**Files:**
- Modify: `css/features.css`（完全重写）

- [ ] **Step 1: 写入 features.css**

```css
/* ===== 专业领域卡片 ===== */
.professional-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
}

.professional-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 28px 24px;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed), border-color var(--transition-speed);
}

.professional-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    border-color: var(--accent);
}

.professional-card-icon {
    font-size: 28px;
    margin-bottom: 14px;
}

.professional-card-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--heading-color);
    margin-bottom: 6px;
}

.professional-card-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.6;
}

/* ===== 技能标签云 ===== */
.skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    max-width: 600px;
    margin: 0 auto;
}

.skill-tag {
    background: var(--accent);
    color: #fff;
    padding: 6px 18px;
    border-radius: var(--radius-lg);
    font-size: 12px;
    font-weight: 500;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
}

.skill-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(var(--accent-rgb), 0.3);
}

/* ===== 工具卡片 ===== */
.tools-list {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.tool-item {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    padding: 10px 22px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    color: var(--heading-color);
    font-weight: 500;
    transition: all var(--transition-speed);
}

.tool-item:hover {
    border-color: var(--accent);
    color: var(--accent);
}
```

- [ ] **Step 2: 验证** — 确认卡片 hover 上浮效果和标签样式。

---

### Task 6: 继续 `css/features.css` — 项目卡片 + 博客列表 + CTA 区块 + 联系方式

**Files:**
- Modify: `css/features.css`（追加内容）

- [ ] **Step 1: 追加项目卡片、博客、CTA、联系样式**

```css
/* ===== 项目作品卡片 ===== */
.works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    max-width: 960px;
    margin: 0 auto;
}

.work-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
}

.work-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.work-card-image {
    aspect-ratio: 16 / 10;
    background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.12), rgba(var(--accent-rgb), 0.04));
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.work-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.work-card:hover .work-card-image img {
    transform: scale(1.05);
}

.work-card-body {
    padding: 20px;
}

.work-card-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--heading-color);
    margin-bottom: 6px;
}

.work-card-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 12px;
}

.work-card-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.work-tag {
    background: var(--tag-bg);
    color: var(--accent);
    padding: 3px 12px;
    border-radius: var(--radius-lg);
    font-size: 11px;
    font-weight: 500;
}

.works-cta {
    text-align: center;
    margin-top: 32px;
}

.works-cta a {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
}

.works-cta a:hover {
    text-decoration: underline;
}

/* ===== 博客列表 ===== */
.blog-list {
    max-width: 620px;
    margin: 0 auto;
}

.blog-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    padding: 20px;
    margin-bottom: 12px;
    transition: border-color var(--transition-speed);
}

.blog-card:hover {
    border-color: var(--accent);
}

.blog-card-date {
    font-size: 11px;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 4px;
}

.blog-card-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--heading-color);
    margin-bottom: 6px;
}

.blog-card-excerpt {
    font-size: 12px;
    color: var(--text-muted);
}

.blog-search {
    width: 100%;
    padding: 10px 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-family: var(--font-stack);
    font-size: 13px;
    color: var(--text-color);
    background: var(--card-bg);
    margin-bottom: 20px;
    transition: border-color var(--transition-speed);
    outline: none;
}

.blog-search:focus {
    border-color: var(--accent);
}

/* ===== CTA 区块 ===== */
.cta-section {
    background: var(--dark-block);
    color: #fff;
    text-align: center;
    padding: 80px 24px;
    transition: background var(--transition-speed);
}

.cta-title {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 12px;
}

.cta-desc {
    font-size: 13px;
    opacity: 0.6;
    max-width: 400px;
    margin: 0 auto;
}

.cta-actions {
    margin-top: 24px;
}

.cta-contact-info {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 24px;
    font-size: 12px;
    opacity: 0.5;
}

/* ===== 联系方式 ===== */
.contact-grid {
    display: flex;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 700px;
    margin: 0 auto;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-speed);
    font-size: 13px;
    color: var(--text-color);
}

.contact-item:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
}

.contact-item i {
    font-size: 16px;
    color: var(--accent);
}

/* ===== 微信二维码弹窗 ===== */
.qr-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    align-items: center;
    justify-content: center;
}

.qr-overlay.active {
    display: flex;
}

.qr-popup {
    background: var(--card-bg);
    padding: 32px;
    border-radius: var(--radius-md);
    text-align: center;
    max-width: 280px;
    width: 90%;
}

.qr-popup img {
    width: 180px;
    height: 180px;
    margin: 0 auto 16px;
}

.qr-popup-close {
    margin-top: 12px;
    font-size: 12px;
    color: var(--text-muted);
    cursor: pointer;
    background: none;
    border: none;
    font-family: var(--font-stack);
}

/* ===== Toast 提示 ===== */
.toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--dark-block);
    color: #fff;
    padding: 10px 24px;
    border-radius: var(--radius-lg);
    font-size: 12px;
    opacity: 0;
    transition: all var(--transition-speed);
    z-index: 3000;
    pointer-events: none;
}

.toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
```

- [ ] **Step 2: 验证** — 确认卡片 grid、博客列表、CTA 暗绿底区块样式正确。

---

### Task 7: 重写 `index.html` — 页面结构

**Files:**
- Modify: `index.html`（完全重写）

- [ ] **Step 1: 重写 HTML 结构**

将 `index.html` 全部替换为：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="我的个人作品集展示网站">
    <title>我的作品集 - 个人作品展示</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/features.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

    <!-- ===== 导航栏 ===== -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="#" class="nav-logo">LOGO</a>
            <button class="menu-toggle" aria-label="菜单">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link active">首页</a></li>
                <li><a href="#professional" class="nav-link">专业领域</a></li>
                <li><a href="#skills" class="nav-link">技能</a></li>
                <li><a href="#works" class="nav-link">项目</a></li>
                <li><a href="#blog" class="nav-link">博客</a></li>
                <li><a href="#contact" class="nav-link">联系</a></li>
                <li class="nav-right-mobile" style="display:none;">
                    <button class="theme-toggle" id="themeToggleMobile">🌙</button>
                    <select class="lang-toggle" id="langSelectMobile">
                        <option value="zh">中文</option>
                        <option value="en">English</option>
                    </select>
                </li>
            </ul>
            <div class="nav-right">
                <button class="theme-toggle" id="themeToggle" aria-label="深色模式切换">
                    <i class="fas fa-moon"></i>
                </button>
                <select class="lang-toggle" id="langSelect">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                </select>
            </div>
        </div>
    </nav>

    <!-- ===== Hero 区块 ===== -->
    <section id="home" class="hero fade-in">
        <div class="hero-badge">🟢 AVAILABLE FOR WORK</div>
        <h1 class="hero-title">I'm <span class="highlight">你的名字</span></h1>
        <p class="hero-subtitle">前端开发者 · 3年项目经验</p>
        <p class="hero-desc">你好！我是一名充满热情的前端开发者，专注于创建美观且用户友好的网站。热爱学习新技术，善于将创意转化为现实。</p>
        <div class="hero-actions">
            <a href="#works" class="btn btn-primary">查看作品 ↓</a>
            <a href="#contact" class="btn btn-outline">联系我 ✉</a>
        </div>
    </section>

    <!-- ===== 专业领域 ===== -->
    <section id="professional" class="section">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-label">My Professional</div>
                <h2 class="section-title">我的专业领域</h2>
                <p class="section-subtitle">多年积累的专业技能与领域经验</p>
            </div>
            <div class="professional-grid fade-in">
                <div class="professional-card">
                    <div class="professional-card-icon">🎨</div>
                    <div class="professional-card-title">前端开发</div>
                    <div class="professional-card-desc">深度解构 Web 应用，精通多端规范与响应式布局</div>
                </div>
                <div class="professional-card">
                    <div class="professional-card-icon">⚡</div>
                    <div class="professional-card-title">交互体验</div>
                    <div class="professional-card-desc">擅长动画与微交互，依数据优化产品体验</div>
                </div>
                <div class="professional-card">
                    <div class="professional-card-icon">🛠</div>
                    <div class="professional-card-title">工程化</div>
                    <div class="professional-card-desc">构建工具与自动化流程，提升开发效率</div>
                </div>
                <div class="professional-card">
                    <div class="professional-card-icon">📱</div>
                    <div class="professional-card-title">响应式设计</div>
                    <div class="professional-card-desc">适配 PC 端与移动端，保证多设备一致性</div>
                </div>
                <div class="professional-card">
                    <div class="professional-card-icon">🎯</div>
                    <div class="professional-card-title">性能优化</div>
                    <div class="professional-card-desc">页面加载优化与 Core Web Vitals 提升</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ===== 技能标签 ===== -->
    <section id="skills" class="section section-alt">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-label">Skill</div>
                <h2 class="section-title">技能标签</h2>
            </div>
            <div class="skills-tags fade-in">
                <span class="skill-tag">HTML5 / CSS3</span>
                <span class="skill-tag">JavaScript (ES6+)</span>
                <span class="skill-tag">React</span>
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Git</span>
                <span class="skill-tag">Webpack / Vite</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">响应式设计</span>
                <span class="skill-tag">性能优化</span>
            </div>
        </div>
    </section>

    <!-- ===== 精通工具 ===== -->
    <section class="section">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-label">Tool</div>
                <h2 class="section-title">精通的工具</h2>
                <p class="section-subtitle">日常开发与设计中使用的主要工具</p>
            </div>
            <div class="tools-list fade-in">
                <span class="tool-item">VS Code</span>
                <span class="tool-item">Figma</span>
                <span class="tool-item">GitHub</span>
                <span class="tool-item">Chrome DevTools</span>
                <span class="tool-item">Terminal</span>
            </div>
        </div>
    </section>

    <!-- ===== 项目作品 ===== -->
    <section id="works" class="section section-alt">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-label">Works</div>
                <h2 class="section-title">我的项目作品</h2>
            </div>
            <div class="works-grid fade-in">
                <div class="work-card">
                    <div class="work-card-image">
                        <img src="images/project1.jpg" alt="项目1" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg, rgba(0,159,140,0.12), rgba(0,159,140,0.04))';this.style.display='none';">
                    </div>
                    <div class="work-card-body">
                        <div class="work-card-title">项目名称 1</div>
                        <div class="work-card-desc">项目简要描述，介绍核心功能和亮点</div>
                        <div class="work-card-tags">
                            <span class="work-tag">HTML5</span>
                            <span class="work-tag">CSS3</span>
                            <span class="work-tag">JavaScript</span>
                        </div>
                    </div>
                </div>
                <div class="work-card">
                    <div class="work-card-image">
                        <img src="images/project2.jpg" alt="项目2" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg, rgba(0,159,140,0.12), rgba(0,159,140,0.04))';this.style.display='none';">
                    </div>
                    <div class="work-card-body">
                        <div class="work-card-title">项目名称 2</div>
                        <div class="work-card-desc">项目简要描述，介绍核心功能和亮点</div>
                        <div class="work-card-tags">
                            <span class="work-tag">React</span>
                            <span class="work-tag">Node.js</span>
                        </div>
                    </div>
                </div>
                <div class="work-card">
                    <div class="work-card-image">
                        <img src="images/project3.jpg" alt="项目3" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg, rgba(0,159,140,0.12), rgba(0,159,140,0.04))';this.style.display='none';">
                    </div>
                    <div class="work-card-body">
                        <div class="work-card-title">项目名称 3</div>
                        <div class="work-card-desc">项目简要描述，介绍核心功能和亮点</div>
                        <div class="work-card-tags">
                            <span class="work-tag">Vue.js</span>
                            <span class="work-tag">TypeScript</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="works-cta fade-in">
                <a href="#">查看全部项目 →</a>
            </div>
        </div>
    </section>

    <!-- ===== 博客文章 ===== -->
    <section id="blog" class="section">
        <div class="container">
            <div class="section-header fade-in">
                <div class="section-label">Blog</div>
                <h2 class="section-title">博客文章</h2>
                <p class="section-subtitle">分享技术心得与项目经验</p>
            </div>
            <div class="blog-list fade-in">
                <input type="text" class="blog-search" placeholder="搜索文章..." id="blogSearch">
                <div id="blogContainer">
                    <!-- 由 JS 动态加载 -->
                </div>
            </div>
        </div>
    </section>

    <!-- ===== CTA 联系区块 ===== -->
    <section id="contact" class="cta-section fade-in">
        <div class="cta-title">LET'S TALK!</div>
        <p class="cta-desc">专注于设计解决方案，兼顾商业价值与用户体验，打造高效应用。</p>
        <div class="cta-actions">
            <a href="mailto:example@email.com" class="btn btn-primary" style="background:var(--accent);">📧 联系我</a>
        </div>
        <div class="cta-contact-info">
            <span>example@email.com</span>
            <span>github.com/yourusername</span>
        </div>
    </section>

    <!-- ===== 页脚 ===== -->
    <footer class="footer">
        <div class="footer-inner">
            <span>&copy; 2024 我的作品集</span>
        </div>
    </footer>

    <!-- ===== 微信二维码弹窗 ===== -->
    <div class="qr-overlay" id="qrOverlay">
        <div class="qr-popup">
            <img src="images/wechat-qr.png" alt="微信二维码" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22><rect fill=%22%23f0f0f0%22 width=%22180%22 height=%22180%22 rx=%228%22/><text x=%2290%22 y=%2295%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2212%22>二维码占位</text></svg>';">
            <p style="font-size:13px;color:var(--text-color);margin-top:8px;">扫一扫添加微信</p>
            <button class="qr-popup-close" onclick="document.getElementById('qrOverlay').classList.remove('active')">关闭</button>
        </div>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: 验证** — 浏览器打开页面，确认 7 个区块按顺序排列，导航链接正常。

---

### Task 8: 重写 `js/main.js` — 合并所有 JS 功能

**Files:**
- Modify: `js/main.js`（完全重写）

- [ ] **Step 1: 写入合并后的 main.js**

```javascript
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
            'nav.works': '项目', 'nav.blog': '博客', 'nav.contact': '联系',
            'blog.title': '博客文章', 'blog.subtitle': '分享技术心得与项目经验',
            'works.title': '我的项目作品', 'works.viewAll': '查看全部项目 →',
            'skills.title': '技能标签', 'professional.title': '我的专业领域',
            'contact.title': '联系我', 'contact.desc': '如果您对我的项目感兴趣，欢迎联系我',
            'tool.title': '精通的工具', 'tool.subtitle': '日常开发与设计中使用的主要工具',
            'hero.badge': '🟢 AVAILABLE FOR WORK', 'hero.cta1': '查看作品 ↓', 'hero.cta2': '联系我 ✉'
        },
        en: {
            'nav.home': 'Home', 'nav.professional': 'Professional', 'nav.skills': 'Skills',
            'nav.works': 'Works', 'nav.blog': 'Blog', 'nav.contact': 'Contact',
            'blog.title': 'Blog', 'blog.subtitle': 'Sharing technical insights and project experiences',
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
        container.innerHTML = posts.map(post => `
            <div class="blog-card">
                <div class="blog-card-date">${new Date(post.date).toLocaleDateString('zh-CN')} · ${(post.tags || []).join(', ')}</div>
                <div class="blog-card-title">${post.title}</div>
                <div class="blog-card-excerpt">${post.excerpt}</div>
            </div>
        `).join('');
    }

    loadBlog();

    // ===== 滚动入场动画 =====
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));

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
});
```

- [ ] **Step 2: 验证** — 打开浏览器，依次测试：深色模式切换、语言切换、博客加载、导航高亮、平滑滚动、Toast 复制提示。

---

### Task 9: 清理 `js/features.js`

**Files:**
- Modify: `js/features.js`（清空为占位注释）

- [ ] **Step 1: 清空 features.js**

```javascript
// features.js 已废弃 — 功能已合并至 main.js
// 移除了冗余的 .dark-mode 深色模式管理器（统一为 data-theme 方案）
// 语言切换和博客管理已整合到 main.js 中
```

- [ ] **Step 2: 验证** — 确保 `index.html` 不再加载 `features.js`（已在 Task 7 中移除引用），浏览器无 JS 报错。

---

### Task 10: 最终验证

**Files:** 无代码修改，验证步骤

- [ ] **Step 1: 全功能测试**

在浏览器中打开 `index.html`，逐项检查：

1. ✅ 导航栏固定顶部，毛玻璃模糊效果
2. ✅ 点击导航链接平滑滚动到对应区块，高亮切换正确
3. ✅ 移动端（<768px）汉堡菜单正常展开/收起
4. ✅ 深色模式切换：图标从 🌙 ↔ ☀️，页面配色正确切换
5. ✅ 刷新页面后深色模式状态保持（localStorage）
6. ✅ 中/英语言切换：导航文字和 section 标题正确翻译
7. ✅ Hero 区块：纸白渐变、大标题、双按钮 hover 效果
8. ✅ 专业领域卡片：hover 上浮、边框变色
9. ✅ 技能标签 pill 样式
10. ✅ 项目卡片 grid 布局，img onerror 降级显示渐变占位
11. ✅ 博客文章从 JSON 加载并显示，搜索过滤可用
12. ✅ CTA 暗湖绿区块显示正常
13. ✅ 页脚正常
14. ✅ fade-in 滚动入场动画生效
15. ✅ 页面无控制台错误

- [ ] **Step 2: 检查 CSS 文件无重复**

确认 `css/style.css` 和 `css/features.css` 中没有重复的选择器定义。确认 `index.html` 中无内联 `<style>` 标签（除 onerror 等属性外）。

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat: 网站视觉重设计 — 青绿极简风

- 配色：湖蓝绿 #009f8c + 纸白 #fdfbf7 + 暗湖绿 #0f1f1a
- 字体：PingFang SC + Inter 系统字体栈
- 移除 index.html 内联样式和 features.js 冗余深色模式
- 统一 data-theme 深色模式方案
- 合并 JS 功能到 main.js
- 保留全部现有功能（深色模式、多语言、博客、联系方式智能处理）"
```
