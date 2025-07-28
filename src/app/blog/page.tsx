import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";
import styles from "./blog.module.css";
import Image from "next/image";
import { PaginationControls } from "@/components/PaginationControls/PaginationControls";

const POSTS_PER_PAGE = 5;

export default async function BlogPage() {
  const allPosts = getSortedPostsData();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const postsToShow = allPosts.slice(0, POSTS_PER_PAGE);

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.pageTitle}>☆★☆ My Blog ☆★☆</h1>

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

            <Link href={`/blog/${id}`} className={styles.readMoreLink}>
              Read Complete Post »
            </Link>
          </article>
        ))}
      </div>

      <PaginationControls currentPage={1} totalPages={totalPages} basePath="/blog" />
    </section>
  );
}
