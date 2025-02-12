'use client';

import { Typography } from '@/components/typography';
import { useCounterDispatch, useCounterState } from '../hooks/counterContext';
import { CustomButton } from '@/components/custom-button';

export function Counter() {
  const { count } = useCounterState();
  const dispatch = useCounterDispatch();

  console.log(count, `from counter component`);

  return (
    <div className="rounded-lg bg-white p-6 shadow-2xl">
      <div className="space-y-4">
        <Typography size="h2">Counter</Typography>
        <Typography size="h3">{count}</Typography>

        <div className="grid gap-2">
          <CustomButton
            colorScheme="primary"
            variant="fill"
            disabled={count >= 10}
            type="action"
            onButtonClick={() => dispatch({ type: 'INCREMENT' })}
          >
            Increment
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={count === 0}
            type="action"
            onButtonClick={() => dispatch({ type: 'DECREMENT' })}
          >
            Decrement
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            type="action"
            disabled={false}
            onButtonClick={() => dispatch({ type: 'RESET' })}
          >
            Reset
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
