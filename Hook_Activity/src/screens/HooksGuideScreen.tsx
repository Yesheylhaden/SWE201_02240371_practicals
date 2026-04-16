// src/screens/HooksGuideScreen.tsx
// Interactive expandable reference for all 5 hook patterns + Part 5 extras.
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';
import ClockBadge from '../components/ClockBadge';

const HOOKS = [
  {
    id: 'useState',
    icon: 'toggle-outline' as const,
    color: '#3B82F6',
    title: 'useState',
    subtitle: 'Part 1 – Local component state',
    concept: 'Gives a functional component its own state value and a setter. Calling the setter triggers a re-render. Use for inputs, toggles, counters, and small UI state.',
    where: 'TaskInput.tsx',
    usage: [
      'const [title, setTitle]       = useState("")',
      'const [priority, setPriority] = useState<Priority>("normal")',
      '',
      '// Drives live preview on every keystroke:',
      'onChangeText={setTitle}',
      '',
      '// Reset after submit:',
      'setTitle(""); setPriority("normal");',
    ],
  },
  {
    id: 'useEffect',
    icon: 'sync-outline' as const,
    color: '#10B981',
    title: 'useEffect',
    subtitle: 'Part 2 – Side effects & lifecycle',
    concept: 'Runs after rendering. Dependency array controls when it re-runs. Return a cleanup function to run on unmount. Use for AsyncStorage, timers, subscriptions.',
    where: 'useTasks.ts  ·  useClock.ts  ·  useKeyboardVisible.ts',
    usage: [
      '// Runs once on mount:',
      'useEffect(() => { loadData(); }, []);',
      '',
      '// Runs when tasks changes:',
      'useEffect(() => { persist(tasks); }, [tasks]);',
      '',
      '// With cleanup (setInterval example):',
      'useEffect(() => {',
      '  const id = setInterval(() => setTime(...), 1000);',
      '  return () => clearInterval(id);  // cleanup',
      '}, []);',
    ],
  },
  {
    id: 'useContext',
    icon: 'git-network-outline' as const,
    color: '#F59E0B',
    title: 'useContext',
    subtitle: 'Part 3 – Shared data, no prop drilling',
    concept: 'Reads the nearest matching Provider value. Used here so every component can access theme colours without receiving props.',
    where: 'ThemeContext.tsx → useTheme()',
    usage: [
      '// Provide at root (App.tsx):',
      '<ThemeProvider>',
      '  <NavigationContainer>...',
      '',
      '// Consume anywhere:',
      'const { colors, theme, toggleTheme } = useTheme();',
      '<View style={{ backgroundColor: colors.background }}>',
    ],
  },
  {
    id: 'useReducer',
    icon: 'git-branch-outline' as const,
    color: '#8B5CF6',
    title: 'useReducer',
    subtitle: 'Part 4 – Complex state transitions',
    concept: 'Preferred when state transitions are non-trivial. A pure reducer (state, action) => newState handles every change in one place.',
    where: 'useTasks.ts → taskReducer.ts',
    usage: [
      'const [state, dispatch] = useReducer(taskReducer, initialTaskState)',
      '',
      'dispatch({ type: "ADD_TASK",          task: { id, title, priority } })',
      'dispatch({ type: "TOGGLE_DONE",       id })',
      'dispatch({ type: "CLEAR_COMPLETED" })',
      'dispatch({ type: "LOAD_FROM_STORAGE", tasks })',
      '',
      '// Exercise action:',
      'dispatch({ type: "EDIT_TASK",         id, title: "new title" })',
    ],
  },
  {
    id: 'customHooks',
    icon: 'construct-outline' as const,
    color: '#EF4444',
    title: 'Custom Hooks',
    subtitle: 'Part 5 – Reusable stateful logic',
    concept: 'Any function starting with "use" that calls other hooks. Extracts and shares logic without duplicating code. Must follow all Rules of Hooks.',
    where: 'hooks/useTasks.ts  ·  hooks/useAsyncStorageState.ts  ·  hooks/useClock.ts  ·  hooks/useKeyboardVisible.ts',
    usage: [
      '// Hook 1 — useAsyncStorageState (RN equiv. of useLocalStorageState):',
      'const [tasks, setTasks, loading] = useAsyncStorageState("tasks", []);',
      '',
      '// Hook 2 — useTasks (useReducer + AsyncStorage):',
      'const { tasks, dispatch, addTask, toggleDone } = useTasks();',
      '',
      '// Hook 3 — useClock (setInterval + cleanup):',
      'const time = useClock();   // "14:32:07" — updates every second',
      '',
      '// Hook 4 — useKeyboardVisible (Keyboard events + cleanup):',
      'const { visible, keyboardHeight } = useKeyboardVisible();',
    ],
  },
];

export default function HooksGuideScreen() {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState<string | null>('customHooks');

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.screenTitle, { color: colors.text }]}>Hooks Guide</Text>
            <Text style={[styles.screenSub, { color: colors.subtext }]}>Tap a card to expand</Text>
          </View>
          <View style={styles.topRight}>
            <ClockBadge />
            <ThemeToggleButton />
          </View>
        </View>

        {HOOKS.map((h) => {
          const open = expanded === h.id;
          return (
            <TouchableOpacity
              key={h.id}
              activeOpacity={0.85}
              onPress={() => setExpanded(open ? null : h.id)}
              style={[
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor:     open ? h.color : colors.border,
                  borderLeftWidth: open ? 4 : 1,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, { backgroundColor: h.color + '22' }]}>
                  <Ionicons name={h.icon} size={20} color={h.color} />
                </View>
                <View style={styles.cardTitles}>
                  <Text style={[styles.hookName, { color: h.color }]}>{h.title}</Text>
                  <Text style={[styles.hookSub,  { color: colors.subtext }]}>{h.subtitle}</Text>
                </View>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.subtext} />
              </View>

              {open && (
                <View style={styles.cardBody}>
                  <Text style={[styles.conceptText, { color: colors.text }]}>{h.concept}</Text>
                  <View style={[styles.whereTag, { backgroundColor: h.color + '18' }]}>
                    <Ionicons name="location-outline" size={12} color={h.color} />
                    <Text style={[styles.whereText, { color: h.color }]}>{h.where}</Text>
                  </View>
                  <View style={[styles.codeBlock, { backgroundColor: colors.background }]}>
                    {h.usage.map((line, i) => (
                      <Text
                        key={i}
                        style={[
                          styles.codeLine,
                          {
                            color:     line.startsWith('//') ? colors.subtext : colors.text,
                            fontStyle: line.startsWith('//') ? 'italic' : 'normal',
                          },
                        ]}
                      >
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
  safe:        { flex: 1 },
  scroll:      { padding: 16 },
  topBar:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  topRight:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  screenTitle: { fontSize: 26, fontWeight: '800' },
  screenSub:   { fontSize: 13, marginTop: 2 },
  card:        { borderRadius: 12, borderWidth: 1, marginBottom: 10, overflow: 'hidden' },
  cardHeader:  { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  iconCircle:  { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  cardTitles:  { flex: 1 },
  hookName:    { fontSize: 16, fontWeight: '700' },
  hookSub:     { fontSize: 12, marginTop: 1 },
  cardBody:    { paddingHorizontal: 14, paddingBottom: 14, gap: 10 },
  conceptText: { fontSize: 13, lineHeight: 20 },
  whereTag:    { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, alignSelf: 'flex-start' },
  whereText:   { fontSize: 12, fontWeight: '600' },
  codeBlock:   { borderRadius: 8, padding: 12 },
  codeLine:    { fontFamily: 'monospace', fontSize: 12, lineHeight: 20 },
});
