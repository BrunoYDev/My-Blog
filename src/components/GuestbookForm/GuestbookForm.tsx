'use client';
import { useRef, useState } from 'react';
import { addGuestbookEntry } from '../../app/action';
import styles from './GuestbookForm.module.css';

export function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const result = await addGuestbookEntry(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setError(null);
      formRef.current?.reset();
    }
    setIsSubmitting(false);
  };

  return (
    <form ref={formRef} action={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="username">Your Name:</label>
        <input type="text" id="username" name="username" required maxLength={50} disabled={isSubmitting} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="message">Your Message:</label>
        <textarea id="message" name="message" required maxLength={500} rows={4} disabled={isSubmitting}></textarea>
      </div>
      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Signing...' : 'Sign the Guestbook!'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}