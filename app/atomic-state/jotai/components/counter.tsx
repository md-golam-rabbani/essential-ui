'use client';

import { Typography } from '@/components/typography';
import { countAtom, initialValues } from '../store/counter/store';
import { CustomButton } from '@/components/custom-button';
import { useAtom } from 'jotai';

export function Counter() {
  //   const { count, increment, decrement } = useCounterStore();
  const [count, setCount] = useAtom(countAtom);

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
            onButtonClick={() => setCount((count) => count + 1)}
          >
            Increment
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={count === 0}
            type="action"
            onButtonClick={() => setCount((count) => count - 1)}
          >
            Decrement
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={() => setCount(initialValues.count)}
          >
            Reset
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
