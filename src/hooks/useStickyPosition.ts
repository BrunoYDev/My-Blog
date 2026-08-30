'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type StickyMode = 'top' | 'fixed' | 'bottom';

export function useStickyPosition(offsetTop = 32) {
  const tocRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<StickyMode>('top');
  const [fixedLeft, setFixedLeft] = useState<number>(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const handleScroll = useCallback(() => {
    if (!isMounted.current) return;

    const toc = tocRef.current;
    const wrapper = wrapperRef.current;
    if (!toc || !wrapper) return;

    try {
      if (!wrapper.isConnected) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const tocHeight = toc.getBoundingClientRect().height;

      // Save the left position from the wrapper (stable because wrapper has explicit width)
      setFixedLeft(wrapperRect.left);

      // Top of wrapper is below the offset → stay at natural top
      if (wrapperRect.top >= offsetTop) {
        setMode('top');
        return;
      }

      // Bottom of wrapper is too close → anchor to bottom
      if (wrapperRect.bottom <= tocHeight + offsetTop) {
        setMode('bottom');
        return;
      }

      // Otherwise → fix to viewport
      setMode('fixed');
    } catch {
      // DOM may be in a transitional state (e.g. Google Translate rewrite)
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
        return { position: 'absolute', top: 0, right: 0 };
      case 'fixed':
        return {
          position: 'fixed',
          top: `${offsetTop}px`,
          left: `${fixedLeft}px`,
        };
      case 'bottom':
        return { position: 'absolute', bottom: 0, right: 0 };
    }
  };

  return { tocRef, wrapperRef, style: getStyle() };
}
