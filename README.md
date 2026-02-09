# Astro WebStack - 全栈自动化静态导航系统

基于 Astro + TailwindCSS 构建的高性能静态导航站，集成了多平台自动化部署、SEO 推送和 PWA 支持。

## 🚀 核心特性

- **高性能**: 基于 Astro 岛屿架构，Lighthouse 评分 95+。
- **响应式 UI**: 复刻 WebStack 经典布局，适配 PC 与移动端，支持**暗黑模式**。
- **Git-CMS**: 基于 Markdown/YAML 的内容管理，直接修改 GitHub 文件即可更新内容。
- **自动化部署**: 内置 GitHub Actions，支持部署到 GitHub Pages, Vercel, Netlify, Cloudflare Pages。
- **SEO 增强**: 自动生成 Sitemap、Robots.txt，支持百度/Google 实时索引推送。
- **PWA 支持**: 可安装为桌面/手机应用，支持离线访问。
- **健康监控**: 内置链接检测脚本，自动识别失效链接。

## 🛠️ 快速开始

### 1. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 2. 内容管理

所有站点数据存储在 `src/content/groups/` 目录下。

**添加新分类 (Group):**
创建一个新的 `.yaml` 文件，例如 `03-design.yaml`：

```yaml
name: "设计工具"
icon: "palette" # 图标名称 (需自行集成图标库或使用 URL)
items:
  - name: "Figma"
    url: "https://figma.com"
    desc: "在线协作设计工具"
    icon: "https://figma.com/favicon.ico"
```

**文件名排序**: 建议使用数字前缀（如 `01-`, `02-`）来控制侧边栏的显示顺序。

## 📦 自动化部署指南

本项目默认配置了 GitHub Actions 部署至 **GitHub Pages**。

### 部署至 GitHub Pages (推荐)
1. Fork 本仓库。
2. 进入仓库 Settings -> Pages。
3. Source 选择 `GitHub Actions`。
4. 提交代码，等待 Action 运行完成即可。

### 部署至 Vercel / Netlify
1. 在 Vercel/Netlify 导入你的 GitHub 仓库。
2. 框架预设选择 `Astro`。
3. 环境变量 (可选):
   - `BAIDU_PUSH_TOKEN`: 用于 SEO 推送。

### 多云同步部署
若需同时部署到多个平台，请在 GitHub Secrets 中配置：
- `VERCEL_DEPLOY_HOOK`: Vercel 的 Deploy Hook URL。
- `NETLIFY_BUILD_HOOK`: Netlify 的 Build Hook URL。
GitHub Actions 会在构建成功后自动触发这些 Webhooks。

## 🔍 SEO 与 监控

### 搜索引擎推送
配置 GitHub Secret `BAIDU_PUSH_TOKEN` 后，每次部署会自动推送 Sitemap 中的链接到百度站长平台。
脚本位于: `scripts/seo-push.js`

### 链接健康检查
运行检查脚本：
```bash
node scripts/link-check.js
```
建议配置 GitHub Action Schedule 每周运行一次。

## 📱 PWA
项目内置 PWA 支持。在 `astro.config.mjs` 中可修改 Manifest 配置（名称、图标等）。

---
**License**: MIT
