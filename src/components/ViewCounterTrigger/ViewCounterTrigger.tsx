'use client';

import { useEffect } from 'react';
import { incrementVisitorCount } from '../../app/action';

export function ViewCounterTrigger() {
  useEffect(() => {

    const STORAGE_KEY = 'visit-info';
    const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; 

    const handleVisit = () => {
      try {
        const visitInfoString = localStorage.getItem(STORAGE_KEY);
        
        if (!visitInfoString) {
          console.log('First visit. Incrementing count.');
          incrementVisitorCount();
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
          return;
        }

        const visitInfo = JSON.parse(visitInfoString);
        const lastVisitTime = visitInfo.timestamp;
        const currentTime = Date.now();

        if (currentTime - lastVisitTime > COOLDOWN_PERIOD) {
          console.log('Cooldown period expired. Incrementing count.');
          incrementVisitorCount();
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: currentTime }));
        } else {
          console.log('Visited within the last 24 hours. Not incrementing.');
        }

      } catch (error) {
        console.error('Failed to process visitor count:', error);
      }
    };

    handleVisit();

  }, []);

  return null;
}