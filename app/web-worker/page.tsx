'use client';

import { CustomButton } from '@/components/custom-button';
import { Typography } from '@/components/typography';
import { useEffect, useRef, useState } from 'react';

const taskLimit = 1e10;

export default function Page() {
  const [counter, setCounter] = useState(0);
  const [workerResult, setWorkerResult] = useState<null | number>(null);
  const [nonWorkerResult, setNonWorkerResult] = useState<null | number>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const workerInstance = new Worker(
      new URL('./web-worker.ts', import.meta.url)
    );
    workerRef.current = workerInstance;

    workerInstance.onmessage = function (e) {
      setWorkerResult(e.data);
    };

    return () => {
      workerInstance.terminate();
    };
  }, []);

  function handleClick() {
    if (workerRef.current) {
      workerRef.current.postMessage(taskLimit);
    }
  }

  return (
    <div className="py-20">
      <div className="container">
        <div className="space-y-12">
          <div className="space-y-8">
            <Typography size="h1">Web Worker</Typography>
            <Typography size="h2">Worker Result: {workerResult}</Typography>
            <Typography size="h2">Counter: {counter}</Typography>
            <Typography size="h2">
              Non worker result: {nonWorkerResult}
            </Typography>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="grid gap-2">
              <CustomButton
                type="action"
                colorScheme="primary"
                disabled={false}
                onButtonClick={handleClick}
                variant="fill"
              >
                Worker Task
              </CustomButton>
              <CustomButton
                type="action"
                colorScheme="secondary"
                disabled={false}
                onButtonClick={() => {
                  setWorkerResult(null);
                }}
                variant="fill"
              >
                Reset
              </CustomButton>
            </div>

            <div className="grid gap-2">
              <CustomButton
                type="action"
                colorScheme="primary"
                disabled={false}
                onButtonClick={() => {
                  let sum = 0;
                  for (let i = 0; i < taskLimit; i++) {
                    sum += i;
                  }

                  setNonWorkerResult(sum);
                }}
                variant="fill"
              >
                Normal worker Task
              </CustomButton>
              <CustomButton
                type="action"
                colorScheme="secondary"
                disabled={false}
                onButtonClick={() => {
                  setNonWorkerResult(null);
                }}
                variant="fill"
              >
                Reset
              </CustomButton>
            </div>

            <div className="grid gap-2">
              <CustomButton
                type="action"
                colorScheme="primary"
                disabled={false}
                onButtonClick={() => {
                  setCounter((prev) => prev + 1);
                }}
                variant="fill"
              >
                Counter
              </CustomButton>
              <CustomButton
                type="action"
                colorScheme="secondary"
                disabled={false}
                onButtonClick={() => {
                  setCounter(0);
                }}
                variant="fill"
              >
                Reset
              </CustomButton>
            </div>
          </div>

          <div>
            <CustomButton
              type="action"
              colorScheme="secondary"
              disabled={false}
              onButtonClick={() => {
                setNonWorkerResult(null);
                setWorkerResult(null);
                setCounter(0);
              }}
              variant="fill"
            >
              Reset All
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
