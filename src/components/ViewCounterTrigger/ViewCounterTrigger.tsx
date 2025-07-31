'use client';

import { useEffect } from 'react';
import { registerVisit } from '../../app/action';

export function ViewCounterTrigger() {
  
  useEffect(() => {

    if (process.env.NODE_ENV != 'production' || process.env.CI) {
      console.log('Development or build environment detected, skipping view count.');
      return;
    }

    const TOTAL_VISIT_KEY = 'has_visited_ever';
    const DAILY_VISIT_KEY = 'last_visit_timestamp';
    const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

    const now = Date.now();

    const hasVisitedEver = localStorage.getItem(TOTAL_VISIT_KEY) === 'true';

    const lastVisitTimestamp = parseInt(localStorage.getItem(DAILY_VISIT_KEY) || '0');
    
    const isNewDay = !lastVisitTimestamp || (now - lastVisitTimestamp > COOLDOWN_PERIOD);
    
    if (!hasVisitedEver || isNewDay) {
      registerVisit(!hasVisitedEver, isNewDay);
      
      if (!hasVisitedEver) {
        localStorage.setItem(TOTAL_VISIT_KEY, 'true');
      }

      localStorage.setItem(DAILY_VISIT_KEY, now.toString());
    }
  }, []);

  return null;
}