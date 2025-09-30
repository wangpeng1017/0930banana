import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // 在 Vercel 构建时，环境变量通过 process.env 直接注入
    // 本地开发时，从 .env 文件加载
    const env = loadEnv(mode, '.', '');
    
    // 调试：输出 process.env 中的 GEMINI_API_KEY 相关变量
    console.log('\n=== Vite 构建时环境变量检查 ===');
    console.log('Mode:', mode);
    console.log('\nGEMINI_API_KEY 变量在 process.env 中：');
    for (let i = 1; i <= 19; i++) {
        const keyName = i === 1 ? 'GEMINI_API_KEY' : `GEMINI_API_KEY_${i}`;
        const exists = !!process.env[keyName];
        console.log(`  ${keyName}: ${exists ? '✅ 存在' : '❌ 不存在'}`);
    }
    
    // 优先使用 process.env，其次是 loadEnv
    const allEnv = { ...env, ...process.env };
    
    // 构建环境变量定义
    const envDefines: Record<string, string> = {};
    
    // 支持主要的 GEMINI_API_KEY 和 API_KEY 变量
    if (allEnv.GEMINI_API_KEY || allEnv.API_KEY) {
        envDefines['process.env.API_KEY'] = JSON.stringify(allEnv.GEMINI_API_KEY || allEnv.API_KEY);
        envDefines['process.env.GEMINI_API_KEY'] = JSON.stringify(allEnv.GEMINI_API_KEY || allEnv.API_KEY);
    }
    
    // 支持多个 API Key（GEMINI_API_KEY_2 到 GEMINI_API_KEY_19）
    console.log('\n正在处理备用 API Keys...');
    for (let i = 2; i <= 19; i++) {
        const keyName = `GEMINI_API_KEY_${i}`;
        const value = allEnv[keyName];
        if (value) {
            envDefines[`process.env.${keyName}`] = JSON.stringify(value);
            console.log(`  ✅ 已添加 ${keyName} 到 define 配置`);
        } else {
            console.log(`  ❌ ${keyName} 为空或不存在，值:`, value);
        }
    }
    
    // 调试：在构建时输出找到的 API Key 数量
    const keyCount = Object.keys(envDefines).filter(k => k.includes('GEMINI_API_KEY')).length;
    console.log(`🔑 Vite 构建时找到 ${keyCount} 个 API Key 环境变量`);
    console.log('📋 环境变量列表:', Object.keys(envDefines).filter(k => k.includes('GEMINI_API_KEY')));
    
    return {
      define: envDefines,
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
