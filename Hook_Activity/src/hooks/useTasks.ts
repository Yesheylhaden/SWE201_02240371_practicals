// src/hooks/useTasks.ts
// ─────────────────────────────────────────────────────────────────────────────
// Part 5 – Custom Hook 2 (Optional / advanced)
// Encapsulates useReducer + AsyncStorage persistence in one hook.
// API matches the spec exactly: returns { tasks, dispatch }
// Plus convenience helpers added on top for cleaner component code.
//
// Spec version (web):
//   export function useTasks() {
//     const [state, dispatch] = useReducer(taskReducer, initialTaskState);
//     useEffect(() => { /* load */ }, []);
//     useEffect(() => { /* persist */ }, [state.tasks]);
//     return { tasks: state.tasks, dispatch };
//   }
// ─────────────────────────────────────────────────────────────────────────────
import { useReducer, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  taskReducer,
  initialTaskState,
  Task,
  Priority,
  TaskAction,
} from '../reducers/taskReducer';

const STORAGE_KEY = '@swe101_tasks';

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [loading, setLoading] = useState(true);

  // ── Effect 1: load from AsyncStorage on mount ─────────────────────────────
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          dispatch({ type: 'LOAD_FROM_STORAGE', tasks: JSON.parse(raw) });
        }
      })
      .catch((err) => console.warn('useTasks load error:', err))
      .finally(() => setLoading(false));
  }, []);

  // ── Effect 2: persist whenever tasks change ───────────────────────────────
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks)).catch(
        (err) => console.warn('useTasks save error:', err)
      );
    }
  }, [state.tasks, loading]);

  // ── Effect 3: log count changes (Part 2 exercise carried forward) ─────────
  useEffect(() => {
    console.log(`[useTasks] Task count: ${state.tasks.length}`);
  }, [state.tasks.length]);

  // ── Convenience dispatchers (built on top of raw dispatch) ────────────────
  const addTask = useCallback(
    (title: string, priority: Priority) =>
      dispatch({
        type: 'ADD_TASK',
        task: { id: Date.now(), title, priority },
      }),
    []
  );

  const toggleDone = useCallback(
    (id: number) => dispatch({ type: 'TOGGLE_DONE', id }),
    []
  );

  const clearCompleted = useCallback(
    () => dispatch({ type: 'CLEAR_COMPLETED' }),
    []
  );

  const editTask = useCallback(
    (id: number, title: string) => dispatch({ type: 'EDIT_TASK', id, title }),
    []
  );

  // ── Derived values ────────────────────────────────────────────────────────
  const doneCount    = state.tasks.filter((t) => t.done).length;
  const pendingCount = state.tasks.length - doneCount;

  // Return raw dispatch too (matches spec API) plus convenience helpers
  return {
    tasks: state.tasks,
    dispatch,          // raw dispatch — matches spec: { tasks, dispatch }
    loading,
    addTask,
    toggleDone,
    clearCompleted,
    editTask,
    doneCount,
    pendingCount,
  };
}
