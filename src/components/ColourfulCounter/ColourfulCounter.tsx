'use client';

import { useState, useEffect } from 'react';

const y2kColors = [
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#F8FF00', // Yellow
  '#00FF00', // Lime Green
  '#FFA500', // Orange
  '#FF4500', // OrangeRed
  '#ADFF2F', // GreenYellow
  '#00BFFF', // DeepSkyBlue
];

const getRandomColor = () => {
  return y2kColors[Math.floor(Math.random() * y2kColors.length)];
};

interface ColorfulCounterProps {
  count: number;
}

export function ColorfulCounter({ count }: ColorfulCounterProps) {
  const [coloredDigits, setColoredDigits] = useState<React.ReactNode[] | null>(null);

  useEffect(() => {
    const digits = count.toLocaleString('en-US').split('');
    
    const newColoredDigits = digits.map((digit, index) => (
      <span key={index} style={{ color: getRandomColor()}}>
        {digit}
      </span>
    ));
    
    setColoredDigits(newColoredDigits);

  }, [count]);

  if (!coloredDigits) {
    return <>{count.toLocaleString('en-US')}</>;
  }

  return <>{coloredDigits}</>;
}