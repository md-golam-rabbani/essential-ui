import { useState } from 'react';

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = (by?: number) => {
    setCount((prev) => prev + (by ?? 1));
  };

  const handleDecrement = (by?: number) => {
    setCount((prev) => prev - (by ?? 1));
  };

  const handleReset = () => {
    setCount(initialValue);
  };

  return {
    count,
    handleIncrement,
    handleDecrement,
    handleReset,
  };
};
