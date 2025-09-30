# 🔑 Vercel 环境变量配置

## 📋 环境变量清单

将以下环境变量复制到 Vercel 项目设置中：

### 变量名和值（共 19 个 API Key）

```
GEMINI_API_KEY_1=AIzaSyDTWiI8H7P2cz9xvvV8nxLDURp5z7L0wj0
GEMINI_API_KEY_2=AIzaSyAIqU843chmqWkjakXENo54f2D5ilFvbyY
GEMINI_API_KEY_3=AIzaSyC16ILL4rIHHUue9H8hvDA0qxqmaIdp9cs
GEMINI_API_KEY_4=AIzaSyAlskhPP7IC8upa2fHUJ2i2gVM5N3Eu3CY
GEMINI_API_KEY_5=AIzaSyDQ5HPySLkkR2vezQwngu_jd96Fy1qVtE8
GEMINI_API_KEY_6=AIzaSyAKnq7s8RX5JyVKCAbJW3PVqM7PO2hC444
GEMINI_API_KEY_7=AIzaSyBKszyJj8pWCO0IgO5aDNb6W24PgXfCYEg
GEMINI_API_KEY_8=AIzaSyAhKXkuIGkyblWSknGZuxZuQwP9NfrsHzM
GEMINI_API_KEY_9=AIzaSyBBcDOoecxuquF4h-QVmmkb8l8ujIQrG3I
GEMINI_API_KEY_10=AIzaSyAaDiMSw8a_rCMR4oAc8EA1mGZgHaBFUIg
GEMINI_API_KEY_11=AIzaSyCLHw1rGWVddWKFQxwALfaMZ3oFxBK6Mi0
GEMINI_API_KEY_12=AIzaSyBRlYQWtFkOFZqiVjAshdgu9nIUnY9Bzs0
GEMINI_API_KEY_13=AIzaSyASuqp-zrnNE0Gc_2rRzYmQglngma_r_t4
GEMINI_API_KEY_14=AIzaSyDADL0htCYzVez7EnpEvVmFp0N-BOKlSSQ
GEMINI_API_KEY_15=AIzaSyCHVK5A681NRc44Q4SG0p1-MR0vLjZR4d0
GEMINI_API_KEY_16=AIzaSyAgUTLCLeuI-meKuBseKyidtNTdw-zWni4
GEMINI_API_KEY_17=AIzaSyCCMqub_m4O8umGE_Rw_iuGIDkxPBl7QKE
GEMINI_API_KEY_18=AIzaSyCtAi5Q-_bmGnv5Yjm9UiJG_DAjN2nZ_JE
GEMINI_API_KEY_19=AIzaSyAYrAc8otSeBuUTLzuT_ZXl-vWHpe56Gfc
```

## 🚀 配置步骤

1. **登录 Vercel Dashboard**
   - 访问：[https://vercel.com/dashboard](https://vercel.com/dashboard)

2. **选择项目**
   - 找到你的 `0930banana` 项目

3. **进入项目设置**
   - 点击项目 → Settings → Environment Variables

4. **添加环境变量**
   - 点击 "Add New" 按钮
   - 依次添加上述 19 个环境变量
   - **变量名**: 输入如 `GEMINI_API_KEY_1`
   - **值**: 输入对应的 API Key
   - **环境**: 选择 Production, Preview, Development（全选）

5. **重新部署**
   - 添加完所有环境变量后
   - 进入 Deployments 页面
   - 点击最新部署右侧的三点菜单
   - 选择 "Redeploy"

## 🔄 轮询机制说明

- 系统会自动轮换使用这 19 个 API Key
- 当某个 Key 遇到配额/速率限制时，会自动切换到下一个
- 具有智能重试和失败恢复机制
- 支持并发请求时的负载均衡

## 🎯 优势

- **高可用性**: 19 个 Key 提供强大的备份机制
- **负载分散**: 自动分散请求到不同的 API Key
- **自动恢复**: 失败的 Key 会在一段时间后重新尝试
- **无缝切换**: 用户体验不会因单个 Key 失效而中断

## ⚠️ 注意事项

- 确保所有 API Key 都已在 Google AI Studio 中启用
- 定期检查 API Key 的配额使用情况
- 建议定期轮换 API Key 以保证安全性
- 不要在客户端代码中硬编码任何 API Key