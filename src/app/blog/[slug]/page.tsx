import { notFound } from "next/navigation";
import { getAllPostIds, getPostDataWithHidden } from "../../../../lib/posts";
import styles from "./post.module.css";
import Link from "next/link";
import { FormattedDate } from "@/components/FormattedDate/FormattedDate";
import { CenteredImage } from "../../../components/CenteredImage/CenteredImage";
import { YouTube } from "@/components/Youtube/Youtube";
import GithubSlugger from "github-slugger";
import { CyberTOC, Heading } from "@/components/CyberTOC/CyberTOC";

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({ slug: path.params.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const postData = await getPostDataWithHidden(slug);

    if (!postData || postData.hidden) {
      notFound();
    }

    const { default: PostContent, frontmatter: metadata } = await import(
      `../../../../posts/${slug}.mdx`
    );

    const headings: Heading[] = [];
    if (metadata.showToc) {
      const slugger = new GithubSlugger();
      const headingRegex = /^(##|###)\s+(.+)$/gm;
      let match;
      while ((match = headingRegex.exec(postData.content)) !== null) {
        const level = match[1].length;
        const title = match[2]
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
          .replace(/[*_`]/g, "")
          .trim();
        // We slugify the raw title text to match rehype-slug, but note that rehype-slug might handle markdown
        // differently. Stripping basic markdown from title first is usually safer for visual display.
        // github-slugger handles plain text exactly like rehype-slug.
        // However, github-slugger slugifies the raw text. Let's make sure it matches.
        const rawTitleForSlug = match[2]
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
          .replace(/[*_`]/g, "")
          .trim();
        const id = slugger.slug(rawTitleForSlug);
        headings.push({ id, title, level });
      }
    }

    return (
      <div className={styles.postLayout}>
        <article className={styles.postArticle} id="post-article">
          <div className={styles.postHeader}>
            <h1 className={styles.postTitle}>{metadata.title}</h1>
            <div className={styles.postMeta}>
              Publicado em <FormattedDate dateString={metadata.date} /> por{" "}
              {metadata.author}
            </div>

            {metadata.tags && (
              <div className={styles.tagList}>
                <strong style={{ color: "#333" }}>Tags:</strong>
                {metadata.tags.map((tag: string) => (
                  <Link key={tag} href={`/tags/${tag}`} className={styles.tag}>
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={styles.postBodyContainer}>
            <div className={styles.postContent}>
              <PostContent components={{ CenteredImage, YouTube }} />
            </div>

            {metadata.showToc && (
              <div className={styles.tocWrapper}>
                <CyberTOC headings={headings} />
              </div>
            )}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
