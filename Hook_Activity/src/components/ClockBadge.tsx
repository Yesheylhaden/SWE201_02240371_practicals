import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useClock } from '../hooks/useClock';
import { useTheme } from '../context/ThemeContext';

export default function ClockBadge() {
  const time = useClock();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Ionicons name="time-outline" size={13} color={colors.primary} />
      <Text style={[styles.time, { color: colors.text }]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  time: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '600',
  },
});
