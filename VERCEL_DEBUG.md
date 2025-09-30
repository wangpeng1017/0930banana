# Vercel API Key 配置问题诊断

## 🔍 问题现状

系统只能加载 1 个 API Key（GEMINI_API_KEY），而其他 18 个备用 Key（GEMINI_API_KEY_2 到 GEMINI_API_KEY_19）未被加载。

## 🎯 根本原因

**`vercel.json` 配置问题**：只声明了主要的 `GEMINI_API_KEY`，而没有声明其他 18 个备用 Key。

在 Vercel 中，环境变量需要在 `vercel.json` 的 `env` 部分明确声明才能在构建时被注入。

## ✅ 已完成的修复

### 1. 更新 `vercel.json` (最重要)
```json
{
  "env": {
    "GEMINI_API_KEY": "$GEMINI_API_KEY",
    "GEMINI_API_KEY_2": "$GEMINI_API_KEY_2",
    ...
    "GEMINI_API_KEY_19": "$GEMINI_API_KEY_19"
  }
}
```

### 2. 更新 `vite.config.ts`
- 合并 `process.env` 和 `loadEnv` 结果
- 添加构建时调试日志

### 3. 更新 `services/geminiService.ts`
- 添加运行时环境变量检查日志
- 显示加载的 API Key 数量

## 📋 验证清单

### Vercel Dashboard 配置
确认以下环境变量已在 Vercel 项目设置中配置：

- [x] GEMINI_API_KEY
- [ ] GEMINI_API_KEY_2
- [ ] GEMINI_API_KEY_3
- [ ] ... (检查所有 19 个)

### 构建日志检查
在 Vercel 构建日志中应该看到：
```
🔑 Vite 构建时找到 19 个 API Key 环境变量
```

### 运行时日志检查
在浏览器控制台中应该看到：
```
🔍 检查环境变量...
✅ 找到主要 API Key: GEMINI_API_KEY
✅ 找到备用 API Key: GEMINI_API_KEY_2
...
🔍 找到 18 个备用 API Key (GEMINI_API_KEY_2 到 GEMINI_API_KEY_19)
🔑 成功加载 19 个 API Key
🎯 主要策略: 使用 19 个 Key 进行轮询负载均衡
```

## 🚨 如果问题仍然存在

### 检查事项：

1. **确认环境变量已添加到 Vercel**
   - 访问 Vercel Dashboard → 项目 → Settings → Environment Variables
   - 确保所有 19 个变量都已添加
   - 确保选择了所有环境（Production, Preview, Development）

2. **检查部署状态**
   - 访问 Vercel Dashboard → 项目 → Deployments
   - 确认最新的部署状态为 "Ready"
   - 查看构建日志，寻找 "Vite 构建时找到 X 个 API Key" 消息

3. **强制重新部署**
   - 在 Vercel Dashboard 中手动触发 Redeploy
   - 或者推送一个小的代码更改

4. **清除浏览器缓存**
   - 硬刷新：Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
   - 或者在隐私/无痕模式下打开

## 💡 工作原理

### 环境变量流转：
1. **Vercel Dashboard** → 配置 19 个环境变量
2. **vercel.json** → 声明需要注入的环境变量
3. **构建时** → Vercel 将环境变量注入到 process.env
4. **vite.config.ts** → 读取并定义为客户端可访问的变量
5. **geminiService.ts** → 运行时读取并初始化 API Key 管理器

### API Key 轮询机制：
1. 按序使用 API Key (1 → 2 → 3 → ... → 19 → 1)
2. 遇到 429 错误时自动切换到下一个 Key
3. 跟踪每个 Key 的失败次数，达到阈值后跳过
4. 所有 Key 都失败时重置计数器并重新尝试

## 📞 需要帮助？

如果上述步骤都无法解决问题，请检查：
- Vercel 构建日志中的错误消息
- 浏览器控制台中的完整日志
- 确认 API Key 本身是否有效且未过期