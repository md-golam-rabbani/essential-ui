'use client';

import { CounterProvider } from '../hooks/counterContext';
import { Counter } from './counter';
import { Counter2 } from './counter2';
import { SimpleText } from './simple-text';
import { SimpleText2 } from './simple-text2';

export function Main() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="grid grid-cols-4 gap-6">
          <CounterProvider>
            <Counter />
            <Counter2 />
            <SimpleText />
            <SimpleText2 />
          </CounterProvider>
        </div>
      </div>
    </div>
  );
}
