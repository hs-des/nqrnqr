import { useEffect, useCallback } from 'react';

export const usePerformance = () => {
  // Track page load performance
  useEffect(() => {
    const trackPageLoad = () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        console.log('Page Load Time:', loadTime + 'ms');
        
        // Send to analytics if available
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'load',
            value: Math.round(loadTime)
          });
        }
      }
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
      return () => window.removeEventListener('load', trackPageLoad);
    }
  }, []);

  // Track user interactions
  const trackEvent = useCallback((eventName, eventData = {}) => {
    console.log('Event:', eventName, eventData);
    
    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  }, []);

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track scroll milestones
        if (maxScroll >= 25 && maxScroll < 50) {
          trackEvent('scroll_25_percent');
        } else if (maxScroll >= 50 && maxScroll < 75) {
          trackEvent('scroll_50_percent');
        } else if (maxScroll >= 75 && maxScroll < 100) {
          trackEvent('scroll_75_percent');
        } else if (maxScroll >= 100) {
          trackEvent('scroll_100_percent');
        }
      }
    };

    window.addEventListener('scroll', trackScroll);
    return () => window.removeEventListener('scroll', trackScroll);
  }, [trackEvent]);

  return { trackEvent };
}; 