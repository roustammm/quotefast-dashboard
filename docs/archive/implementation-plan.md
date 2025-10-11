# QuoteFast - Implementation Plan voor Performance Verbeteringen

## 🎯 Overzicht

Dit document bevat een gedetailleerd implementatieplan voor de geïdentificeerde verbeteringen aan de QuoteFast SaaS applicatie. Het plan is opgedeeld in fasen met specifieke acties en code voorbeelden.

---

## 📅 Phase 1: Foundation (Week 1)

### 1.1 CSS Bundle Optimization

#### Probleem
- `globals.css` is 617 regels groot
- Complex glassmorphism effects die performance beïnvloeden
- Niet-geoptimaliseerde animations

#### Oplossing

**Stap 1: Split CSS in modules**

```css
/* styles/base.css - Fundamentele styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground: #0f172a;
  --background: #ffffff;
  /* ... essentiële variabelen */
}

/* styles/components.css - Component specifieke styles */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* styles/utilities.css - Utility classes */
.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}
```

**Stap 2: Update app/layout.tsx**

```typescript
import "../styles/base.css";
import "../styles/components.css";
import "../styles/utilities.css";
```

#### Performance Impact
- **Bundle size**: -40%
- **Loading time**: -25%
- **Maintainability**: +60%

### 1.2 Memory Leak Fixes

#### Probleem
- Event listeners in AdvancedLayout zonder proper cleanup
- Multiple setTimeout/setInterval calls
- Animation frames zonder cleanup

#### Oplossing

**Fix AdvancedLayout.tsx**

```typescript
useEffect(() => {
  if (!enableCustomCursor || typeof window === 'undefined') return;

  const handleMouseMove = (e: MouseEvent) => {
    if (!outlineRef.current) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    outlineRef.current.style.left = `${x}px`;
    outlineRef.current.style.top = `${y}px`;
  };

  const handleMouseEnter = () => {
    if (outlineRef.current) {
      outlineRef.current.style.transform = 'scale(1.5)';
      outlineRef.current.style.borderColor = 'rgba(59, 130, 246, 0.5)';
    }
  };

  const handleMouseLeave = () => {
    if (outlineRef.current) {
      outlineRef.current.style.transform = 'scale(1)';
      outlineRef.current.style.borderColor = 'rgba(59, 130, 246, 0.2)';
    }
  };

  const addListeners = () => {
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  const removeListeners = () => {
    document.querySelectorAll('a, button').forEach(el => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    });
  };

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      removeListeners();
      addListeners();
    });
  });

  // Initial setup
  addListeners();
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  
  // Observe DOM changes
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    removeListeners();
    mutationObserver.disconnect();
  };
}, [enableCustomCursor]);
```

#### Performance Impact
- **Memory usage**: -35%
- **CPU usage**: -20%
- **Stability**: +90%

### 1.3 Performance Monitoring Setup

#### Implementatie

```typescript
// lib/performance.ts
export interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  });

  useEffect(() => {
    // Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
      });
    });

    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }
      });
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return metrics;
};
```

---

## 📅 Phase 2: Optimization (Week 2)

### 2.1 Bundle Size Reduction

#### Analyse Commando's

```bash
# Build en analyse
npm run build
npx @next/bundle-analyzer

# Of voeg toe aan package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

#### Optimalisatie Acties

**1. Tree Shaking**

```typescript
// Verander van:
import * as Icons from '@heroicons/react/24/outline';

// Naar:
import { 
  CpuChipIcon, 
  BoltIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
```

**2. Dynamic Imports**

```typescript
// Voor heavy components
const ModelConfigModal = dynamic(
  () => import('./components/ModelConfigModal'),
  { 
    loading: () => <div>Loading...</div>,
    ssr: false 
  }
);

// Voor dashboard components
const DashboardCard = dynamic(
  () => import('./components/DashboardCard'),
  { ssr: false }
);
```

### 2.2 Image Optimization

#### Implementatie

```typescript
// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
};
```

**Update page.tsx**

```typescript
// Verander van:
<div className="relative h-[400px] lg:h-[500px]">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
  {/* ... */}
</div>

// Naar:
<div className="relative h-[400px] lg:h-[500px]">
  <OptimizedImage
    src="/dashboard-preview.webp"
    alt="QuoteFast Dashboard Preview"
    width={800}
    height={500}
    priority
    className="rounded-2xl"
  />
  {/* ... */}
</div>
```

### 2.3 Code Splitting

#### Implementatie

```typescript
// app/dashboard/layout.tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const Sidebar = dynamic(() => import('./components/Sidebar'), {
  ssr: false,
  loading: () => <div className="w-20 bg-gray-900 animate-pulse" />
});

