'use client';

import { Typography } from '@/components/typography';
import { store, increment, decrement, reset } from '../store/counter/store';
import { CustomButton } from '@/components/custom-button';
import { useSnapshot } from 'valtio';

export function Counter() {
  //   const { count, increment, decrement } = useCounterStore();
  const { count } = useSnapshot(store);

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
            onButtonClick={() => increment()}
          >
            Increment
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={count === 0}
            type="action"
            onButtonClick={() => decrement()}
          >
            Decrement
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={() => reset()}
          >
            Reset
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
