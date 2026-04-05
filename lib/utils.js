/**
 * Utility to sanitize and fix common image URL issues
 */
export function sanitizeImageUrl(url) {
  if (!url) return null;
  
  // Fix Unsplash Page URLs (e.g., unsplash.com/photos/xxx) 
  // to Direct Image URLs (images.unsplash.com/xxx)
  const unsplashRegex = /unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/;
  const match = url.match(unsplashRegex);
  
  if (match && match[1]) {
    return `https://images.unsplash.com/photo-${match[1]}?auto=format&fit=crop&q=80&w=1200`;
  }
  
  // Handle general unsplash links that might be missing parameters
  if (url.includes('images.unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&q=80&w=1200`;
  }

  return url;
}
