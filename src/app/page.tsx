import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";

import { kv } from "@vercel/kv";
import { ViewCounterTrigger } from "../components/ViewCounterTrigger/ViewCounterTrigger";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const latestPosts = getSortedPostsData().slice(0, 3);

  const pageviews = (await kv.get<number>("pageviews")) ?? 0;

  return (
    <>
      <div className={styles.homeContainer}>
        <main className={styles.mainContent}>
          <section className={styles.welcomeBanner}>
            {/* TODO: Replace this h1 with a cool animated text GIF! */}
            <h1>Welcome to my Digital Lair!</h1>
          </section>

          <p className={styles.introText}>
            Hey there, I am Bruno. This is my personal corner of the web—a
            devlog, a time capsule, and a lab for my web experiments. Glad you
            stopped by. Feel free to look around.
          </p>

          <section className={styles.widgetBox}>
            <h2>Latest from the Blog</h2>
            <div className={styles.postsContainer}>
              {latestPosts.map(({ id, title, date, excerpt }) => (
                <article key={id} className={styles.postSnippet}>
                  <h3>
                    <Link href={`/blog/${id}`}>{title}</Link>
                  </h3>
                  <small>Posted on: {date}</small>
                  <p>{excerpt}</p>
                  <Link href={`/blog/${id}`} className={styles.readMoreLink}>
                    Read Complete Post »
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <section className={styles.widgetBox}>
            <h2>Who Am I?</h2>
            {/* <Image src="/avatar.png" width={80} height={80} alt="My pixel art avatar" /> */}
            <p>
              Developer by day, web archaeologist by night. Passionate about the
              creative energy of the old web.
              <Link href="/about" className={styles.moreInfoLink}>
                More info...
              </Link>
            </p>
          </section>

          <section className={styles.widgetBox}>
            <h2>Shoutbox!</h2>
            <div className={styles.placeholderBox}>
              <p>Guestbook preview coming soon!</p>
              <p>You will be able to see the latest messages here.</p>
            </div>
          </section>

          <section className={styles.widgetBox}>
            <h2>You are visitor #</h2>
            <div className={styles.placeholderBox}>
              <p className={styles.visitorCount}>
                {pageviews.toLocaleString("en-US")}
              </p>
            </div>
          </section>

          {/* --- Under Construction Widget --- */}
          <section className={styles.widgetBox}>
            <h2>Under Construction 🚧</h2>
            <Image
              src="/images/construction.gif"
              width={400}
              height={80}
              alt="Site under construction"
              unoptimized
            />
            <p>New sections are currently being built!</p>
          </section>
        </aside>
      </div>

      <ViewCounterTrigger />
    </>
  );
}
