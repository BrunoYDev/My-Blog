import { getAllTags, getPostsByTag } from '../../../../lib/posts';
import Link from 'next/link';
import styles from '@/app/blog/blog.module.css';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({ tag: tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const posts = getPostsByTag(tag);

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.pageTitle}>Posts with #{tag} tag</h1>
      <div className={styles.postList}>
        {posts.map(({ id, date, title, excerpt }) => (
          <article key={id} className={styles.postSnippet}>
            <header>
              <h2 className={styles.postTitle}>
                <Link href={`/blog/${id}`} className={styles.postLink}>{title}</Link>
              </h2>
              <small className={styles.postMeta}>Published in {date}</small>
            </header>
            <p className={styles.postExcerpt}>{excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}