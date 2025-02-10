'use client';

import { Typography } from '@/components/typography';
import { useCounterStore } from '../store/counter/store';

export function SimpleText() {
  // !TODO: Bad implementation
  // const { simpleText } = useCounterStore();

  // Recommended implemenatation
  const simpleText = useCounterStore((state) => state.simpleText);

  console.log(simpleText, `from simple text component`);

  return (
    <div className="rounded-lg bg-white p-6 shadow-2xl">
      <div className="space-y-4">
        <Typography size="h2">Simple text</Typography>
        <Typography size="h3">{simpleText}</Typography>
      </div>
    </div>
  );
}
