# Nano Bananary 部署指南

## 在 Vercel 部署

### 1. 连接 GitHub 仓库到 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择 GitHub，找到 `wangpeng1017/0930banana` 仓库
4. 点击 "Import"

### 2. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

获取 Gemini API Key：
1. 访问 [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key)
2. 登录并创建 API Key
3. 复制 API Key 并在 Vercel 项目设置中添加

### 3. 部署设置

Vercel 会自动检测到这是一个 Vite 项目，并使用以下配置：
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 4. 完成部署

配置完成后，Vercel 会自动开始部署。部署完成后，你将获得一个 `your-project.vercel.app` 域名。

## 项目功能

这是一个基于 React + Vite + TypeScript 的图像编辑和视频生成应用，主要功能包括：

- 🖼️ 图像编辑和变换
- 🎬 视频生成 
- 🎨 局部涂选编辑
- 🔄 连续编辑
- 🌐 中英文界面
- 🎨 浅色/深色主题切换

## 本地开发

```bash
# 安装依赖
npm install

# 创建环境变量文件
cp .env.example .env

# 编辑 .env 文件，添加你的 Gemini API Key
# GEMINI_API_KEY=your_gemini_api_key_here

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 注意事项

- 确保 Gemini API Key 的安全性，不要泄露到公开代码中
- 项目使用了最新的 React 19 和 Vite 6
- 支持 TypeScript 和现代 ES6+ 语法