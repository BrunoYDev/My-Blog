'use client';

import { useState, useEffect, useRef } from 'react';

export function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');
  // Keep a stable reference to avoid re-creating the observer on every render
  const idsRef = useRef(headingIds);
  idsRef.current = headingIds;

  useEffect(() => {
    // Guard: don't run if there are no heading IDs
    if (!headingIds || headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    // Small delay to ensure DOM elements are rendered after navigation
    const timeoutId = setTimeout(() => {
      headingIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [headingIds]);

  return activeId;
}
