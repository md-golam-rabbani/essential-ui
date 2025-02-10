import { create } from 'zustand';

type CounterState = {
  count: number | null;
  simpleText: string | null;
};

type CounterAction = {
  increment: (by?: CounterState['count']) => void;
  decrement: (by?: CounterState['count']) => void;
  reset: () => void;
  setSimpleText: (by?: CounterState['simpleText']) => void;
  resetSimpleText: () => void;
};

type CounterStore = CounterState & CounterAction;

const initialValues: CounterState = {
  count: 0,
  simpleText: 'Default simple text',
};

export const useCounterStore = create<CounterStore>((set) => ({
  ...initialValues,
  increment: (by) =>
    set((state) => ({ count: (state.count ?? 0) + (by ?? 1) })),
  decrement: (by) =>
    set((state) => ({ count: (state.count ?? 0) - (by ?? 1) })),
  reset: () => set(() => ({ count: initialValues.count })),
  setSimpleText: (by) => set(() => ({ simpleText: by })),
  resetSimpleText: () => set(() => ({ simpleText: initialValues.simpleText })),
}));
