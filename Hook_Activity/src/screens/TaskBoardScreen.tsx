// src/screens/TaskBoardScreen.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Demonstrates all 5 hook patterns from the activity spec.
//
// Part 1  useState       → TaskInput + local filter/showInput state
// Part 2  useEffect      → inside useTasks (load, persist, log)
// Part 3  useContext     → useTheme() consumed here and in every sub-component
// Part 4  useReducer     → useTasks wraps taskReducer:
//                          ADD_TASK · TOGGLE_DONE · CLEAR_COMPLETED · EDIT_TASK
// Part 5  Custom hooks   → useTasks · useAsyncStorageState · useClock
//                          useKeyboardVisible
//
// Part 5 mini exercises wired in:
//   1. Filter tabs: All / Active / Completed  (useState for filter value)
//   2. "New ✨" badge for tasks < 5 min old   (in TaskCard via setTimeout)
//   3. Live clock in header                   (useClock → setInterval)
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTheme }            from '../context/ThemeContext';
import { useTasks }            from '../hooks/useTasks';
import { useKeyboardVisible }  from '../hooks/useKeyboardVisible';

import Header            from '../components/Header';
import TaskInput         from '../components/TaskInput';
import TaskCard          from '../components/TaskCard';
import ThemeToggleButton from '../components/ThemeToggleButton';
import StatsBar          from '../components/StatsBar';
import ClockBadge        from '../components/ClockBadge';

// ── Part 5 mini exercise 1: filter type ──────────────────────────────────────
type FilterType = 'all' | 'active' | 'completed';

const FILTERS: { key: FilterType; label: string; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
  { key: 'all',       label: 'All',       icon: 'list-outline'          },
  { key: 'active',    label: 'Active',    icon: 'radio-button-on-outline'},
  { key: 'completed', label: 'Completed', icon: 'checkmark-done-outline' },
];

export default function TaskBoardScreen() {

  // ── Part 5: Custom hook useTasks ──────────────────────────────────────────
  // Encapsulates: useReducer(taskReducer) + useEffect (load/persist/log)
  // Returns { tasks, dispatch } matching spec + convenience helpers on top
  const {
    tasks,
    loading,
    addTask,
    toggleDone,
    clearCompleted,
    editTask,
    doneCount,
    pendingCount,
  } = useTasks();

  // ── Part 3: useContext ────────────────────────────────────────────────────
  const { colors } = useTheme();

  // ── Part 1: useState — local UI state ────────────────────────────────────
  const [filter, setFilter]       = useState<FilterType>('all');
  const [showInput, setShowInput] = useState(false);

  // ── Part 5: useKeyboardVisible (custom hook with cleanup) ────────────────
  const { visible: keyboardVisible } = useKeyboardVisible();

  // ── Part 5 mini exercise 1: filtered list ────────────────────────────────
  const filtered = tasks.filter((t) => {
    if (filter === 'active')    return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const handleClearCompleted = () => {
    if (doneCount === 0) return;
    Alert.alert(
      'Clear Completed',
      `Remove ${doneCount} completed task${doneCount > 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCompleted },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.subtext }]}>Loading tasks…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>

        {/* ── Top bar: title + clock (mini ex 3) + theme toggle ─────────── */}
        <View style={styles.topBar}>
          <Text style={[styles.screenTitle, { color: colors.text }]}>Task Board</Text>
          <View style={styles.topRight}>
            {/* Part 5 mini exercise 3: live clock from useClock hook */}
            <ClockBadge />
            <ThemeToggleButton />
          </View>
        </View>

        {/* ── Header banner ─────────────────────────────────────────────── */}
        <Header
          title="Reactive Task Board"
          subtitle="useState · useEffect · useContext · useReducer · Custom Hooks"
        />

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <StatsBar
          total={tasks.length}
          done={doneCount}
          pending={pendingCount}
        />

        {/* ── New Task toggle ───────────────────────────────────────────── */}
        <TouchableOpacity
          style={[styles.addToggle, { backgroundColor: colors.primary }]}
          onPress={() => setShowInput((v) => !v)}
          activeOpacity={0.8}
        >
          <Ionicons name={showInput ? 'chevron-up' : 'add'} size={18} color="#fff" />
          <Text style={styles.addToggleText}>
            {showInput ? 'Hide Input' : 'New Task'}
          </Text>
        </TouchableOpacity>

        {/* ── Part 1: TaskInput (useState demo) ─────────────────────────── */}
        {showInput && (
          <TaskInput
            onAddTask={(title, priority) => {
              addTask(title, priority);   // dispatches ADD_TASK
              setShowInput(false);
            }}
          />
        )}

        {/* ── Part 5 mini exercise 1: All / Active / Completed filter ───── */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor:     active ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setFilter(f.key)}
              >
                <Ionicons
                  name={f.icon}
                  size={13}
                  color={active ? '#fff' : colors.subtext}
                />
                <Text style={[styles.filterText, { color: active ? '#fff' : colors.subtext }]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Clear completed button — dispatches CLEAR_COMPLETED */}
          <TouchableOpacity
            style={[
              styles.filterTab,
              {
                borderColor:     doneCount > 0 ? colors.danger : colors.border,
                backgroundColor: colors.surface,
                marginLeft: 'auto',
                opacity: doneCount > 0 ? 1 : 0.38,
              },
            ]}
            onPress={handleClearCompleted}
            disabled={doneCount === 0}
          >
            <Ionicons
              name="trash-outline"
              size={13}
              color={doneCount > 0 ? colors.danger : colors.subtext}
            />
            <Text style={[styles.filterText, { color: doneCount > 0 ? colors.danger : colors.subtext }]}>
              Clear done
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Task list ─────────────────────────────────────────────────── */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggleDone={toggleDone}   // TOGGLE_DONE
              onEditTask={editTask}        // EDIT_TASK (exercise)
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="clipboard-outline" size={48} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.subtext }]}>
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                  ? 'No active tasks — all done! 🎉'
                  : 'No tasks yet — add one above!'}
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: keyboardVisible ? 220 : 24 }}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1 },
  container:     { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  center:        { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText:   { fontSize: 14 },
  topBar:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  topRight:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  screenTitle:   { fontSize: 24, fontWeight: '800', letterSpacing: 0.2 },
  addToggle:     { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, marginBottom: 12, alignSelf: 'flex-start' },
  addToggleText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  filterRow:     { flexDirection: 'row', gap: 6, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' },
  filterTab:     { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  filterText:    { fontSize: 12, fontWeight: '600' },
  emptyBox:      { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText:     { fontSize: 14, textAlign: 'center' },
});
