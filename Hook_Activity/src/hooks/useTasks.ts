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

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks)).catch(
        (err) => console.warn('useTasks save error:', err)
      );
    }
  }, [state.tasks, loading]);

  useEffect(() => {
    console.log(`[useTasks] Task count: ${state.tasks.length}`);
  }, [state.tasks.length]);

  // Convenience dispatchers 
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

  const doneCount    = state.tasks.filter((t) => t.done).length;
  const pendingCount = state.tasks.length - doneCount;

  return {
    tasks: state.tasks,
    dispatch,         
    loading,
    addTask,
    toggleDone,
    clearCompleted,
    editTask,
    doneCount,
    pendingCount,
  };
}
