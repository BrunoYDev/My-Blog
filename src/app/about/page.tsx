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
          <p className={styles.tagline}>Digital Time Traveler & Backend Engineer</p>
        </div>
      </section>

      <DividerGif src="/images/powerLine.gif" />

      <section className={styles.widgetBox}>
        <h2>Who am I
          <Image src="/images/questionMark.gif" width={40} height={25} alt="QUESTION GIF" unoptimized />
        </h2>
        <p>
          Born in 2003, I'm a developer who's nostalgic for an era I never
          really lived in. My first real contact with this kind of aesthetic
          wasn't the chaotic web of the early 2000s, but the glossy, optimistic
          world of Windows Vista and Windows 7, where the Frutiger Aero style
          reigned supreme.
        </p>
        <p>
          I'm primarily a backend developer—I love building the logic and the
          engines that make things run. Styling and frontend aren't my main
          passion, but I have a deep appreciation for the Y2K aesthetic because
          it represents a time when every website had its own unique soul, long
          before social media templates made every page look the same. I'm here
          for the weird, the wonderful, and the wildly different backgrounds.
        </p>
        <p>
          While I'm actively looking for my first professional role as a
          developer, I spend my time creating my own worlds by developing games,
          which you can find over on my{" "}
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
              This website is my personal digital garden and a love letter to
              the early internet. It's built with modern tech like Next.js,
              React, and Vercel, but with a soul firmly planted in the Y2K
              aesthetic. Expect to find code experiments, personal thoughts, and
              a lot of animated GIFs.
            </p>
            <p>
              You might notice I'm from Brazil, but the site is primarily in
              English—mostly because I feel like it. That said, please feel free
              to sign the Guestbook in whatever language you're comfortable
              with, be it Portuguese, English, or anything in between. I have no
              plans to add a language selector; the goal is to keep this space
              simple, stylish, and a little bit chaotic, just like the old web
              was meant to be.
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
