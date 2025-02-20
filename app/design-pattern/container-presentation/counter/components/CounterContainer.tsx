'use client';

import { Counter } from './Counter';
import { useCounter } from './useCounter';

export function CounterContainer() {
  const { count, handleDecrement, handleIncrement, handleReset } = useCounter();
  const {
    count: count2,
    handleDecrement: handleDecrement2,
    handleIncrement: handleIncrement2,
    handleReset: handleReset2,
  } = useCounter();

  return (
    <div className="bg-slate-100 py-20">
      <div className="container">
        <div className="space-y-6">
          <Counter
            count={count}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleReset={handleReset}
          />

          <Counter
            count={count2}
            handleIncrement={handleIncrement2}
            handleDecrement={handleDecrement2}
            handleReset={handleReset2}
          />
        </div>
      </div>
    </div>
  );
}
