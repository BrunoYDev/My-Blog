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
    return <p>Não foi possível carregar os recados.</p>;
  }

  if (!entries || entries.length === 0) {
    return <p>Seja o primeiro a assinar o livro de visitas!</p>;
  }

  return (
    <div className={styles.shoutboxPreview}>
      {entries.map(entry => (
        <div key={entry.id} className={styles.shout}>
          <span className={styles.shoutAuthor}>{entry.username}</span>
          <p className={styles.shoutMessage}>&ldquo;{entry.message}&rdquo;</p>
        </div>
      ))}
      <Link href="/guestbook" className={styles.linkToGuestbook}>
        Deixe seu recado »
      </Link>
    </div>
  );
}
