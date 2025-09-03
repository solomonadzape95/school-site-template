import {type ImageInfo } from './types';

// Cache for images to avoid repeated API calls
let imagesCache: ImageInfo[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all images from the backend
 */
export const fetchImages = async (): Promise<ImageInfo[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/images');
    if (response.ok) {
      const data = await response.json();
      imagesCache = data;
      cacheTimestamp = Date.now();
      return data;
    } else {
      console.error('Failed to fetch images');
      return [];
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

/**
 * Get images from cache or fetch from backend
 */
export const getImages = async (): Promise<ImageInfo[]> => {
  const now = Date.now();
  
  if (imagesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return imagesCache;
  }
  
  return await fetchImages();
};

/**
 * Get images that are used in a specific location
 */
export const getImagesByUsage = async (usageId: string): Promise<ImageInfo[]> => {
  const images = await getImages();
  return images.filter(image => image.usedAt.includes(usageId));
};

/**
 * Get the default image
 */
export const getDefaultImage = async (): Promise<ImageInfo | null> => {
  try {
    const response = await fetch('http://localhost:3000/api/images/default');
    if (response.ok) {
      return await response.json();
    } else {
      // If no default image found, get the first image or return null
      const images = await getImages();
      return images.find(img => img.isDefault) || images[0] || null;
    }
  } catch (error) {
    console.error('Error fetching default image:', error);
    return null;
  }
};

/**
 * Get an image for a specific usage, falling back to default if none found
 */
export const getImageForUsage = async (usageId: string): Promise<ImageInfo | null> => {
  const usageImages = await getImagesByUsage(usageId);
  
  if (usageImages.length > 0) {
    // Return the first image found for this usage
    return usageImages[0];
  }
  
  // Fall back to default image
  return await getDefaultImage();
};

/**
 * Get image URL with proper fallback
 */
export const getImageUrl = (image: ImageInfo | null): string => {
  if (!image) {
    // Return default placeholder SVG
    return '/src/assets/default-placeholder.svg';
  }
  
  if (image.imageUrl.startsWith('http')) {
    return image.imageUrl;
  }
  
  return `http://localhost:3000${image.imageUrl}`;
};

/**
 * Clear the images cache (useful after updates)
 */
export const clearImagesCache = (): void => {
  imagesCache = null;
  cacheTimestamp = 0;
};