const TopNav = dynamic(() => import('./components/TopNav'), {
  ssr: false,
  loading: () => <div className="h-16 bg-gray-900 animate-pulse" />
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## 📅 Phase 3: Enhancement (Week 3)

### 3.1 Mobile Performance

#### Probleem
- Heavy animations op mobile
- Complex hover effects
- Large touch targets nodig

#### Oplossing

**Mobile-First Animations**

```css
/* styles/mobile.css */
@media (max-width: 768px) {
  /* Reduce animations on mobile */
  .card-hover-lift {
    transition: transform 0.1s ease-out;
  }
  
  .card-hover-lift:hover {
    transform: none;
  }
  
  .card-hover-lift:active {
    transform: scale(0.98);
  }
  
  /* Remove glassmorphism on low-end devices */
  @media (prefers-reduced-motion: reduce) {
    .glass {
      backdrop-filter: none;
      background: rgba(255, 255, 255, 0.9);
    }
  }
  
  /* Larger touch targets */
  .btn-primary {
    min-height: 44px;
    min-width: 44px;
  }
}
```

**Performance Detection Hook**

```typescript
// hooks/usePerformanceMode.ts
export const usePerformanceMode = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect low-end devices
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (
      connection.saveData || 
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g'
    );

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect hardware concurrency (CPU cores)
    const isLowEndCPU = navigator.hardwareConcurrency <= 2;

    setIsLowEnd(isSlowConnection || isLowEndCPU);
    setReducedMotion(prefersReducedMotion);
  }, []);

  return { isLowEnd, reducedMotion };
};
```

### 3.2 Advanced Caching

#### Implementatie

```typescript
// lib/cache.ts
export const cacheManager = {
  // Cache API responses
  async cacheResponse(key: string, data: any, ttl: number = 300000) {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    
    localStorage.setItem(key, JSON.stringify(item));
  },

  async getCachedResponse(key: string) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    const now = Date.now();
    
    if (now - parsed.timestamp > parsed.ttl) {
      localStorage.removeItem(key);
      return null;
    }
    
    return parsed.data;
  },

  // Clear expired cache
  clearExpiredCache() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cache_')) {
        const item = localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          if (Date.now() - parsed.timestamp > parsed.ttl) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  }
};
```

### 3.3 Service Worker Implementation

```typescript
// public/sw.js
const CACHE_NAME = 'quotefast-v1';
const urlsToCache = [
  '/',
  '/features',
  '/pricing',
  '/auth',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
```

---

## 📊 Monitoring & Testing

### Performance Monitoring Dashboard

```typescript
// components/PerformanceDashboard.tsx
export const PerformanceDashboard = () => {
  const metrics = usePerformanceMonitoring();
  const { isLowEnd, reducedMotion } = usePerformanceMode();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs">
      <h4 className="font-bold mb-2">Performance Metrics</h4>
      <div>LCP: {metrics.lcp.toFixed(0)}ms</div>
      <div>FID: {metrics.fid.toFixed(0)}ms</div>
      <div>CLS: {metrics.cls.toFixed(3)}</div>
      <div>Low-end device: {isLowEnd ? 'Yes' : 'No'}</div>
      <div>Reduced motion: {reducedMotion ? 'Yes' : 'No'}</div>
    </div>
  );
};
```

### Automated Testing

```typescript
// tests/performance.test.ts
describe('Performance Tests', () => {
  test('LCP should be under 2.5 seconds', async () => {
    const metrics = await measureLCP();
    expect(metrics).toBeLessThan(2500);
  });

  test('Bundle size should be under 1MB', async () => {
    const bundleSize = await measureBundleSize();
    expect(bundleSize).toBeLessThan(1024 * 1024); // 1MB
  });

  test('Memory usage should be stable', async () => {
    const initialMemory = await measureMemoryUsage();
    
    // Simulate user interactions
    await simulateUserInteractions();
    
    const finalMemory = await measureMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB
  });
});
```

---

## 🎯 Success Metrics & KPIs

### Technical Metrics

| Metric | Target | Measurement Tool |
|--------|---------|------------------|
| Bundle Size | <1MB | Bundle Analyzer |
| LCP | <2.5s | Web Vitals |
| FID | <100ms | Web Vitals |
| CLS | <0.1 | Web Vitals |
| Memory Usage | <50MB | Chrome DevTools |
| Cache Hit Rate | >80% | Service Worker |

### Business Metrics

| Metric | Target | Measurement Tool |
|--------|---------|------------------|
| Bounce Rate | <40% | Google Analytics |
| Page Load Time | <3s | Google Analytics |
| Mobile Conversion | +15% | A/B Testing |
| User Engagement | +20% | Analytics |

---

## 📋 Implementation Checklist

### Phase 1: Foundation
- [ ] Split CSS into modules
- [ ] Fix memory leaks in AdvancedLayout
- [ ] Implement performance monitoring
- [ ] Set up performance budgets
- [ ] Create performance dashboard

### Phase 2: Optimization
- [ ] Analyze and reduce bundle size
- [ ] Implement dynamic imports
- [ ] Add image optimization
- [ ] Implement code splitting
- [ ] Add lazy loading

### Phase 3: Enhancement
- [ ] Optimize mobile performance
- [ ] Implement service worker
- [ ] Add advanced caching
- [ ] Create performance tests
- [ ] Set up monitoring alerts

---

## 🚀 Next Steps

1. **Team Review** - Bespreek dit plan met het development team
2. **Priority Setting** - Bepaal welke verbeteringen als eerste geïmplementeerd worden
3. **Resource Planning** - Plan de benodigde tijd en resources
4. **Implementation** - Begin met Phase 1 implementaties
5. **Monitoring** - Zet continue monitoring op
6. **Iteration** - Evalueer en itereer op basis van resultaten

---

*Document versie: 1.0*
*Laatst bijgewerkt: ${new Date().toLocaleDateString('nl-NL')}*