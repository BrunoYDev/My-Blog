import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
              style={{ display: "block", margin: "0 auto" }}
              src="/images/construction.gif"
              alt="Under Construction"
              width={600}
              height={200}
            />
      </main>
    </div>
  );
}
