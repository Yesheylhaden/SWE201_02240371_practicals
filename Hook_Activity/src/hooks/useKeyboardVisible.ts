import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      setVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return { visible, keyboardHeight };
}
