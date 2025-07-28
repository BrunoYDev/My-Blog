import Link from 'next/link';
import styles from './PaginationControls.module.css';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function PaginationControls({ currentPage, totalPages, basePath }: PaginationControlsProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const prevPageUrl = prevPage === 1 ? basePath : `${basePath}/page/${prevPage}`;
  const nextPageUrl = `${basePath}/page/${nextPage}`;

  return (
    <nav className={styles.container}>
      {currentPage > 1 ? (
        <Link href={prevPageUrl} className={styles.button}>
          « Previous Page
        </Link>
      ) : <div />}

      <span className={styles.pageIndicator}>
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={nextPageUrl} className={styles.button}>
          Next Page »
        </Link>
      ) : <div />}
    </nav>
  );
}