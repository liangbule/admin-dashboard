import { logger, LogType } from './logger';

type AnyFunction = (...args: unknown[]) => unknown;

interface PerformanceMetrics {
  dns: number;
  tcp: number;
  request: number;
  dom: number;
  whiteScreen: number;
  domReady: number;
  onload: number;
  navigation: NavigationMetrics;
}

interface NavigationMetrics {
  type: string;
  redirectCount: number;
  size: number;
}

interface PerformanceData {
  dns: number;
  tcp: number;
  request: number;
  dom: number;
  total: number;
  navigation: NavigationMetrics;
}

// 防抖函数
export function debounce<T extends AnyFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// 节流函数
export function throttle<T extends AnyFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let previous = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - previous > wait) {
      func.apply(this, args);
      previous = now;
    }
  };
}

// 性能监控
export function performanceMonitor() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const timing = window.performance.timing;
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    const metrics: PerformanceMetrics = {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseEnd - timing.requestStart,
      dom: timing.domComplete - timing.domLoading,
      whiteScreen: timing.responseStart - timing.navigationStart,
      domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
      onload: timing.loadEventEnd - timing.navigationStart,
      navigation: {
        type: navigation.type,
        redirectCount: navigation.redirectCount,
        size: navigation.transferSize
      }
    };

    logger.info(LogType.SYSTEM, '页面性能指标', metrics);
  }
}

export const measurePerformance = (): PerformanceData | null => {
  if (window.performance) {
    const timing = window.performance.timing;
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseEnd - timing.requestStart,
      dom: timing.domComplete - timing.domLoading,
      total: timing.loadEventEnd - timing.navigationStart,
      navigation: {
        type: navigation.type,
        redirectCount: navigation.redirectCount,
        size: navigation.transferSize
      }
    };
  }
  return null;
}; 