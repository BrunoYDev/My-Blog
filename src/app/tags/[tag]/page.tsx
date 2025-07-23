import { getAllTags, getPostsByTag } from '../../../../lib/posts';
import Link from 'next/link';
import styles from '@/app/blog/blog.module.css';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({ tag: tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.pageTitle}>Posts with #{tag} tag</h1>
      <div className={styles.postList}>
        {posts.map(({ id, date, title, excerpt, author }) => (
          <article key={id} className={styles.postSnippet}>
            <header>
              <h2 className={styles.postTitle}>
                <Link href={`/blog/${id}`} className={styles.postLink}>{title}</Link>
              </h2>
              <small className={styles.postMeta}>Published in {date} by {author}</small>
            </header>
            <p className={styles.postExcerpt}>{excerpt}</p>

            <Link href={`/blog/${id}`} className={styles.readMoreLink}>
              Read Complete Post »
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}