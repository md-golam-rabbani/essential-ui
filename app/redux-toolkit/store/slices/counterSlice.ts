import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  count: number;
  simpleText: string | null;
};

type CounterPayload = {
  by: number;
};

type SimpleTextPayload = {
  text: string;
};

const initialValues: CounterState = {
  count: 0,
  simpleText: 'Default simple text',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialValues,
  reducers: {
    increment: (state, action: PayloadAction<CounterPayload | undefined>) => {
      state.count += action.payload?.by ?? 1;
    },
    decrement: (state, action: PayloadAction<CounterPayload | undefined>) => {
      state.count -= action.payload?.by ?? 1;
    },
    reset: (state) => {
      state.count = initialValues.count;
    },
    setSimpleText: (
      state,
      action: PayloadAction<SimpleTextPayload | undefined>
    ) => {
      if (action.payload?.text) {
        state.simpleText = action.payload.text;
      }
    },
    resetSimpleText: (state) => {
      state.simpleText = initialValues.simpleText;
    },
  },
});

export const { increment, decrement, reset, resetSimpleText, setSimpleText } =
  counterSlice.actions;

export default counterSlice.reducer;
