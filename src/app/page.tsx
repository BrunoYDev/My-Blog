import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { getPinnedPost, getSortedPostsData } from "../../lib/posts";

import { kv } from "@vercel/kv";
import { ViewCounterTrigger } from "@/components/ViewCounterTrigger/ViewCounterTrigger";
import { ColorfulCounter } from "@/components/ColourfulCounter/ColourfulCounter";
import { LatestShouts } from "@/components/LatestShouts/LatestShouts";
import { FormattedDate } from "@/components/FormattedDate/FormattedDate";

const getTodayKey = () => {
  const today = new Date().toISOString().split("T")[0];
  return `daily_visits_${today}`;
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const pinnedPost = getPinnedPost();
  const allPosts = getSortedPostsData();

  const latestPosts = allPosts
    .filter((post) => post.id !== pinnedPost?.id) // Exclui o post fixado da lista
    .slice(0, 3);

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
            <Image
              src="/images/msDog.gif"
              width={80}
              height={80}
              alt="GIF do cachorro da Microsoft"
              unoptimized
            />
            <Image
              src="/images/welcome.gif"
              width={640}
              height={80}
              alt="GIF de boas-vindas"
              unoptimized
            />
          </section>

          <p className={styles.introText}>
            Oi! Eu sou o Bruno. Este é meu cantinho na web onde posto sobre dev,
            jogos e qualquer outra coisa que estiver na minha cabeça. Dá uma
            olhada por aqui.
          </p>

          {pinnedPost && (
            <section className={`${styles.widgetBox} ${styles.pinnedPost}`}>
              <div className={styles.pinnedHeader}>
                <Image src="/images/pin.gif" width={25} height={25} alt="GIF de fixado" unoptimized />
                <h2>Post em destaque</h2>
              </div>
              <article className={styles.postSnippet}>
                <h3>
                  <Image src="/images/blueArrowSpinning.gif" width={25} height={15} alt="GIF de seta azul" unoptimized />
                  <Link href={`/blog/${pinnedPost.id}`}>
                    {pinnedPost.title}
                  </Link>
                </h3>
                <small>Publicado em: <FormattedDate dateString={pinnedPost.date} /> por {pinnedPost.author}</small>
                <p>{pinnedPost.excerpt}</p>

                <Link href={`/blog/${pinnedPost.id}`} className={styles.readMoreLink}>
                    Ler post completo »
                  </Link>
              </article>
            </section>
          )}

          <section className={styles.widgetBox}>
            <Image src="/images/new.gif" width={40} height={25} alt="GIF de novo" unoptimized />
            <h2>Últimos posts do blog</h2>
            <div className={styles.postsContainer}>
              {latestPosts.map(({ id, title, date, excerpt, author }) => (
                <article key={id} className={styles.postSnippet}>
                  <h3>
                    <Image src="/images/blueArrowSpinning.gif" width={25} height={15} alt="GIF de seta azul" unoptimized />
                    <Link href={`/blog/${id}`}>{title}</Link>
                  </h3>
                  <small>
                    Publicado em: <FormattedDate dateString={date} /> por {author}
                  </small>
                  <p>{excerpt}</p>

                  <Link href={`/blog/${id}`} className={styles.readMoreLink}>
                    Ler post completo »
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <section className={styles.widgetBox}>
            <h2>Quem sou eu 
              <Image src="/images/questionMark.gif" width={40} height={25} alt="GIF de interrogação" unoptimized />
            </h2>
            <Image
              style={{ marginRight: "5px" }}
              src="/images/profilePicture.jpg"
              width={80}
              height={80}
              alt="Minha foto de perfil"
            />
            <Image
              src="/images/riddleReality.gif"
              width={310}
              height={80}
              alt="GIF Riddle Reality"
            />
            <p>
              Desenvolvedor que gosta de garimpar coisas da web antiga. Faço
              jogos e quebro coisas na internet.
              <Link href="/about" className={styles.moreInfoLink}>
                Mais info...
              </Link>
            </p>
          </section>

          <section className={styles.widgetBox}>
            <h2>Livro de visitas!
              <Image src="/images/mailbox.gif" width={40} height={25} alt="GIF de correio" unoptimized />
            </h2>
            <div className={styles.placeholderBox}>
              <LatestShouts />
            </div>
          </section>

          <section className={styles.widgetBox}>
            <h2 style={{ display: "flex" }}>Estatísticas de visitantes
              <Image src="/images/randomCounter.gif" style={{ alignSelf: "center", maxWidth: "100%", marginLeft: "15px" }} width={80} height={25} alt="GIF de contador aleatório" unoptimized />
            </h2>
            <div className={styles.visitorStats}>
              <span>Visitas diárias:</span>
              <div>
                <ColorfulCounter count={dailyVisits ?? 0} />
              </div>
              <div className={styles.divider}></div>
              <span>Visitas totais:</span>
              <div>
                <ColorfulCounter count={totalVisits ?? 0} />
              </div>
            </div>
          </section>

          {/* --- Under Construction Widget --- */}
          <section className={styles.widgetBox}>
            <h2>Em construção 🚧</h2>
            <Image
              src="/images/construction.gif"
              width={400}
              height={80}
              alt="Site em construção"
              unoptimized
            />
            <p>Novas seções estão sendo construídas!</p>
          </section>
        </aside>
      </div>
    </>
  );
}
