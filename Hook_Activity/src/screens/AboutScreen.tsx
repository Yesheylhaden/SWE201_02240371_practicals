// src/screens/AboutScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

const FILE_TREE = [
  { indent: 0, name: 'SWE101/',                     isDir: true  },
  { indent: 1, name: 'App.tsx',                     isDir: false, note: 'Root + ThemeProvider' },
  { indent: 1, name: 'index.ts',                    isDir: false, note: 'Expo entry' },
  { indent: 1, name: 'src/',                        isDir: true  },
  { indent: 2, name: 'Navigation/',                 isDir: true  },
  { indent: 3, name: 'BottomTabs.tsx',              isDir: false, note: '4 tabs' },
  { indent: 2, name: 'screens/',                    isDir: true  },
  { indent: 3, name: 'TaskBoardScreen.tsx',         isDir: false, note: 'Main lab — all 5 hooks' },
  { indent: 3, name: 'HooksGuideScreen.tsx',        isDir: false, note: 'Interactive reference' },
  { indent: 3, name: 'CommonMistakesScreen.tsx',    isDir: false, note: 'Part 5 discussion' },
  { indent: 3, name: 'AboutScreen.tsx',             isDir: false, note: 'This screen' },
  { indent: 2, name: 'components/',                 isDir: true  },
  { indent: 3, name: 'TaskInput.tsx',               isDir: false, note: 'useState demo' },
  { indent: 3, name: 'TaskCard.tsx',                isDir: false, note: 'TOGGLE_DONE · EDIT_TASK · New badge' },
  { indent: 3, name: 'Header.tsx',                  isDir: false, note: 'useContext mini-exercise' },
  { indent: 3, name: 'ThemeToggleButton.tsx',       isDir: false, note: 'useContext demo' },
  { indent: 3, name: 'StatsBar.tsx',                isDir: false, note: 'Derived state' },
  { indent: 3, name: 'ClockBadge.tsx',              isDir: false, note: 'Mini ex 3 — useClock' },
  { indent: 2, name: 'context/',                    isDir: true  },
  { indent: 3, name: 'ThemeContext.tsx',            isDir: false, note: 'createContext + useTheme' },
  { indent: 2, name: 'reducers/',                   isDir: true  },
  { indent: 3, name: 'taskReducer.ts',              isDir: false, note: 'ADD_TASK · TOGGLE_DONE · CLEAR_COMPLETED · EDIT_TASK' },
  { indent: 2, name: 'hooks/',                      isDir: true  },
  { indent: 3, name: 'useAsyncStorageState.ts',     isDir: false, note: 'Part 5 Hook 1 (≈useLocalStorageState)' },
  { indent: 3, name: 'useTasks.ts',                 isDir: false, note: 'Part 5 Hook 2 — useReducer + storage' },
  { indent: 3, name: 'useClock.ts',                 isDir: false, note: 'Mini ex 3 — setInterval + cleanup' },
  { indent: 3, name: 'useKeyboardVisible.ts',       isDir: false, note: 'Keyboard events + cleanup' },
];

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={[styles.scroll, { backgroundColor: colors.background }]}>
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.screenTitle, { color: colors.text }]}>About</Text>
            <Text style={[styles.screenSub, { color: colors.subtext }]}>SWE101 Hooks Lab — all 5 parts</Text>
          </View>
          <ThemeToggleButton />
        </View>

        {/* Course info */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {[
            ['school-outline',       '#3B82F6', 'Course',   'SWE101 — 3rd Year B.E. Software Engineering'],
            ['cube-outline',         '#10B981', 'SDK',      'Expo ~54.0.0 · React Native 0.81.5'],
            ['code-slash-outline',   '#8B5CF6', 'Language', 'TypeScript ~5.9.2 (strict)'],
            ['layers-outline',       '#F59E0B', 'Nav',      'React Navigation v7 (Bottom Tabs)'],
            ['save-outline',         '#EF4444', 'Storage',  'AsyncStorage ^2.2.0'],
          ].map(([icon, color, label, value]) => (
            <View key={label} style={styles.infoRow}>
              <Ionicons name={icon as any} size={15} color={color} />
              <Text style={[styles.infoLabel, { color: colors.subtext }]}>{label}</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Hooks summary */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Hooks Covered</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {[
            ['useState',                '#3B82F6', 'Part 1 — TaskInput: title, priority, char counter'],
            ['useEffect',               '#10B981', 'Part 2 — AsyncStorage load/persist/log · useClock interval'],
            ['useContext',              '#F59E0B', 'Part 3 — ThemeContext shared across all components'],
            ['useReducer',              '#8B5CF6', 'Part 4 — ADD_TASK · TOGGLE_DONE · CLEAR_COMPLETED · EDIT_TASK'],
            ['useAsyncStorageState',    '#EF4444', 'Part 5 Hook 1 — RN equiv. of useLocalStorageState'],
            ['useTasks',               '#EF4444', 'Part 5 Hook 2 — useReducer + AsyncStorage in one hook'],
            ['useClock',               '#EF4444', 'Part 5 Mini Ex 3 — setInterval + clearInterval cleanup'],
            ['useKeyboardVisible',     '#EF4444', 'Part 5 — Keyboard events + cleanup'],
          ].map(([name, color, desc]) => (
            <View key={name} style={styles.hookRow}>
              <View style={[styles.dot, { backgroundColor: color }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.hookRowName, { color: colors.text }]}>{name}</Text>
                <Text style={[styles.hookRowDesc, { color: colors.subtext }]}>{desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* File tree */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Project Structure</Text>
        <View style={[styles.treeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {FILE_TREE.map((f, i) => (
            <View key={i} style={[styles.treeLine, { paddingLeft: f.indent * 14 }]}>
              <Ionicons
                name={f.isDir ? 'folder-outline' : 'document-text-outline'}
                size={12}
                color={f.isDir ? '#F59E0B' : colors.subtext}
              />
              <Text style={[styles.treeFile, { color: f.isDir ? colors.text : colors.subtext }]}>
                {f.name}
              </Text>
              {(f as any).note ? (
                <Text style={[styles.treeNote, { color: colors.primary }]}>← {(f as any).note}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1 },
  scroll:       { padding: 16 },
  topBar:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  screenTitle:  { fontSize: 26, fontWeight: '800' },
  screenSub:    { fontSize: 13, marginTop: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8, marginTop: 4 },
  card:         { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 16, gap: 10 },
  infoRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoLabel:    { fontSize: 12, fontWeight: '600', width: 68 },
  infoValue:    { flex: 1, fontSize: 12 },
  hookRow:      { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  dot:          { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  hookRowName:  { fontSize: 13, fontWeight: '700' },
  hookRowDesc:  { fontSize: 12, marginTop: 1 },
  treeCard:     { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 16 },
  treeLine:     { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 2 },
  treeFile:     { fontSize: 11, fontFamily: 'monospace' },
  treeNote:     { fontSize: 10, marginLeft: 4 },
});
