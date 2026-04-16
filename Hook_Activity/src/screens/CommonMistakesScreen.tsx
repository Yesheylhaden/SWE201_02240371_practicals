// src/screens/CommonMistakesScreen.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Part 5 – Common Mistakes discussion points from the activity spec.
// Each card shows the mistake, a BAD example, and a GOOD fix.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

const MISTAKES = [
  {
    id: 'm1',
    icon: 'warning-outline' as const,
    color: '#EF4444',
    title: 'Mutating state directly',
    summary: 'Updating state.tasks directly instead of returning a new object in the reducer.',
    bad: [
      '// ❌ BAD — mutates state in-place',
      'case "ADD_TASK":',
      '  state.tasks.push(action.task);  // mutation!',
      '  return state;',
    ],
    good: [
      '// ✅ GOOD — return a new object',
      'case "ADD_TASK":',
      '  return {',
      '    ...state,',
      '    tasks: [...state.tasks, action.task],',
      '  };',
    ],
  },
  {
    id: 'm2',
    icon: 'infinite-outline' as const,
    color: '#F59E0B',
    title: 'Wrong useEffect dependencies',
    summary: 'Forgetting the dependency array (causes infinite loop) or using stale values (causes bugs).',
    bad: [
      '// ❌ BAD — no dependency array',
      '// Runs after EVERY render → infinite loop',
      'useEffect(() => {',
      '  AsyncStorage.setItem(KEY, JSON.stringify(tasks));',
      '});',
    ],
    good: [
      '// ✅ GOOD — only runs when tasks changes',
      'useEffect(() => {',
      '  AsyncStorage.setItem(KEY, JSON.stringify(tasks));',
      '}, [tasks]);   // ← dependency array',
      '',
      '// ✅ Mount only (empty array):',
      'useEffect(() => { loadData(); }, []);',
    ],
  },
  {
    id: 'm3',
    icon: 'alert-circle-outline' as const,
    color: '#8B5CF6',
    title: 'useContext outside Provider',
    summary: 'Consuming useTheme() or useContext() in a component that is not wrapped by the Provider.',
    bad: [
      '// ❌ BAD — ThemeProvider is missing',
      'export default function App() {',
      '  return (',
      '    <NavigationContainer>',
      '      <BottomTabs />   {/* useTheme() crashes here */}',
      '    </NavigationContainer>',
      '  );',
      '}',
    ],
    good: [
      '// ✅ GOOD — wrap with ThemeProvider first',
      'export default function App() {',
      '  return (',
      '    <ThemeProvider>',
      '      <NavigationContainer>',
      '        <BottomTabs />',
      '      </NavigationContainer>',
      '    </ThemeProvider>',
      '  );',
      '}',
    ],
  },
  {
    id: 'm4',
    icon: 'flask-outline' as const,
    color: '#10B981',
    title: 'Side effects inside the reducer',
    summary: 'Performing AsyncStorage writes or API calls inside taskReducer instead of in useEffect.',
    bad: [
      '// ❌ BAD — side effect inside pure reducer',
      'case "ADD_TASK":',
      '  AsyncStorage.setItem(KEY, ...);  // side effect!',
      '  return { ...state, tasks: [...] };',
    ],
    good: [
      '// ✅ GOOD — reducer stays pure',
      'case "ADD_TASK":',
      '  return { ...state, tasks: [...state.tasks, action.task] };',
      '',
      '// Side effect lives in useEffect:',
      'useEffect(() => {',
      '  AsyncStorage.setItem(KEY, JSON.stringify(state.tasks));',
      '}, [state.tasks]);',
    ],
  },
  {
    id: 'm5',
    icon: 'code-slash-outline' as const,
    color: '#3B82F6',
    title: 'Conditional hook calls',
    summary: 'Calling hooks inside conditions, loops, or after an early return — violates the Rules of Hooks.',
    bad: [
      '// ❌ BAD — hook called conditionally',
      'function MyComponent({ isAdmin }) {',
      '  if (!isAdmin) return null;  // early return',
      '  const { colors } = useTheme();  // hook after return!',
      '  ...',
      '}',
    ],
    good: [
      '// ✅ GOOD — all hooks at the top level',
      'function MyComponent({ isAdmin }) {',
      '  const { colors } = useTheme();  // always called first',
      '',
      '  if (!isAdmin) return null;  // guard after hooks',
      '  ...',
      '}',
    ],
  },
];

