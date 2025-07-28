import Image from 'next/image';
import { supabase } from '../../../lib/supabaseClient';
import { GuestbookForm } from '../../components/GuestbookForm/GuestbookForm';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import styles from './guestbook.module.css';

export const dynamic = 'force-dynamic';
const ENTRIES_PER_PAGE = 5;

export default async function GuestbookPage() {
  const { count } = await supabase
    .from('guestbook_entries')
    .select('*', { count: 'exact', head: true });

  const totalPages = Math.ceil((count ?? 0) / ENTRIES_PER_PAGE);

  const { data: entries, error } = await supabase
    .from('guestbook_entries')
    .select('*')
    .order('created_at', { ascending: false })
    .range(0, ENTRIES_PER_PAGE - 1);

  if (error) {
    console.error('Error fetching entries:', error);
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>✧･ﾟ: *✧･ﾟ:* Shoutbox! *:･ﾟ✧*:･ﾟ✧</h1>
      <p className={styles.subtitle}>Leave a message on the wall for everyone to see!</p>

      <GuestbookForm />
      <Image src="/images/powerLine.gif" width={760} height={80} alt="Divider GIF" unoptimized />

      <div className={styles.entriesList}>
        {entries?.map(entry => (
          <div key={entry.id} className={styles.entry}>
            <p className={styles.entryMessage}>&ldquo;{entry.message}&rdquo;</p>
            <div className={styles.entryFooter}>
              <span className={styles.entryAuthor}>- {entry.username}</span>
              <time className={styles.entryDate}>
                {new Date(entry.created_at).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
              </time>
            </div>
          </div>
        ))}
      </div>

      <PaginationControls currentPage={1} totalPages={totalPages} basePath="/guestbook" />
    </section>
  );
}