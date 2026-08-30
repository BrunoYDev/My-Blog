'use client';

import { useActiveHeading } from '@/hooks/useActiveHeading';
import styles from './CyberTOC.module.css';

export interface Heading {
  id: string;
  title: string;
  level: number;
}

export function CyberTOC({ headings }: { headings: Heading[] }) {
  const activeId = useActiveHeading(headings.map((h) => h.id));

  if (headings.length === 0) return null;

  return (
    <aside className={styles.tocContainer}>
      <div className={styles.tocHeader}>
        <span className={styles.tocIcon}>{'//'}</span> INDEX
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
