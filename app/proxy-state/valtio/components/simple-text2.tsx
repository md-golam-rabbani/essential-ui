'use client';

import { Typography } from '@/components/typography';
import { store, setSimpleText, resetSimpleText } from '../store/counter/store';
import { CustomButton } from '@/components/custom-button';
import { useSnapshot } from 'valtio';

export function SimpleText2() {
  // !TODO: Bad implementation
  //   const { simpleText, setSimpleText, resetSimpleText } = useCounterStore();

  // Recommended implementation
  const { simpleText } = useSnapshot(store);

  console.log(simpleText, `Simple text 2 `);

  return (
    <div className="rounded-lg bg-white p-6  shadow-2xl">
      <div className="space-y-4">
        <Typography size="h2">Simple Text 2</Typography>
        <Typography size="p1">{simpleText}</Typography>

        <div className="grid grid-cols-2 gap-3">
          <CustomButton
            colorScheme="primary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={() =>
              setSimpleText(
                'Hi i am simple text ' + Math.round(Math.random() * 1000)
              )
            }
          >
            Set text
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={() => resetSimpleText()}
          >
            Reset text
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
