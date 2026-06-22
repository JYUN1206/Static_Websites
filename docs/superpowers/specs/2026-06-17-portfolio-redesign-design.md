# 个人作品集网站视觉重设计 — 设计文档

> 状态：已确认 | 日期：2026-06-17

## 1. 设计目标

基于现有项目结构，复刻 creght.com 的排版骨架，应用「青绿 + 纸白 + 暗湖绿」高对比配色方案，保留全部现有功能并统一视觉风格。

## 2. 配色系统

| CSS 变量 | 浅色模式 | 深色模式 | 用途 |
|----------|---------|---------|------|
| `--bg-color` | `#fdfbf7` | `#111111` | 页面主背景 |
| `--accent` | `#009f8c` | `#00e6be` | 强调色（按钮/标签/链接高亮） |
| `--dark-block` | `#0f1f1a` | `#000000` | 深色切片区块背景 |
| `--card-bg` | `#ffffff` | `#1a1a1a` | 卡片背景 |
| `--heading-color` | `#0f1f1a` | `#f0f0f0` | 标题色 |
| `--text-color` | `#555555` | `#aaaaaa` | 正文色 |
| `--border-color` | `#e8e3da` | `#2a2a2a` | 边框/分割线 |
| `--tag-bg` | `rgba(0,201,167,0.1)` | `rgba(0,230,190,0.1)` | 标签浅色背景 |

## 3. 字体排版

```css
font-family: 'PingFang SC', 'Microsoft YaHei', Inter, -apple-system, sans-serif;
```
- 中文：PingFang SC（macOS）/ Microsoft YaHei（Windows）
- 英文/数字：Inter（系统原生，零外部依赖）
- 标题字重 700-800，正文 400-500
- Hero 大标题 48-56px，section 标题 28-32px，正文 13-14px

## 4. 页面区块（从上到下）

### 4.1 导航栏
- 固定顶部，`backdrop-filter: blur(10px)` 毛玻璃效果
- 左侧 LOGO，中间导航链接（首页/项目/技能/博客/联系），右侧深色切换 + 语言选择器
- 当前区块高亮为青绿色 `--accent`
- 移动端：汉堡菜单，`768px` 断点

### 4.2 Hero 区块
- 纸白渐变背景（`#fdfbf7` → `#e8e3da`）
- 顶部「AVAILABLE FOR WORK」青绿圆角徽章
- 大标题「I'm [名字]」，名字部分用青绿色
- 副标题：职位 + 经验年数
- 个人简介 1-2 句
- 双按钮：主按钮（暗湖绿底白字「查看作品」）、次按钮（描边「联系我」）

### 4.3 专业领域
- 居中 section 标题（英文小标签 + 中文大标题）
- 响应式 grid（`minmax(220px, 1fr)`），3-4 列
- 每张卡片：白底 + 细边框 + emoji 图标 + 标题 + 简短描述

### 4.4 技能标签
- 青绿 pill 标签云，`border-radius: 20px`
- flex-wrap 自动换行，居中排列

### 4.5 精通工具
- 白底灰边框工具卡片，居中 flex 排列换行

### 4.6 项目作品
- 响应式 grid（`minmax(280px, 1fr)`）
- 卡片：浅底 + 细边框 + 圆角 10px，hover 上浮 5px
- 卡片内：项目截图区（16:9 占位图）+ 标题 + 简述 + 标签（青绿浅底色 pill）
- 底部「查看全部项目 →」引导链接

### 4.7 博客文章
- 从 `js/blog-posts.json` 动态加载
- 卡片式列表，显示日期、标签、标题、摘要
- 顶部搜索过滤输入框

### 4.8 CTA 区块（LET'S TALK!）
- 暗湖绿 `--dark-block` 全宽背景
- 大号白色标题 + 副标题 + 青绿色联系按钮
- 下方排列邮箱、GitHub 等联系方式（保留智能处理逻辑）

### 4.9 页脚
- 纸白背景，版权信息 + 深色/语言切换入口

## 5. 保留的现有功能

| 功能 | 处理方式 |
|------|---------|
| 深色模式 | CSS 变量双轨，统一 data-theme 方案，移除 .dark-mode 冗余实现 |
| 中/英语言切换 | 保留 `languageManager`，语言选择器移至导航栏右侧 |
| 博客动态加载 | 保留 `blogManager` + `blog-posts.json`，卡片样式统一 |
| 微信二维码弹窗 | 保留 `overlay` + `qr-popup`，移至联系区块 |
| 联系方式智能处理 | 保留移动端 tel: / 桌面端复制，Toast 提示 |
| IntersectionObserver 入场动画 | 保留 `.fade-in` + `IntersectionObserver` |
| 平滑滚动 | 保留 `scroll-behavior: smooth` |

## 6. 移除的内容

- 轮播图（Hero slider）→ 改为静态 Hero
- 技能进度条 → 改为标签云
- 详细的「项目经验」纯文字区块 → 整合到项目卡片
- `css/style.css` 和 `css/features.css` 中重复的内联样式
- `js/features.js` 中冗余的 `.dark-mode` 深色模式管理器（统一使用 `main.js` 的 `data-theme` 方案）
- `index.html` 中约 460 行内联 `<style>` 标签（全部移至 CSS 文件）

## 7. 响应式断点

- 主断点：`768px`
- 导航栏：768px 以下切换汉堡菜单
- Grid：768px 以下退化为单列
- Hero 标题：768px 以下缩小至 32-36px
