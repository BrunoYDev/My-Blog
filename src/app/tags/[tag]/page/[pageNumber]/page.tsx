// src/app/tags/[tag]/page/[pageNumber]/page.tsx
import { getAllTags, getPostsByTag } from '../../../../../../lib/posts';
import Link from 'next/link';
import styles from '@/app/blog/blog.module.css';
import { notFound } from 'next/navigation';
import { PaginationControls } from '@/components/PaginationControls/PaginationControls';

const POSTS_PER_PAGE = 5;

export async function generateStaticParams() {
  const tags = getAllTags();
  const allParams: { tag: string, pageNumber: string }[] = [];

  tags.forEach(tag => {
    const postsForTag = getPostsByTag(tag);
    const totalPages = Math.ceil(postsForTag.length / POSTS_PER_PAGE);
    for (let i = 2; i <= totalPages; i++) {
      allParams.push({ tag: tag, pageNumber: i.toString() });
    }
  });

  return allParams;
}

export default function PaginatedTagPage({ params }: { params: { tag: string, pageNumber: string } }) {
  const { tag, pageNumber } = params;
  const page = parseInt(pageNumber);

  const postsForTag = getPostsByTag(tag);
  const totalPages = Math.ceil(postsForTag.length / POSTS_PER_PAGE);

  if (page > totalPages || page < 1) {
    notFound();
  }

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const postsToShow = postsForTag.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.pageTitle}>Posts tagged with: #{tag} (Page {page})</h1>
      <div className={styles.postList}>
        {postsToShow.map(({ id, date, title, excerpt, author}) => (
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

      <PaginationControls currentPage={page} totalPages={totalPages} basePath={`/tags/${tag}`} />
    </section>
  );
}