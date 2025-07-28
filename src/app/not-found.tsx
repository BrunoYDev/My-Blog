// src/app/not-found.tsx
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.bsodContainer}>
      <div className={styles.content}>
        <p className={styles.errorCode}>
          <span>ERROR</span>
        </p>
        <p>A fatal exception 404 has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.</p>
        <p>The requested page could not be found in the server's memory banks. It may have been moved, deleted, or it might be hiding in another castle.</p>
        <br />
        <p>* Press any key to terminate the current application.</p>
        <p>* Press CTRL+ALT+DEL to restart your browser. You will lose any unsaved data in all applications.</p>
        <p>* Or, try a less dramatic solution:</p>
        <br/>
        <p className={styles.returnLinkContainer}>
          <Link href="/" className={styles.returnLink}>
            &gt; Return to Home
          </Link>
          <span className={styles.blinkingCursor}>_</span>
        </p>
      </div>
    </div>
  );
}