'use client';

import { useState } from 'react';
import { useActiveHeading } from '@/hooks/useActiveHeading';
import { useStickyPosition } from '@/hooks/useStickyPosition';
import styles from './CyberTOC.module.css';

export interface Heading {
  id: string;
  title: string;
  level: number;
}

export function CyberTOC({ headings }: { headings: Heading[] }) {
  const activeId = useActiveHeading(headings.map((h) => h.id));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { tocRef, wrapperRef, style } = useStickyPosition(32);

  if (headings.length === 0) return null;

  return (
    <div ref={wrapperRef} className={`${styles.tocWrapperInner} notranslate`}>
      <aside
        ref={tocRef}
        className={`${styles.tocContainer} ${isCollapsed ? styles.collapsed : ''}`}
        style={style}
        translate="no"
      >
        {isCollapsed ? (
          <button
            className={styles.toggleBtn}
            onClick={() => setIsCollapsed(false)}
            title="Expandir Sumário"
          >
            <span className={styles.tocIcon}>{'//'}</span> [+]
          </button>
        ) : (
          <>
            <div className={styles.tocHeader}>
              <div>
                <span className={styles.tocIcon}>{'//'}</span> INDEX
              </div>
              <button
                className={styles.toggleBtn}
                onClick={() => setIsCollapsed(true)}
                title="Minimizar Sumário"
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
                      className={`${styles.tocLink} ${
                        activeId === heading.id ? styles.active : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }}
                    >
                      {activeId === heading.id && (
                        <span className={styles.cursor}>&gt;</span>
                      )}
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </aside>
    </div>
  );
}
