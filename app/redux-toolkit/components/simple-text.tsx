'use client';

import { Typography } from '@/components/typography';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export function SimpleText() {
  // !TODO: Bad implementation
  // const { simpleText } = useCounterStore();

  // Recommended implementation
  const simpleText = useSelector(
    (state: RootState) => state.counter.simpleText
  );

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
