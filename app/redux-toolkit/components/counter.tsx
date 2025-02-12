'use client';

import { Typography } from '@/components/typography';
import { RootState } from '../store/store';
import { CustomButton } from '@/components/custom-button';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from '../store/slices/counterSlice';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment(1));
  }

  function handleDecrement() {
    dispatch(decrement(1));
  }

  function handleReset() {
    dispatch(reset());
  }

  console.log(count, `count from counter component`);

  return (
    <div className="rounded-lg bg-white p-6  shadow-2xl">
      <div className="space-y-4">
        <Typography size="h2">Counter</Typography>
        <Typography size="h3">{count}</Typography>

        <div className="grid gap-2">
          <CustomButton
            colorScheme="primary"
            variant="fill"
            disabled={(count ?? 0) >= 10}
            type="action"
            onButtonClick={handleIncrement}
          >
            Increment
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={count === 0}
            type="action"
            onButtonClick={handleDecrement}
          >
            Decrement
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={handleReset}
          >
            Reset
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
