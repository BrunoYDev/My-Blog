'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './GoogleTranslate.module.css';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'de', label: 'German' },
];

const HAS_VISITED_KEY = 'gt_visited';

function getStoredLang(): string {
  // googtrans cookie format: /en/pt or /auto/de
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return match ? match[1] : 'en';
}

function isFirstVisit(): boolean {
  return !localStorage.getItem(HAS_VISITED_KEY);
}

function markVisited() {
  localStorage.setItem(HAS_VISITED_KEY, '1');
}

function detectBrowserLang(): string | null {
  const lang = navigator.language || '';
  if (lang.startsWith('pt')) return 'pt';
  return null;
}

function clearGoogTransCookie() {
  // Clear on all possible paths/domains
  const hostParts = window.location.hostname.split('.');
  const domains = [
    '',
    window.location.hostname,
    hostParts.length > 1
      ? '.' + hostParts.slice(-2).join('.')
      : window.location.hostname,
  ];
  for (const domain of domains) {
    const domainStr = domain ? `; domain=${domain}` : '';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${domainStr}`;
  }
}

export default function GoogleTranslate() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [currentLang, setCurrentLang] = useState('en');

  const removeBanner = useCallback(() => {
    document.querySelectorAll('iframe').forEach((iframe) => {
      const isGoogleBanner =
        iframe.classList.contains('goog-te-banner-frame') ||
        iframe.classList.contains('skiptranslate') ||
        iframe.src.includes('translate.google.com') ||
        iframe.id.includes('goog-gt-');
      if (isGoogleBanner) {
        iframe.style.display = 'none';
        iframe.style.height = '0';
        iframe.style.visibility = 'hidden';
      }
    });
    document.querySelectorAll('.skiptranslate').forEach((el) => {
      if (el instanceof HTMLElement && !el.closest('#google_translate_element')) {
        el.style.display = 'none';
      }
    });
    document.body.style.top = '0px';
  }, []);

  // Sync dropdown with cookie on mount, auto-detect on first visit
  useEffect(() => {
    const stored = getStoredLang();

    if (isFirstVisit()) {
      markVisited();
      const detected = detectBrowserLang();
      if (detected) {
        setCurrentLang(detected);
        // Wait for Google Translate to initialize, then trigger translation
        const waitForGoogle = setInterval(() => {
          const googleCombo = document.querySelector<HTMLSelectElement>(
            '.goog-te-combo'
          );
          if (googleCombo) {
            clearInterval(waitForGoogle);
            googleCombo.value = detected;
            googleCombo.dispatchEvent(new Event('change'));
            setTimeout(removeBanner, 100);
            setTimeout(removeBanner, 500);
          }
        }, 200);
        // Stop trying after 5 seconds
        setTimeout(() => clearInterval(waitForGoogle), 5000);
        return;
      }
    }

    setCurrentLang(stored);
  }, [removeBanner]);

  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,pt,de',
            layout: 0,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      removeBanner();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [removeBanner]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setCurrentLang(lang);

    if (lang === 'en') {
      // Restore to original: clear cookie and reload
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    const googleCombo = document.querySelector<HTMLSelectElement>(
      '.goog-te-combo'
    );
    if (googleCombo) {
      googleCombo.value = lang;
      googleCombo.dispatchEvent(new Event('change'));
    }

    setTimeout(removeBanner, 100);
    setTimeout(removeBanner, 500);
  };

  return (
    <div className={styles.wrapper}>
      <div id="google_translate_element" style={{ display: 'none' }} />

      <select
        ref={selectRef}
        className={styles.select}
        onChange={handleChange}
        value={currentLang}
        aria-label="Translate page"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
