import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";

import { kv } from "@vercel/kv";
import { ViewCounterTrigger } from "@/components/ViewCounterTrigger/ViewCounterTrigger";
import { ColorfulCounter } from "@/components/ColourfulCounter/ColourfulCounter";
import { LatestShouts } from "@/components/LatestShouts/LatestShouts";

const getTodayKey = () => {
  const today = new Date().toISOString().split("T")[0];
  return `daily_visits_${today}`;
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const latestPosts = getSortedPostsData().slice(0, 3);

  const todayKey = getTodayKey();
  const totalVisitsPromise = kv.get<number>("total_unique_visitors");
  const dailyVisitsPromise = kv.get<number>(todayKey);

  const [totalVisits, dailyVisits] = await Promise.all([
    totalVisitsPromise,
    dailyVisitsPromise,
  ]);

  return (
    <>
    <ViewCounterTrigger />
      <div className={styles.homeContainer}>
        <main className={styles.mainContent}>
          <section className={styles.welcomeBanner}>
            <Image src="/images/msDog.gif" width={80} height={80} alt="Microsoft Dog GIF" unoptimized />
            <Image src="/images/welcome.gif" width={640} height={80} alt="Welcome GIF" unoptimized />
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
                    <Image src="/images/blueArrowSpinning.gif" width={25} height={15} alt="Blue Arrow GIF" unoptimized />
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
            <Image style={{ marginRight: "5px" }} src="/images/profilePicture.jpg" width={80} height={80} alt="My profile picture" />
            <Image src="/images/riddleReality.gif" width={310} height={80} alt="Riddle Reality GIF" />
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
              <LatestShouts />
            </div>
          </section>

          <section className={styles.widgetBox}>
            <h2>Visitor Stats</h2>
            <div className={styles.visitorStats}>
              <span>Daily Visits:</span>
              <div>   
                <ColorfulCounter count={dailyVisits ?? 0} />
              </div>
              <div className={styles.divider}></div>
              <span>Total Visits:</span>
              <div>
                <ColorfulCounter count={totalVisits ?? 0} />
              </div>
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

    </>
  );
}
