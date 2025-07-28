// src/app/tags/[tag]/page.tsx (Agora é a Página 1 da Tag)
import { getAllTags, getPostsByTag } from '../../../../lib/posts';
import Link from 'next/link';
import styles from '@/app/blog/blog.module.css';
import { PaginationControls } from '@/components/PaginationControls/PaginationControls';

const POSTS_PER_PAGE = 5;

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({ tag: tag }));
}

export default async function TagIndexPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const postsForTag = getPostsByTag(tag);
  const totalPages = Math.ceil(postsForTag.length / POSTS_PER_PAGE);

  const postsToShow = postsForTag.slice(0, POSTS_PER_PAGE);

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.pageTitle}>Posts tagged with: #{tag}</h1>
      <div className={styles.postList}>
        {postsToShow.map(({ id, date, title, excerpt, author }) => (
          <article key={id} className={styles.postSnippet}>
            <header>
              <h2 className={styles.postTitle}>
                <Link href={`/blog/${id}`} className={styles.postLink}>{title}</Link>
              </h2>
              <small className={styles.postMeta}>Posted on {date} by {author}</small>
            </header>
            <p className={styles.postExcerpt}>{excerpt}</p>
          </article>
        ))}
      </div>

      <PaginationControls currentPage={1} totalPages={totalPages} basePath={`/tags/${tag}`} />
    </section>
  );
}