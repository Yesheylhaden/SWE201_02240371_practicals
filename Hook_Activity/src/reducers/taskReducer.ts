export type Priority = 'low' | 'normal' | 'high';

export type Task = {
  id: number;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: number;
};

// Initial state object 
export type TaskState = {
  tasks: Task[];
};

export const initialTaskState: TaskState = {
  tasks: [],
};

// Action union type
export type TaskAction =
  | { type: 'LOAD_FROM_STORAGE'; tasks: Task[] }
  | { type: 'ADD_TASK';          task: Omit<Task, 'done' | 'createdAt'> }
  | { type: 'TOGGLE_DONE';       id: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'EDIT_TASK';         id: number; title: string };

// Reducer 
export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {

    case 'LOAD_FROM_STORAGE':
      return { ...state, tasks: action.tasks };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...action.task, done: false, createdAt: Date.now() },
        ],
      };

    case 'TOGGLE_DONE':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.done),
      };

    // Exercise action
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };

    default:
      return state;
  }
}
