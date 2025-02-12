'use client';

import { Typography } from '@/components/typography';
import { store } from '../store/counter/store';
import { useSnapshot } from 'valtio';

export function Counter2() {
  const { count } = useSnapshot(store);

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
