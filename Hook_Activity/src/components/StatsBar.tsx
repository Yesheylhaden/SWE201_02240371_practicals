import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = {
  total:   number;
  done:    number;
  pending: number;
};

function Stat({ label, value, color }: { label: string; value: number | string; color: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.subtext }]}>{label}</Text>
    </View>
  );
}

export default function StatsBar({ total, done, pending }: Props) {
  const { colors } = useTheme();
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.row}>
        <Stat label="Total"   value={total}   color={colors.primary} />
        <Stat label="Done"    value={done}    color={colors.success} />
        <Stat label="Pending" value={pending} color={colors.subtext} />
        <Stat label="Done %"  value={`${pct}%`} color={colors.text} />
      </View>
      <View style={[styles.track, { backgroundColor: colors.border }]}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: colors.success }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { borderRadius: 10, borderWidth: 1, padding: 12, marginBottom: 14, gap: 10 },
  row:        { flexDirection: 'row', justifyContent: 'space-around' },
  stat:       { alignItems: 'center', gap: 2 },
  statValue:  { fontSize: 20, fontWeight: '800' },
  statLabel:  { fontSize: 11, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  track:      { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill:       { height: '100%', borderRadius: 3 },
});
