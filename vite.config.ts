import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // 在 Vercel 构建时，环境变量通过 process.env 直接注入
    // 本地开发时，从 .env 文件加载
    const env = loadEnv(mode, '.', '');
    
    // 合并本地和系统环境变量
    const allEnv = { ...env, ...process.env };
    
    // 构建环境变量定义
    const envDefines: Record<string, string> = {};
    
    // 支持主要的 GEMINI_API_KEY 和 API_KEY 变量
    if (allEnv.GEMINI_API_KEY || allEnv.API_KEY) {
        envDefines['process.env.API_KEY'] = JSON.stringify(allEnv.GEMINI_API_KEY || allEnv.API_KEY);
        envDefines['process.env.GEMINI_API_KEY'] = JSON.stringify(allEnv.GEMINI_API_KEY || allEnv.API_KEY);
    }
    
    // 支持多个 API Key（GEMINI_API_KEY_2 到 GEMINI_API_KEY_19）
    for (let i = 2; i <= 19; i++) {
        const keyName = `GEMINI_API_KEY_${i}`;
        if (allEnv[keyName]) {
            envDefines[`process.env.${keyName}`] = JSON.stringify(allEnv[keyName]);
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
