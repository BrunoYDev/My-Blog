'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import GoogleTranslate from '@/components/GoogleTranslate/GoogleTranslate';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Alternar menu de navegação"
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul>
            <li><Link href="/" onClick={() => setIsOpen(false)}>✧ Início ✧</Link></li>
            <li><Link href="/blog" onClick={() => setIsOpen(false)}>✧ Blog ✧</Link></li>
            <li><Link href="/guestbook" onClick={() => setIsOpen(false)}>✧ Livro de Visitas ✧</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>✧ Sobre ✧</Link></li>
            <li><Link href="https://brunorgarcia.vercel.app/" onClick={() => setIsOpen(false)}>✧ Portfólio ✧</Link></li>
          </ul>
        </nav>

        <GoogleTranslate />
      </div>
    </header>
  );
}
