import { proxy } from 'valtio';

type CounterState = {
  count: number;
  simpleText: string | null;
};

// TODO: Need to experiment with deeply nested object
const initialValues: CounterState = {
  count: 0,
  simpleText: 'Default simple text',
};

export const store = proxy({ ...initialValues });

export const increment = () => {
  return (store.count += 1);
};

export const decrement = () => {
  return (store.count -= 1);
};

export const reset = () => {
  return (store.count = initialValues.count);
};

export const setSimpleText = (text: string) => {
  return (store.simpleText = text);
};

export const resetSimpleText = () => {
  return (store.simpleText = initialValues.simpleText);
};
