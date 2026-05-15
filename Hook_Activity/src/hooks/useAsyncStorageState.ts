import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorageState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (raw !== null) setValue(JSON.parse(raw) as T);
      })
      .catch((err) => console.warn('useAsyncStorageState load error:', err))
      .finally(() => setLoading(false));
  }, [key]);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(key, JSON.stringify(value)).catch((err) =>
        console.warn('useAsyncStorageState save error:', err)
      );
    }
  }, [key, value, loading]);

  return [value, setValue, loading];
}
