
import { GoogleGenAI, Modality } from "@google/genai";
import type { GeneratedContent } from '../types';

// API Key 轮询管理类
class ApiKeyManager {
  private apiKeys: string[];
  private currentIndex: number = 0;
  private failures: Map<string, number> = new Map();
  private maxRetries: number = 3;

  constructor() {
    // 收集所有可用的 API Keys
    this.apiKeys = [];
    for (let i = 1; i <= 19; i++) {
      const key = process.env[`GEMINI_API_KEY_${i}`] || (i === 1 ? process.env.API_KEY : null);
      if (key) {
        this.apiKeys.push(key);
      }
    }

    if (this.apiKeys.length === 0) {
      throw new Error("至少需要配置一个 API Key. 请设置 GEMINI_API_KEY_1 或 API_KEY 环境变量.");
    }

    console.log(`🔑 已加载 ${this.apiKeys.length} 个 API Key`);
  }

  // 获取当前 API Key
  getCurrentApiKey(): string {
    return this.apiKeys[this.currentIndex];
  }

  // 轮换到下一个 API Key
  rotateToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.apiKeys.length;
    console.log(`🔄 切换到 API Key ${this.currentIndex + 1}/${this.apiKeys.length}`);
  }

  // 标记当前 API Key 失败
  markCurrentAsFailed(): void {
    const currentKey = this.getCurrentApiKey();
    const failures = (this.failures.get(currentKey) || 0) + 1;
    this.failures.set(currentKey, failures);
    
    if (failures >= this.maxRetries) {
      console.warn(`⚠️  API Key ${this.currentIndex + 1} 已达到最大重试次数，暂时跳过`);
    }
  }

  // 检查当前 API Key 是否可用
  isCurrentKeyAvailable(): boolean {
    const currentKey = this.getCurrentApiKey();
    return (this.failures.get(currentKey) || 0) < this.maxRetries;
  }

  // 获取可用的 API Key（会自动轮换到可用的）
  getAvailableApiKey(): string | null {
    const startIndex = this.currentIndex;
    
    do {
      if (this.isCurrentKeyAvailable()) {
        return this.getCurrentApiKey();
      }
      this.rotateToNext();
    } while (this.currentIndex !== startIndex);
    
    // 所有 API Key 都不可用，重置失败计数
    this.failures.clear();
    console.log('🔄 所有 API Key 失败计数已重置');
    return this.getCurrentApiKey();
  }
}

const apiKeyManager = new ApiKeyManager();

// 创建带有错误重试的 AI 实例获取函数
function getAiInstance(): GoogleGenAI {
  const apiKey = apiKeyManager.getAvailableApiKey();
  if (!apiKey) {
    throw new Error("没有可用的 API Key");
  }
  return new GoogleGenAI({ apiKey });
}

