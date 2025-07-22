import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";
import styles from "./blog.module.css";

export default async function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.pageTitle}>☆★☆ My Blog ☆★☆</h1>

      <div className={styles.postList}>
        {allPostsData.map(({ id, date, title, author, excerpt }) => (
          <article key={id} className={styles.postSnippet}>
            <header>
              <h2 className={styles.postTitle}>
                <Link href={`/blog/${id}`} className={styles.postLink}>
                  {title}
                </Link>
              </h2>
              <small className={styles.postMeta}>
                Published in {date} by {author}
              </small>
            </header>

            <p className={styles.postExcerpt}>
                {excerpt}
            </p>

            <Link href={`/blog/${id}`} className={styles.readMoreLink}>
              Read Complete Post »
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
