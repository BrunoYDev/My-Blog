// src/components/LatestShouts.tsx
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import styles from './LatestShouts.module.css';

export async function LatestShouts() {
  const { data: entries, error } = await supabase
    .from('guestbook_entries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest shouts:', error);
    return <p>Could not load shouts.</p>;
  }

  if (!entries || entries.length === 0) {
    return <p>Be the first to sign the guestbook!</p>;
  }

  return (
    <div className={styles.shoutboxPreview}>
      {entries.map(entry => (
        <div key={entry.id} className={styles.shout}>
          <span className={styles.shoutAuthor}>{entry.username}</span>
          <p className={styles.shoutMessage}>"{entry.message}"</p>
        </div>
      ))}
      <Link href="/guestbook" className={styles.linkToGuestbook}>
        Leave your own message »
      </Link>
    </div>
  );
}