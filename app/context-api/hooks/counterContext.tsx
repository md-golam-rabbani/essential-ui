import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types
interface CounterState {
  count: number;
  simpleText: string;
}

type CounterAction =
  | { type: 'INCREMENT'; payload?: number }
  | { type: 'DECREMENT'; payload?: number }
  | { type: 'RESET' }
  | { type: 'SET_SIMPLE_TEXT'; payload?: string }
  | { type: 'RESET_SIMPLE_TEXT' };

// Initial State
const initialState: CounterState = {
  count: 0,
  simpleText: 'Default simple text',
};

// Reducer function
const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + (action.payload ?? 1) };
    case 'DECREMENT':
      return { ...state, count: state.count - (action.payload ?? 1) };
    case 'RESET':
      return { ...state, count: initialState.count };
    case 'SET_SIMPLE_TEXT':
      return { ...state, simpleText: action.payload ?? '' };
    case 'RESET_SIMPLE_TEXT':
      return { ...state, simpleText: initialState.simpleText };
    default:
      return state;
  }
};

// Create separate contexts for state and dispatch
const CounterStateContext = createContext<CounterState | undefined>(undefined);
const CounterDispatchContext = createContext<
  React.Dispatch<CounterAction> | undefined
>(undefined);

// Provider component
export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
};

// Custom hooks to use counter state and dispatch
export const useCounterState = () => {
  const context = useContext(CounterStateContext);
  if (!context) {
    throw new Error('useCounterState must be used within a CounterProvider');
  }
  return context;
};

export const useCounterDispatch = () => {
  const context = useContext(CounterDispatchContext);
  if (!context) {
    throw new Error('useCounterDispatch must be used within a CounterProvider');
  }
  return context;
};
