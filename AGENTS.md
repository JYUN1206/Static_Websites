# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## 运行方式

这是一个纯静态网站，无需构建工具或包管理器。直接用浏览器打开 `index.html` 即可运行：

```bash
open index.html   # macOS
# 或直接在浏览器中打开该文件
```

没有 lint、测试、或构建命令。

## 技术栈

- HTML5 + CSS3（Flexbox、Grid、CSS 变量、动画）
- JavaScript ES6+（无框架，原生 DOM 操作）
- Font Awesome 6.0（CDN 引入）

## 高层架构

### 页面结构（`index.html`）

单页应用，包含以下 section：
- **Hero** — 全屏轮播图 + CTA 按钮
- **关于我** — 个人头像 + 简介
- **项目展示** — 项目卡片 grid（带 hover 遮罩效果）
- **技能树** — 分类技能进度条
- **博客** — 通过 JS 从 `js/blog-posts.json` 动态加载的文章列表
- **联系我** — 邮箱/电话/GitHub 等联系方式，含微信二维码弹窗
- **项目经验** — 详细的文字型项目描述

页面顶部有固定导航栏，包含深色模式切换和语言选择器。

### CSS 文件分工

- **`css/style.css`** — 核心布局：导航栏、轮播图、section 通用样式、深色模式（通过 `[data-theme="dark"]` 选择器）、响应式断点、`fade-in` 动画工具类
- **`css/features.css`** — 功能模块样式：深色模式切换按钮（右下角固定定位）、语言选择器、博客文章列表、项目卡片 hover 效果、技能进度条动画；使用另一套深色模式变量（`.dark-mode` 类名）

> ⚠️ **注意**：项目中存在两套互不兼容的深色模式实现。`style.css` + `main.js` 使用 `<html data-theme="dark">` 切换 CSS 变量；`features.css` + `features.js` 使用 `<body class="dark-mode">` 切换另一组 CSS 变量。修改深色模式时需确认使用的是哪一套，避免两边不一致。

### JavaScript 文件分工

- **`js/main.js`** — 页面初始化入口，负责：
  - 轮播图（自动播放、触摸滑动、指示器）
  - 技能进度条动画（Intersection Observer 触发）
  - 导航栏滚动效果 + 移动端菜单展开/收起
  - 深色模式（`data-theme` 方案，支持 localStorage 持久化 + 系统偏好检测）
  - 平滑滚动 + 导航高亮
  - 联系方式智能处理（移动端 tel: 链接、桌面端复制到剪贴板 + Toast 提示）

- **`js/features.js`** — 独立功能模块管理器，负责：
  - 另一套深色模式（`.dark-mode` 方案，通过 `darkModeManager` 对象）
  - 多语言支持（`languageManager`，通过 `data-i18n` 属性匹配翻译）
  - 博客文章加载与过滤（`blogManager`，fetch `blog-posts.json`）

- **`js/blog-posts.json`** — 博客文章的静态数据源，包含 id、title、date、tags、excerpt、content 字段

### CSS 变量约定

```css
:root {
    --primary-color: #2c3e50;    /* 主题色 */
    --secondary-color: #3498db;  /* 强调色 */
    --text-color: #333;          /* 文字色 */
    --bg-color: #fff;            /* 背景色 */
    --transition-speed: 0.3s;    /* 过渡动画时长 */
}
```

所有颜色和过渡时间应通过 CSS 变量引用，以保持深色模式兼容。

### `index.html` 中的内联样式

`index.html` 的 `<style>` 标签内（约 460 行）包含了 Hero 区域、项目卡片、技能树、导航栏的完整样式。这些样式与 `css/style.css` 和 `css/features.css` 存在大量重复。修改页面样式时，优先确定修改哪个文件，避免在三处之间产生不一致。

## 关键约定

- **移动端适配**：主要断点为 `768px`，导航栏在移动端变为汉堡菜单，grid 布局退化为单列
- **动画模式**：使用 `.fade-in` 类配合 Intersection Observer 实现滚动触发入场动画；技能进度条也有独立的动画触发逻辑
- **外部依赖**：仅 Font Awesome CDN，无其他外部库或框架
- **图片资源**：轮播图 (slide1-3.png)、头像 (profile.png)、项目截图等均置于 `images/` 目录，需自行提供实际文件
