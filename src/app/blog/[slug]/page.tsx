import { notFound } from 'next/navigation';
import { getAllPostIds } from '../../../../lib/posts';
import styles from './post.module.css';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(path => ({ slug: path.params.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;

  try {
    const { default: PostContent, frontmatter: metadata } = await import(`../../../../posts/${slug}.mdx`);

    return (
      <article className={styles.postArticle}>
        <h1 className={styles.postTitle}>{metadata.title}</h1>
        <div className={styles.postMeta}>
          Published in {metadata.date} by {metadata.author}
        </div>

        {metadata.tags && (
            <div className={styles.tagList}>
              <strong style={{ color: '#333' }}>Tags:</strong>
              {metadata.tags.map((tag: string) => (
                <Link key={tag} href={`/tags/${tag}`} className={styles.tag}>
                  {tag}
                </Link>
              ))}
            </div>
          )}

        <div className={styles.postContent}>
          <PostContent />
        </div>
      </article>
    );
  } catch (error) {

    console.log(error)
    notFound();
  }
}