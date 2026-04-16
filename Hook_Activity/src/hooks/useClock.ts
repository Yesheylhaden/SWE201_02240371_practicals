// src/hooks/useClock.ts
// ─────────────────────────────────────────────────────────────────────────────
// Part 5 – Mini Exercise 3
// "Use useEffect with setInterval to update a Clock component in the header."
// Demonstrates: useEffect + setInterval + cleanup (clearInterval on unmount).
// ─────────────────────────────────────────────────────────────────────────────
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
    // Set up interval — fires every 1 second
    const intervalId = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    // Cleanup: clearInterval runs when component unmounts
    // (demonstrates useEffect cleanup — same pattern as useKeyboardVisible)
    return () => clearInterval(intervalId);
  }, []); // empty array = set up once on mount, clear on unmount

  return time;
}
