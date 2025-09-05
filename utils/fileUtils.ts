
export const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      if (base64) {
        resolve({ base64, mimeType: file.type });
      } else {
        reject(new Error("Failed to read file as Base64."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
};


/**
 * Converts a string to its binary representation.
 * @param text The string to convert.
 * @returns A string of 0s and 1s.
 */
const textToBinary = (text: string): string => {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
};

/**
 * Embeds an invisible watermark into an image using steganography (LSB).
 * @param imageUrl The data URL of the image to watermark.
 * @param text The text to embed.
 * @returns A Promise that resolves with the data URL of the watermarked image.
 */
export const embedWatermark = (imageUrl: string, text: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return reject(new Error("Could not get canvas context."));
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const watermarkText = text + "::END"; // Add a delimiter
            const binaryMessage = textToBinary(watermarkText);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            if (binaryMessage.length > data.length / 4 * 3) {
                 console.warn("Watermark is too long for the image. Skipping.");
                 return resolve(imageUrl); // Return original if too long
            }

            let messageIndex = 0;
            for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i += 4) {
                // Embed in R, G, B channels
                for (let j = 0; j < 3 && messageIndex < binaryMessage.length; j++) {
                    const bit = parseInt(binaryMessage[messageIndex], 2);
                    // Clear the LSB and then set it
                    data[i + j] = (data[i + j] & 0xFE) | bit;
                    messageIndex++;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => reject(new Error("Failed to load image for watermarking."));
        img.src = imageUrl;
    });
};
