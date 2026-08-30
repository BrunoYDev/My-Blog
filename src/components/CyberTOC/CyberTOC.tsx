'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './CyberTOC.module.css';

export interface Heading {
  id: string;
  title: string;
  level: number;
}

/**
 * CyberTOC - Fixed HUD-style Table of Contents.
 * Positions itself on the right side of the viewport with position: fixed.
 * Uses direct DOM manipulation for active heading to avoid React re-renders
 * that would overwrite Google Translate's text modifications.
 */
export function CyberTOC({ headings }: { headings: Heading[] }) {
  const asideRef = useRef<HTMLElement>(null);
  const isCollapsedRef = useRef(false);

  // Handle active heading via direct DOM manipulation (no React re-render)
  // This preserves Google Translate modifications to the TOC text
  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.isConnected) {
            const aside = asideRef.current;
            if (!aside) return;

            // Remove active from all links
            aside.querySelectorAll(`.${styles.active}`).forEach((el) => {
              el.classList.remove(styles.active);
            });
            // Remove all cursor spans
            aside.querySelectorAll(`.${styles.cursor}`).forEach((el) => {
              el.remove();
            });

            // Add active to matching link
            const activeLink = aside.querySelector(
              `a[href="#${entry.target.id}"]`
            );
            if (activeLink) {
              activeLink.classList.add(styles.active);
              // Insert cursor span
              const cursor = document.createElement('span');
              cursor.className = styles.cursor;
              cursor.textContent = '>';
              activeLink.insertBefore(cursor, activeLink.firstChild);
            }
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const timeoutId = setTimeout(() => {
      headings.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el && el.isConnected) observer.observe(el);
      });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [headings]);

  // Handle visibility based on article boundaries
  useEffect(() => {
    const handleScroll = () => {
      try {
        const aside = asideRef.current;
        const article = document.getElementById('post-article');
        if (!aside || !article || !article.isConnected) return;

        const articleRect = article.getBoundingClientRect();
        const tocHeight = aside.offsetHeight;

        // Hide if article hasn't started
        if (articleRect.top > window.innerHeight) {
          aside.style.opacity = '0';
          aside.style.pointerEvents = 'none';
          return;
        }

        // Hide if article is fully scrolled past
        if (articleRect.bottom < tocHeight + 80) {
          aside.style.opacity = '0';
          aside.style.pointerEvents = 'none';
          return;
        }

        aside.style.opacity = '1';
        aside.style.pointerEvents = 'auto';
      } catch {
        // Silently handle DOM errors
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const t = setTimeout(handleScroll, 100);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle handler via DOM (no state = no re-render = translation preserved)
  const handleToggle = useCallback(() => {
    const aside = asideRef.current;
    if (!aside) return;
    isCollapsedRef.current = !isCollapsedRef.current;
    aside.classList.toggle(styles.collapsed, isCollapsedRef.current);
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside ref={asideRef} className={styles.tocContainer}>
      <div className={styles.tocHeader}>
        <div>
          <span className={styles.tocIcon}>{'//'}</span> INDEX
        </div>
        <button
          className={styles.toggleBtn}
          onClick={handleToggle}
          title="Minimizar/Expandir Sumário"
        >
          [-]
        </button>
      </div>
      <nav className={styles.tocNav}>
        <ul className={styles.tocList}>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${styles.tocItem} ${styles[`level${heading.level}`]}`}
            >
              <a
                href={`#${heading.id}`}
                className={styles.tocLink}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={styles.expandBtn}
        onClick={handleToggle}
        title="Expandir Sumário"
      >
        {'// [+]'}
      </button>
    </aside>
  );
}
