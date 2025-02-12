'use client';

import { Typography } from '@/components/typography';
import { useCounterState } from '../hooks/counterContext';

export function Counter2() {
  const { count } = useCounterState();

  console.log(count, `from counter 2 component`);

  return (
    <div className="rounded-lg bg-white p-6 shadow-2xl">
      <div className="space-y-4">
        <Typography size="h2">Counter 2</Typography>
        <Typography size="h3">{count}</Typography>
      </div>
    </div>
  );
}
