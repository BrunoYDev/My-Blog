import { getSortedPostsData } from '../../../../../lib/posts';
import Link from 'next/link';
import styles from '../../blog.module.css';
import { PaginationControls } from '@/components/PaginationControls/PaginationControls' ;
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FormattedDate } from '@/components/FormattedDate/FormattedDate';

const POSTS_PER_PAGE = 5;

export async function generateStaticParams() {
  const allPosts = getSortedPostsData();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    pageNumber: (i + 2).toString(),
  }));
}

export default async function PaginatedBlogPage({ params }: { params: Promise<{ pageNumber: string }> }) {
  const { pageNumber } = await params;
  const page = parseInt(pageNumber);
  const allPosts = getSortedPostsData();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  if (page > totalPages || page < 1) {
    notFound();
  }

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const postsToShow = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.pageTitle}>☆★☆ Meu Blog (Página {page}) ☆★☆</h1>
      <div className={styles.postList}>
        {postsToShow.map(({ id, date, title, excerpt, author }) => (
          <article key={id} className={styles.postSnippet}>
            <header>
              <h2 className={styles.postTitle}>
                <Image src="/images/blueArrowSpinning.gif" width={25} height={15} alt="GIF de seta azul" unoptimized />
                <Link href={`/blog/${id}`} className={styles.postLink}>{title}</Link>
              </h2>
              <small className={styles.postMeta}>Publicado em <FormattedDate dateString={date} /> por {author}</small>
            </header>
            <p className={styles.postExcerpt}>{excerpt}</p>

            <Link href={`/blog/${id}`} className={styles.readMoreLink}>
              Ler post completo »
            </Link>
          </article>
        ))}
      </div>

      <PaginationControls currentPage={page} totalPages={totalPages} basePath="/blog" />
    </section>
  );
}
