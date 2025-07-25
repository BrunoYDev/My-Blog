'use client';

import { useEffect } from 'react';
import { incrementVisitorCount } from '../../app/action';

export function ViewCounterTrigger() {
  useEffect(() => {
    incrementVisitorCount();
  }, []);

  return null;
}