export async function editImage(
    base64ImageData: string, 
    mimeType: string, 
    prompt: string,
    maskBase64: string | null,
    secondaryImage: { base64: string; mimeType: string } | null
): Promise<GeneratedContent> {
  try {
    let fullPrompt = prompt;
    const parts: any[] = [
      {
        inlineData: {
          data: base64ImageData,
          mimeType: mimeType,
        },
      },
    ];

    if (maskBase64) {
      parts.push({
        inlineData: {
          data: maskBase64,
          mimeType: 'image/png',
        },
      });
      fullPrompt = `Apply the following instruction only to the masked area of the image: "${prompt}". Preserve the unmasked area.`;
    }
    
    if (secondaryImage) {
        parts.push({
            inlineData: {
                data: secondaryImage.base64,
                mimeType: secondaryImage.mimeType,
            },
        });
    }

    parts.push({ text: fullPrompt });

    // 获取当前可用 AI 实例
    let ai = getAiInstance();

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts },
        config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });
    } catch (err) {
      // 当出现配额/速率限制等错误时，尝试轮换 API Key 重试一次
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429') || msg.includes('rate') || msg.includes('quota')) {
        apiKeyManager.markCurrentAsFailed();
        apiKeyManager.rotateToNext();
        ai = getAiInstance();
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image-preview',
          contents: { parts },
          config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
          },
        });
      } else {
        throw err;
      }
    }

    const result: GeneratedContent = { imageUrl: null, text: null };
    const responseParts = response.candidates?.[0]?.content?.parts;

    if (responseParts) {
      for (const part of responseParts) {
        if (part.text) {
          result.text = (result.text ? result.text + "\n" : "") + part.text;
        } else if (part.inlineData) {
          result.imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!result.imageUrl) {
        let errorMessage;
        if (result.text) {
            errorMessage = `The model responded: "${result.text}"`;
        } else {
            const finishReason = response.candidates?.[0]?.finishReason;
            const safetyRatings = response.candidates?.[0]?.safetyRatings;
            errorMessage = "The model did not return an image. It might have refused the request. Please try a different image or prompt.";
            
            if (finishReason === 'SAFETY') {
                const blockedCategories = safetyRatings?.filter(r => r.blocked).map(r => r.category).join(', ');
                errorMessage = `The request was blocked for safety reasons. Categories: ${blockedCategories || 'Unknown'}. Please modify your prompt or image.`;
            }
        }
        throw new Error(errorMessage);
    }

    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        let errorMessage = error.message;
        try {
            const parsedError = JSON.parse(errorMessage);
            if (parsedError.error && parsedError.error.message) {
                if (parsedError.error.status === 'RESOURCE_EXHAUSTED') {
                    errorMessage = "You've likely exceeded the request limit. Please wait a moment before trying again.";
                } else if (parsedError.error.code === 500 || parsedError.error.status === 'UNKNOWN') {
                    errorMessage = "An unexpected server error occurred. This might be a temporary issue. Please try again in a few moments.";
                } else {
                    errorMessage = parsedError.error.message;
                }
            }
        } catch (e) {}
        throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred while communicating with the API.");
  }
}

export async function generateVideo(
    prompt: string,
    image: { base64: string; mimeType: string } | null,
    aspectRatio: '16:9' | '9:16',
    onProgress: (message: string) => void
): Promise<string> {
    try {
        onProgress("Initializing video generation...");

        // FIX: The `request` object was explicitly typed as `any`, which caused a loss of type
        // information for the `operation` variable returned by `generateVideos`. This could lead
        // to a TypeScript error. By allowing TypeScript to infer the type, we ensure
        // `operation` is correctly typed, resolving the error.
        const request = {
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                aspectRatio: aspectRatio
            },
            ...(image && {
                image: {
                    imageBytes: image.base64,
                    mimeType: image.mimeType
                }
            })
        };

        // 获取当前可用 AI 实例
        let ai = getAiInstance();

        let operation;
        try {
            operation = await ai.models.generateVideos(request);
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429') || msg.includes('rate') || msg.includes('quota')) {
                apiKeyManager.markCurrentAsFailed();
                apiKeyManager.rotateToNext();
                ai = getAiInstance();
                operation = await ai.models.generateVideos(request);
            } else {
                throw err;
            }
        }
        
        onProgress("Polling for results, this may take a few minutes...");

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        if (operation.error) {
            throw new Error(operation.error.message || "Video generation failed during operation.");
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found.");
        }

        // 使用当前可用的 API Key 拼接下载链接
        const currentKey = apiKeyManager.getAvailableApiKey();
        return `${downloadLink}&key=${currentKey}`;

    } catch (error) {
        console.error("Error calling Video Generation API:", error);
        if (error instanceof Error) {
            let errorMessage = error.message;
            try {
                const parsedError = JSON.parse(errorMessage);
                if (parsedError.error && parsedError.error.message) {
                    errorMessage = parsedError.error.message;
                }
            } catch (e) {}
            throw new Error(errorMessage);
        }
        throw new Error("An unknown error occurred during video generation.");
    }
}
