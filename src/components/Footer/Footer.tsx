import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Bruno R Garcia - All rights reserved.</p>
      <Link href="/keystatic" className={styles.adminLink}>Admin Login</Link>
    </footer>
  );
}