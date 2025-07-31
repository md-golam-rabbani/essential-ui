'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function CounterMain() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="mx-auto max-w-[560px] space-y-6 rounded-2xl bg-white p-10 shadow-lg">
        <h2 className="text-3xl font-semibold text-black">Day off in Kyoto</h2>

        <p className="text-2xl font-semibold text-black">Count: {count}</p>

        <div className="flex items-center gap-4">
          <Button
            variant={'default'}
            onClick={() => setCount((prev) => prev + 1)}
          >
            Increment
          </Button>

          <Button
            variant={'destructive'}
            onClick={() => setCount((prev) => prev - 1)}
          >
            Decrement
          </Button>
        </div>
      </div>
    </>
  );
}
