import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

function DividerGif({ src }: { src: string }) {
  return (
    <div className={styles.divider}>
      <Image
        src={src}
        alt="decorative divider"
        width={760}
        height={70}
        unoptimized
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <Image
          src="/images/me.jpg"
          alt="Me, literrally"
          width={150}
          height={150}
          className={styles.avatar}
        />
        <div className={styles.introText}>
          <h1>Bruno R Garcia</h1>
          <p className={styles.tagline}>
            Game Developer & Old Web Enthusiast
          </p>
        </div>
      </section>

      <DividerGif src="/images/powerLine.gif" />

      <section className={styles.widgetBox}>
        <h2>
          Who am I
          <Image
            src="/images/questionMark.gif"
            width={40}
            height={25}
            alt="QUESTION GIF"
            unoptimized
          />
        </h2>
        <p>
          Born in 2003, I&apos;m a developer who&apos;s weirdly nostalgic for an
          era I never actually lived in. My first contact with this kind of
          aesthetic wasn&apos;t the chaotic web of the early 2000s though, it
          was the glossy world of Windows Vista and Windows 7, the whole
          Frutiger Aero thing.
        </p>
        <p>
          I mostly work on games using the Godot engine. I like building the
          logic and systems that make things tick, and I want to eventually
          get into engine engineering. I&apos;m not really a frontend guy, but I
          think the Y2K aesthetic is cool because back then every website
          actually looked different. Before social media turned everything
          into the same template.
        </p>
        <p>
          Right now I&apos;m looking for my first job as a developer. Until
          then I&apos;m just working on my own stuff, applying what I learn in
          my CS degree to make games and mess around with mechanics. You can
          check out my projects on{" "}
          <a href="https://ykkos2.itch.io/" target="_blank">
            itch.io
          </a>{" "}
          and{" "}
          <a href="https://github.com/BrunoYDev" target="_blank">
            GitHub
          </a>
          .
        </p>

        <div className={styles.interestsContainer}>
          <div>
            {" "}
            <h4>✧ Likes & Interests ✧</h4>
            <ul className={styles.likesList}>
              <li>Sci-Fi (Doctor Who, Star Wars, LotR)</li>
              <li>80s Anime Aesthetics</li>
              <li>Game Development (Unity/Godot/etc.)</li>
              <li>Classic Rock & City Pop</li>
              <li>The Frutiger Aero design philosophy</li>
            </ul>
          </div>
          <Image
            src="/images/eternalOzzy.gif"
            alt="Decorative GIF"
            width={300}
            height={180}
            unoptimized
            className={styles.interestsGif}
          />
        </div>
      </section>

      <DividerGif src="/images/megaLine.gif" />

      <section className={styles.widgetBox}>
        <h2>About This Site</h2>
        <div className={styles.siteInfo}>
          <div className={styles.siteInfoText}>
            <p>
              This is my personal site and kind of a throwback to the early
              internet. It&apos;s built with Next.js, React, and Vercel, but
              styled to look like something from the Y2K era. You&apos;ll find
              dev stuff, personal thoughts, and way too many animated GIFs.
            </p>
            <p>
              I&apos;m from Brazil but I write in English here. There&apos;s
              a language selector up top if you want to read in Portuguese
              or German. The Guestbook is open for any language though, write
              in whatever you want.
            </p>
          </div>

          <Image
            src="/images/homerSimpsonBush.gif"
            alt="Homer Simpson backing into bushes"
            width={120}
            height={90}
            unoptimized
          />
        </div>
      </section>

      <DividerGif src="/images/barLine.gif" />

      <section className={styles.widgetBox}>
        <Image
          src="/images/myLinks.gif"
          alt="My links gif"
          width={200}
          height={45}
          unoptimized
        />
        <div className={styles.links}>
          <Link href="https://github.com/BrunoYDev" target="_blank">
            <Image
              src="/images/githubIcon.gif"
              width={50}
              height={50}
              unoptimized
              alt="GitHub"
            />
            My GitHub
          </Link>
          <Link href="https://ykkos2.itch.io/" target="_blank">
            <Image
              src="/images/itchIoIcon.gif"
              width={50}
              height={50}
              unoptimized
              alt="Itch.io"
            />
            My Itch.io
          </Link>
          <Link href="https://steamcommunity.com/id/YkkoAikko" target="_blank">
            <Image
              src="/images/steamIcon.gif"
              width={50}
              height={50}
              unoptimized
              alt="Steam"
            />
            My Steam
          </Link>
        </div>
      </section>
    </div>
  );
}
