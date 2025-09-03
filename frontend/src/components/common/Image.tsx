import React, { useState, useEffect } from 'react';
import { getImageForUsage, getImageUrl } from '../../lib/imageUtils';
import { type ImageInfo } from '../../lib/types';

interface ImageProps {
  usageId: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: 'high' | 'low';
}

const Image: React.FC<ImageProps> = ({
  usageId,
  alt,
  className = '',
  fallbackClassName = '',
  onLoad,
  onError,
  priority = 'low'
}) => {
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const imageData = await getImageForUsage(usageId);
        
        if (mounted) {
          setImage(imageData);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [usageId]);

  const handleImageLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setError(true);
    setLoading(false);
    onError?.();
  };

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-200 ${className}`}>
        <div className="w-full h-full bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (error || !image) {
    // Show default placeholder
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className} ${fallbackClassName}`}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#F3F4F6"/>
          <rect x="20" y="20" width="60" height="60" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="2"/>
          <circle cx="50" cy="50" r="15" fill="#9CA3AF"/>
          <path d="M30 70 L70 70 M30 75 L70 75 M30 80 L50 80" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={getImageUrl(image)}
      alt={alt}
      className={className}
      onLoad={handleImageLoad}
      onError={handleImageError}
      loading={priority === 'low' ? 'lazy' : 'eager'}
    />
  );
};

export default Image;
