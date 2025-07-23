// src/app/blog/layout.tsx
import Link from 'next/link';
import { getGroupedPostsData, getAllTags } from '../../../../lib/posts';
import styles from './tag-layout.module.css';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const groupedPosts = getGroupedPostsData();
  const allTags = getAllTags();

  const sortedYears = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

  return (
    <div className={styles.container}>

      <main className={styles.content}>
        {children}
      </main>

      <aside className={styles.sidebar}>
        
        <details className={styles.detailsSection} open>
          <summary className={styles.summary}>📂 Posts By Data</summary>
          {sortedYears.map(year => (
            <details key={year} className={styles.yearDetails}>
              <summary className={styles.yearSummary}> {year}</summary>
              {Object.keys(groupedPosts[year]).sort((a, b) => b.localeCompare(a)).map(month => {
                const postsInMonth = groupedPosts[year][month];
                
                const monthName = new Date(`${year}-${month}-01T12:00:00Z`).toLocaleString('pt-BR', { month: 'long' });
                
                return (
                  <details key={month} className={styles.monthDetails}>
                    <summary className={styles.monthSummary}>- {monthName} ({postsInMonth.length})</summary>
                    <ul className={styles.linkList}>
                      {postsInMonth.map(post => (
                        <li key={post.id}>
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </details>
          ))}
        </details>

        <details className={styles.detailsSection} open>
          <summary className={styles.summary}>🏷️ Tags Navigation</summary>
          <div className={styles.tagCloud}>
            {allTags.map(tag => (
              <Link key={tag} href={`/tags/${tag}`} className={styles.tag}>
                {tag}
              </Link>
            ))}
          </div>
        </details>
      </aside>
      
    </div>
  );
}