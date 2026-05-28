import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Bruno R Garcia - Todos os direitos reservados.</p>
      <Link href="/keystatic" className={styles.adminLink}>Login do Admin</Link>
    </footer>
  );
}
