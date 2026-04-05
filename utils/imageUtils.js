/**
 * Image Utilities for Blog Content
 * Handles real-time scanning, compression, and uploading of embedded images.
 */

/**
 * Compresses a Base64 image string using the Canvas API.
 * @param {string} base64Str - The original base64 image data.
 * @param {number} quality - Compression quality (0 to 1).
 * @param {number} maxWidth - Maximum width of the compressed image.
 * @returns {Promise<Blob>} - The compressed image as a Blob.
 */
export const compressImage = async (base64Str, quality = 0.7, maxWidth = 1200) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio while respecting maxWidth
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      // Use better image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas compression failed'));
          }
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => reject(new Error('Failed to load image for compression'));
  });
};

/**
 * Scans an HTML string for Base64 images, compresses them, and uploads them to the server.
 * Replaces the Base64 data with the new remote URLs.
 * @param {string} htmlString - The HTML content to process.
 * @returns {Promise<string>} - The "cleaned" HTML content with remote URLs.
 */
export const processContentImages = async (htmlString) => {
  // Only run in the browser
  if (typeof window === 'undefined' || !htmlString) return htmlString;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const images = doc.querySelectorAll('img');
  
  if (images.length === 0) return htmlString;

  let hasChanges = false;
  const processPromises = [];

  for (const img of images) {
    const src = img.getAttribute('src');
    
    // Check if it's a Base64 encoded image (common when pasting)
    if (src && src.startsWith('data:image/')) {
      const uploadPromise = (async () => {
        try {
          // 1. Compress the image first
          const compressedBlob = await compressImage(src);
          
          // 2. Prepare for upload
          const fileName = `optimized-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
          const file = new File([compressedBlob], fileName, { type: 'image/jpeg' });

          const formData = new FormData();
          formData.append('file', file);

          // 3. Upload to the existing API endpoint
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (res.ok) {
            const { url } = await res.json();
            img.setAttribute('src', url);
            // Add native lazy loading for performance
            img.setAttribute('loading', 'lazy');
            hasChanges = true;
          }
        } catch (error) {
          console.error('Error processing embedded image:', error);
          // Fallback: leave it as base64 if upload fails, though it might hit 413
        }
      })();
      
      processPromises.push(uploadPromise);
    }
  }

  // Wait for all images to be uploaded in parallel
  if (processPromises.length > 0) {
    await Promise.all(processPromises);
  }

  return hasChanges ? doc.body.innerHTML : htmlString;
};
