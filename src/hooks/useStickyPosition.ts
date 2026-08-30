'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type StickyMode = 'top' | 'fixed' | 'bottom';

export function useStickyPosition(offsetTop = 32) {
  const tocRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<StickyMode>('top');
  const [fixedRight, setFixedRight] = useState<number | undefined>(undefined);

  const handleScroll = useCallback(() => {
    try {
      const toc = tocRef.current;
      const wrapper = wrapperRef.current;
      if (!toc || !wrapper || !toc.isConnected || !wrapper.isConnected) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const tocHeight = toc.offsetHeight;

      const right = window.innerWidth - wrapperRect.right;
      setFixedRight(right);

      if (wrapperRect.top >= offsetTop) {
        setMode('top');
        return;
      }

      if (wrapperRect.bottom <= tocHeight + offsetTop) {
        setMode('bottom');
        return;
      }

      setMode('fixed');
    } catch {
      // Silently fail if DOM is being rewritten (e.g. Google Translate)
    }
  }, [offsetTop]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const getStyle = (): React.CSSProperties => {
    switch (mode) {
      case 'top':
        return { position: 'absolute', top: 0 };
      case 'fixed':
        return {
          position: 'fixed',
          top: `${offsetTop}px`,
          right: fixedRight != null ? `${fixedRight}px` : undefined,
        };
      case 'bottom':
        return { position: 'absolute', bottom: 0 };
    }
  };

  return { tocRef, wrapperRef, style: getStyle() };
}
