'use server';

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