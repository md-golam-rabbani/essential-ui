import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  count: number;
  simpleText: string | null;
};

const initialValues: CounterState = {
  count: 0,
  simpleText: 'Default simple text',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialValues,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
    reset: (state) => {
      state.count = initialValues.count;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