export default function CommonMistakesScreen() {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState<string | null>('m1');

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.screenTitle, { color: colors.text }]}>Common Mistakes</Text>
            <Text style={[styles.screenSub, { color: colors.subtext }]}>
              Part 5 — discussion points
            </Text>
          </View>
          <ThemeToggleButton />
        </View>

        {/* Intro */}
        <View style={[styles.intro, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="school-outline" size={16} color={colors.primary} />
          <Text style={[styles.introText, { color: colors.text }]}>
            Discuss these while students work on Part 5. Each card shows the
            mistake, a broken example, and the correct fix.
          </Text>
        </View>

        {/* Mistake cards */}
        {MISTAKES.map((m, idx) => {
          const open = expanded === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.85}
              onPress={() => setExpanded(open ? null : m.id)}
              style={[
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor:     open ? m.color : colors.border,
                  borderLeftWidth: open ? 4 : 1,
                },
              ]}
            >
              {/* Card header */}
              <View style={styles.cardHeader}>
                <View style={[styles.numberCircle, { backgroundColor: m.color }]}>
                  <Text style={styles.numberText}>{idx + 1}</Text>
                </View>
                <View style={[styles.iconCircle, { backgroundColor: m.color + '20' }]}>
                  <Ionicons name={m.icon} size={18} color={m.color} />
                </View>
                <View style={styles.cardTitles}>
                  <Text style={[styles.mistakeTitle, { color: colors.text }]}>{m.title}</Text>
                  <Text style={[styles.mistakeSub,   { color: colors.subtext }]} numberOfLines={2}>
                    {m.summary}
                  </Text>
                </View>
                <Ionicons
                  name={open ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.subtext}
                />
              </View>

              {/* Expanded: BAD + GOOD */}
              {open && (
                <View style={styles.cardBody}>
                  {/* BAD */}
                  <Text style={[styles.codeLabel, { color: colors.danger }]}>✗  What to avoid</Text>
                  <View style={[styles.codeBlock, { backgroundColor: '#FEF2F2', borderColor: colors.danger + '44' }]}>
                    {m.bad.map((line, i) => (
                      <Text key={i} style={[styles.codeLine, { color: '#991B1B' }]}>
                        {line || ' '}
                      </Text>
                    ))}
                  </View>

                  {/* GOOD */}
                  <Text style={[styles.codeLabel, { color: colors.success }]}>✓  The fix</Text>
                  <View style={[styles.codeBlock, { backgroundColor: '#F0FDF4', borderColor: colors.success + '44' }]}>
                    {m.good.map((line, i) => (
                      <Text key={i} style={[styles.codeLine, { color: '#065F46' }]}>
                        {line || ' '}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1 },
  scroll:        { padding: 16 },
  topBar:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  screenTitle:   { fontSize: 26, fontWeight: '800' },
  screenSub:     { fontSize: 13, marginTop: 2 },
  intro:         { flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 14 },
  introText:     { flex: 1, fontSize: 13, lineHeight: 19 },
  card:          { borderRadius: 12, borderWidth: 1, marginBottom: 10, overflow: 'hidden' },
  cardHeader:    { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  numberCircle:  { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  numberText:    { color: '#fff', fontSize: 11, fontWeight: '800' },
  iconCircle:    { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  cardTitles:    { flex: 1 },
  mistakeTitle:  { fontSize: 14, fontWeight: '700' },
  mistakeSub:    { fontSize: 12, marginTop: 1, lineHeight: 17 },
  cardBody:      { paddingHorizontal: 12, paddingBottom: 14, gap: 8 },
  codeLabel:     { fontSize: 12, fontWeight: '700', marginTop: 4 },
  codeBlock:     { borderRadius: 8, borderWidth: 1, padding: 10 },
  codeLine:      { fontFamily: 'monospace', fontSize: 11, lineHeight: 18 },
});
