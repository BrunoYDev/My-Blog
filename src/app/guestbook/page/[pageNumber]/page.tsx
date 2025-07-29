import Image from 'next/image';
import { supabase } from '../../../../../lib/supabaseClient';
import { PaginationControls } from '../../../../components/PaginationControls/PaginationControls';
import styles from '../../guestbook.module.css'; 
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
const ENTRIES_PER_PAGE = 5;

export default async function PaginatedGuestbookPage({ params }: { params: Promise<{ pageNumber: string }> }) {
  const { pageNumber } = await params;
  const page = parseInt(pageNumber);

  const { count } = await supabase
    .from('guestbook_entries')
    .select('*', { count: 'exact', head: true });

  const totalPages = Math.ceil((count ?? 0) / ENTRIES_PER_PAGE);

  if (page > totalPages || page < 1) {
    notFound();
  }

  const startIndex = (page - 1) * ENTRIES_PER_PAGE;
  const endIndex = startIndex + ENTRIES_PER_PAGE - 1;

  const { data: entries, error } = await supabase
    .from('guestbook_entries')
    .select('*')
    .order('created_at', { ascending: false })
    .range(startIndex, endIndex);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Shoutbox! (Page {page})</h1>

      <Image src="/images/powerLine.gif" style={{ maxWidth: '100%' }} width={760} height={80} alt="Divider GIF" unoptimized />

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

      <PaginationControls currentPage={page} totalPages={totalPages} basePath="/guestbook" />
    </section>
  );
}