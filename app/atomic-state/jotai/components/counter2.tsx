'use client';

import { Typography } from '@/components/typography';
import { countAtom } from '../store/counter/store';
import { useAtomValue } from 'jotai';

export function Counter2() {
  const count = useAtomValue(countAtom);

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
