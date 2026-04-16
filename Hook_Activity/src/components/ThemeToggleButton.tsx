import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme, colors } = useTheme();

  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      onPress={toggleTheme}
      activeOpacity={0.75}
    >
      <Ionicons
        name={isDark ? 'sunny-outline' : 'moon-outline'}
        size={16}
        color={colors.primary}
      />
      <Text style={[styles.label, { color: colors.text }]}>
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
