import imageCompression from "browser-image-compression";

/**
 * Converts an image file to WebP format with compression
 * @param file - The input image file
 * @param options - Compression options
 * @returns Promise<File> - The converted WebP file
 */
export const convertToWebP = async (
    file: File,
    options: {
        maxSizeMB?: number;
        maxWidthOrHeight?: number;
        quality?: number;
    } = {}
): Promise<File> => {
    const {
        maxSizeMB = 2,
        maxWidthOrHeight = 1920,
        quality = 0.85
    } = options;

    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img') as HTMLImageElement;

        img.onload = async () => {
            // Set canvas dimensions to maintain aspect ratio with max width/height
            let { width, height } = img;

            if (width > height) {
                if (width > maxWidthOrHeight) {
                    height = (height * maxWidthOrHeight) / width;
                    width = maxWidthOrHeight;
                }
            } else {
                if (height > maxWidthOrHeight) {
                    width = (width * maxWidthOrHeight) / height;
                    height = maxWidthOrHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            if (!ctx) {
                reject(new Error('Canvas context not found'));
                return;
            }

            // Draw and convert to WebP
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }

                try {
                    // Compress the WebP image
                    const compressedBlob = await imageCompression(
                        new File([blob], 'image.webp', { type: 'image/webp' }), 
                        {
                            maxSizeMB,
                            maxWidthOrHeight,
                            useWebWorker: true
                        }
                    );
                    
                    const webpFile = new File([compressedBlob], 'image.webp', { 
                        type: 'image/webp' 
                    });
                    resolve(webpFile);
                } catch (error) {
                    reject(error);
                }
            }, 'image/webp', quality);
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

/**
 * Converts an image specifically for profile pictures (smaller size, square aspect)
 * @param file - The input image file
 * @returns Promise<File> - The converted WebP file optimized for profile pictures
 */
export const convertToWebPForProfile = async (file: File): Promise<File> => {
    return convertToWebP(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        quality: 0.9
    });
};

/**
 * Converts an image specifically for cover images (larger size, landscape optimized)
 * @param file - The input image file
 * @returns Promise<File> - The converted WebP file optimized for cover images
 */
export const convertToWebPForCover = async (file: File): Promise<File> => {
    return convertToWebP(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        quality: 0.85
    });
};