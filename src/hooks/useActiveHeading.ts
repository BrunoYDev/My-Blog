'use client';

import { useState, useEffect, useRef } from 'react';

export function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!headingIds || headingIds.length === 0) return;

    // Disconnect any previous observer
    observerRef.current?.disconnect();

    const observe = () => {
      try {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              // Guard: make sure the element is still in the DOM
              if (entry.isIntersecting && entry.target.isConnected) {
                setActiveId(entry.target.id);
              }
            }
          },
          { rootMargin: '0px 0px -80% 0px' }
        );

        observerRef.current = observer;

        headingIds.forEach((id) => {
          const element = document.getElementById(id);
          if (element && element.isConnected) {
            observer.observe(element);
          }
        });
      } catch {
        // Silently fail if DOM is being rewritten (e.g. Google Translate)
      }
    };

    // Delay to ensure DOM elements are rendered after navigation / translation
    const timeoutId = setTimeout(observe, 150);

    return () => {
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [headingIds]);

  return activeId;
}
