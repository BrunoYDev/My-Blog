'use server';

import { supabase } from '../../lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';

const getTodayKey = () => {
  const today = new Date().toISOString().split('T')[0];
  return `daily_visits_${today}`;
};


export async function registerVisit(isFirstVisitEver: boolean, isNewDay: boolean) {
  if (isFirstVisitEver) {
    await kv.incr('total_unique_visitors');
  }

  if (isNewDay) {
    const todayKey = getTodayKey();
    await kv.incr(todayKey);
  }
}

export async function addGuestbookEntry(formData: FormData) {
  const username = formData.get('username') as string;
  const message = formData.get('message') as string;

  if (!username.trim() || !message.trim()) {
    return { error: 'Error: Name and message cannot be empty.' };
  }

  const { error } = await supabase
    .from('guestbook_entries')
    .insert([{ username, message }]);
  
  if (error) {
    console.error('Supabase error:', error);
    return { error: 'Error: Could not save the message.' };
  }
  revalidatePath('/guestbook');
  return { success: true };
}