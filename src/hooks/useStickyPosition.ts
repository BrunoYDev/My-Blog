'use client';

import { useEffect, useRef, useState } from 'react';

type StickyMode = 'top' | 'fixed' | 'bottom';

/**
 * Manually controls sticky positioning for an element inside an absolute wrapper.
 * Returns a ref to attach to the sticky element and the current inline styles.
 *
 * Modes:
 *  - 'top': element sits at the top of its wrapper (hasn't scrolled past yet)
 *  - 'fixed': element is fixed to the viewport as user scrolls
 *  - 'bottom': element is anchored at the bottom of its wrapper (scrolled past)
 */
export function useStickyPosition(offsetTop = 32) {
  const tocRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<StickyMode>('top');

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const toc = tocRef.current;
      if (!toc || !wrapper) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const tocHeight = toc.offsetHeight;

      // Top of wrapper is below the offset → element should stay at natural top
      if (wrapperRect.top >= offsetTop) {
        setMode('top');
        return;
      }

      // Bottom of wrapper is above where the TOC would end → anchor to bottom
      if (wrapperRect.bottom <= tocHeight + offsetTop) {
        setMode('bottom');
        return;
      }

      // Otherwise → fix to viewport
      setMode('fixed');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [offsetTop]);

  const getStyle = (): React.CSSProperties => {
    switch (mode) {
      case 'top':
        return { position: 'absolute', top: 0 };
      case 'fixed':
        return { position: 'fixed', top: `${offsetTop}px` };
      case 'bottom':
        return { position: 'absolute', bottom: 0 };
    }
  };

  return { tocRef, wrapperRef, style: getStyle() };
}
