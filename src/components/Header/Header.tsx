'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

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
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul>
            <li><Link href="/" onClick={() => setIsOpen(false)}>✧ Home ✧</Link></li>
            <li><Link href="/blog" onClick={() => setIsOpen(false)}>✧ Blog ✧</Link></li>
            <li><Link href="/guestbook" onClick={() => setIsOpen(false)}>✧ Guestbook ✧</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>✧ About ✧</Link></li>
            <li><Link href="https://brunorgarcia.vercel.app/" onClick={() => setIsOpen(false)}>✧ Portfolio ✧</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}