import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePerformanceMode } from '../lib/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad: externalOnLoad
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { isLowEnd, reducedMotion } = usePerformanceMode();

  // Generate blur data URL if not provided
  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

  // Adjust quality based on device capabilities
  const optimizedQuality = isLowEnd ? Math.min(quality, 50) : quality;

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
    if (externalOnLoad) {
      externalOnLoad();
    }
  };

  // Handle image load error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback component
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ width: width || 'auto', height: height || 'auto' }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={optimizedQuality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${reducedMotion ? '' : 'transition-opacity'}`}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes: {
    sm?: { width: number; height: number };
    md?: { width: number; height: number };
    lg?: { width: number; height: number };
    xl?: { width: number; height: number };
  };
  priority?: boolean;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes,
  priority = false,
  className = ''
}) => {
  const [currentSize, setCurrentSize] = useState(sizes.sm || sizes.md || sizes.lg || sizes.xl!);
  const { isLowEnd } = usePerformanceMode();

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      
      if (width < 640 && sizes.sm) {
        setCurrentSize(sizes.sm);
      } else if (width < 768 && sizes.md) {
        setCurrentSize(sizes.md);
      } else if (width < 1024 && sizes.lg) {
        setCurrentSize(sizes.lg);
      } else if (sizes.xl) {
        setCurrentSize(sizes.xl);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, [sizes]);

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={currentSize.width}
      height={currentSize.height}
      priority={priority}
      className={className}
      quality={isLowEnd ? 50 : 75}
    />
  );
};

// Lazy loaded image component
interface LazyImageProps extends OptimizedImageProps {
  rootMargin?: string;
  threshold?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  rootMargin = '50px',
  threshold = 0.1,
  ...rest
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    const imgElement = document.getElementById(`lazy-img-${src}`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => observer.disconnect();
  }, [src, rootMargin, threshold, priority]);

  const handleLoad = () => {
    setHasLoaded(true);
  };

  return (
    <div 
      id={`lazy-img-${src}`}
      className={`relative ${className}`}
      style={{ width: width || 'auto', height: height || 'auto' }}
    >
      {isInView && (
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={hasLoaded ? 'opacity-100' : 'opacity-0'}
          onLoad={handleLoad}
          {...rest}
        />
      )}
      
      {/* Placeholder */}
      {!isInView && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// Picture component for art direction
interface PictureImageProps {
  sources: {
    srcSet: string;
    media?: string;
    type?: string;
  }[];
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export const PictureImage: React.FC<PictureImageProps> = ({
  sources,
  fallbackSrc,
  alt,
  width,
  height,
  className = '',
  priority = false
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            media={source.media}
            type={source.type}
          />
        ))}
        <Image
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </picture>
      
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default OptimizedImage;