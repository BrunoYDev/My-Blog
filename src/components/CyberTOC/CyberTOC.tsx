'use client';

import { useState } from 'react';
import { useActiveHeading } from '@/hooks/useActiveHeading';
import styles from './CyberTOC.module.css';

export interface Heading {
  id: string;
  title: string;
  level: number;
}

export function CyberTOC({ headings }: { headings: Heading[] }) {
  const activeId = useActiveHeading(headings.map((h) => h.id));
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (headings.length === 0) return null;

  if (isCollapsed) {
    return (
      <aside className={`${styles.tocContainer} ${styles.collapsed}`}>
        <button 
          className={styles.toggleBtn} 
          onClick={() => setIsCollapsed(false)}
          title="Expandir Sumário"
        >
          <span className={styles.tocIcon}>{'//'}</span> [+]
        </button>
      </aside>
    );
  }

  return (
    <aside className={styles.tocContainer}>
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
    </aside>
  );
}
