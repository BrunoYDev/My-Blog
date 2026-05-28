import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

function DividerGif({ src }: { src: string }) {
  return (
    <div className={styles.divider}>
      <Image
        src={src}
        alt="divisor decorativo"
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
          alt="Eu, literalmente"
          width={150}
          height={150}
          className={styles.avatar}
        />
        <div className={styles.introText}>
          <h1>Bruno R Garcia</h1>
          <p className={styles.tagline}>
            Desenvolvedor de jogos e entusiasta da web antiga
          </p>
        </div>
      </section>

      <DividerGif src="/images/powerLine.gif" />

      <section className={styles.widgetBox}>
        <h2>
          Quem sou eu
          <Image
            src="/images/questionMark.gif"
            width={40}
            height={25}
            alt="GIF de interrogação"
            unoptimized
          />
        </h2>
        <p>
          Nascido em 2003, sou um desenvolvedor que sente uma nostalgia meio
          estranha por uma era que eu nem vivi de verdade. Meu primeiro contato
          com essa estética não foi a web caótica do começo dos anos 2000; foi o
          mundo polido do Windows Vista e do Windows 7, todo aquele lance do
          Frutiger Aero.
        </p>
        <p>
          Eu trabalho principalmente com jogos usando a engine Godot. Gosto de
          construir a lógica e os sistemas que fazem as coisas funcionarem, e
          quero eventualmente entrar em engenharia de engines. Não sou muito de
          frontend, mas acho a estética Y2K legal porque naquela época cada site
          realmente era diferente, antes das redes sociais transformarem tudo no
          mesmo template.
        </p>
        <p>
          No momento estou procurando meu primeiro emprego como desenvolvedor.
          Até lá, sigo trabalhando nas minhas próprias coisas, aplicando o que
          aprendo na graduação de Ciência da Computação para fazer jogos e
          brincar com mecânicas. Você pode ver meus projetos no{" "}
          <a href="https://ykkos2.itch.io/" target="_blank">
            itch.io
          </a>{" "}
          e{" "}
          <a href="https://github.com/BrunoYDev" target="_blank">
            GitHub
          </a>
          .
        </p>

        <div className={styles.interestsContainer}>
          <div>
            {" "}
            <h4>✧ Gostos e interesses ✧</h4>
            <ul className={styles.likesList}>
              <li>Ficção científica (Doctor Who, Star Wars, LotR)</li>
              <li>Estética de anime dos anos 80</li>
              <li>Desenvolvimento de jogos (Unity/Godot/etc.)</li>
              <li>Rock clássico e City Pop</li>
              <li>A filosofia de design Frutiger Aero</li>
            </ul>
          </div>
          <Image
            src="/images/eternalOzzy.gif"
            alt="GIF decorativo"
            width={300}
            height={180}
            unoptimized
            className={styles.interestsGif}
          />
        </div>
      </section>

      <DividerGif src="/images/megaLine.gif" />

      <section className={styles.widgetBox}>
        <h2>Sobre este site</h2>
        <div className={styles.siteInfo}>
          <div className={styles.siteInfoText}>
            <p>
              Este é meu site pessoal e uma espécie de homenagem à internet do
              início. Ele é feito com Next.js, React e Vercel, mas estilizado
              para parecer algo da era Y2K. Aqui você encontra coisas de dev,
              pensamentos pessoais e GIFs animados demais.
            </p>
            <p>
              Sou do Brasil e agora escrevo em português aqui. Se quiser ler em
              inglês ou alemão, use o seletor de idioma lá em cima. O Livro de
              Visitas aceita qualquer idioma, então escreva como quiser.
            </p>
          </div>

          <Image
            src="/images/homerSimpsonBush.gif"
            alt="Homer Simpson recuando para os arbustos"
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
          alt="GIF dos meus links"
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
            Meu GitHub
          </Link>
          <Link href="https://ykkos2.itch.io/" target="_blank">
            <Image
              src="/images/itchIoIcon.gif"
              width={50}
              height={50}
              unoptimized
              alt="Itch.io"
            />
            Meu Itch.io
          </Link>
          <Link href="https://steamcommunity.com/id/YkkoAikko" target="_blank">
            <Image
              src="/images/steamIcon.gif"
              width={50}
              height={50}
              unoptimized
              alt="Steam"
            />
            Meu Steam
          </Link>
        </div>
      </section>
    </div>
  );
}
