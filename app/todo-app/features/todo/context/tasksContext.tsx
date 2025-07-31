'use client';

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';
import { Task, TaskAction } from '../types';

const TasksContext = createContext<Task[] | null>(null);

const TasksDispatchContext = createContext<Dispatch<TaskAction> | null>(null);

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext>
    </TasksContext>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }

  return context;
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);

  if (!context) {
    throw new Error('useTasksDispatch must be used within TasksProvider');
  }

  return context;
}

function tasksReducer(state: Task[], action: TaskAction) {
  switch (action.type) {
    case 'added': {
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          done: false
        }
      ];
    }

    case 'changed': {
      return state.map((t) => {
        if (t.id === action.payload.task.id) {
          return action.payload.task;
        } else {
          return t;
        }
      });
    }

    case 'deleted': {
      return state.filter((t) => t.id !== action.payload.id);
    }

    default: {
      throw Error('Unknown action:');
    }
  }
}

const initialTasks: Task[] = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
