// src/hooks/useAsyncStorageState.ts
// ─────────────────────────────────────────────────────────────────────────────
// Part 5 – Custom Hook 1
// React Native equivalent of useLocalStorageState from the activity spec.
// AsyncStorage is async, so we need a loading state that localStorage didn't.
//
// Web version from spec:
//   export function useLocalStorageState(key, defaultValue) {
//     const [value, setValue] = useState(() => {
//       const stored = localStorage.getItem(key);
//       return stored ? JSON.parse(stored) : defaultValue;
//     });
//     useEffect(() => {
//       localStorage.setItem(key, JSON.stringify(value));
//     }, [key, value]);
//     return [value, setValue];
//   }
//
// RN adaptation: same contract ([value, setValue]) but async under the hood.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorageState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  // ── On mount: load persisted value (mirrors localStorage lazy init) ───────
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (raw !== null) setValue(JSON.parse(raw) as T);
      })
      .catch((err) => console.warn('useAsyncStorageState load error:', err))
      .finally(() => setLoading(false));
  }, [key]);

  // ── Whenever value changes: persist it (mirrors the spec's useEffect) ─────
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(key, JSON.stringify(value)).catch((err) =>
        console.warn('useAsyncStorageState save error:', err)
      );
    }
  }, [key, value, loading]);

  return [value, setValue, loading];
}
