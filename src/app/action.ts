'use server';

import { kv } from '@vercel/kv';

export async function incrementVisitorCount() {
  await kv.incr('pageviews');
}