'use client';

import { CustomButton } from '@/components/custom-button';
import { Typography } from '@/components/typography';

type CounterProps = {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleReset: () => void;
};

export function Counter({
  count,
  handleDecrement,
  handleIncrement,
  handleReset,
}: CounterProps) {
  return (
    <div className="mx-auto max-w-[500px] rounded-lg bg-white p-6">
      <div className="space-y-6">
        <Typography size="h2">Counter</Typography>

        <div className="space-y-4">
          <Typography size="h3">Count: {count}</Typography>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <CustomButton
              colorScheme="primary"
              disabled={count >= 10}
              type="action"
              onButtonClick={() => handleIncrement()}
              variant="fill"
            >
              Increment
            </CustomButton>

            <CustomButton
              colorScheme="primary"
              disabled={count < 1}
              type="action"
              onButtonClick={() => handleDecrement()}
              variant="fill"
            >
              Decrement
            </CustomButton>

            <CustomButton
              colorScheme="secondary"
              disabled={false}
              type="action"
              onButtonClick={() => handleReset()}
              variant="fill"
              className="fill"
            >
              reset
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
