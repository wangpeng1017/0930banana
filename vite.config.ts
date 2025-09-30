import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // 构建环境变量定义
    const envDefines: Record<string, string> = {};
    
    // 支持旧的 API_KEY 和 GEMINI_API_KEY 变量
    if (env.GEMINI_API_KEY || env.API_KEY) {
        envDefines['process.env.API_KEY'] = JSON.stringify(env.GEMINI_API_KEY || env.API_KEY);
        envDefines['process.env.GEMINI_API_KEY'] = JSON.stringify(env.GEMINI_API_KEY || env.API_KEY);
    }
    
    // 支持多个 API Key（GEMINI_API_KEY_1 到 GEMINI_API_KEY_19）
    for (let i = 1; i <= 19; i++) {
        const keyName = `GEMINI_API_KEY_${i}`;
        if (env[keyName]) {
            envDefines[`process.env.${keyName}`] = JSON.stringify(env[keyName]);
        }
    }
    
    return {
      define: envDefines,
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
