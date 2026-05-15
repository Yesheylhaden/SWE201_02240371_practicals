import { useState, useEffect } from 'react';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function formatTime(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function useClock() {
  const [time, setTime] = useState<string>(formatTime(new Date()));

  useEffect(() => {
    // Set up interval 
    const intervalId = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  return time;
}
