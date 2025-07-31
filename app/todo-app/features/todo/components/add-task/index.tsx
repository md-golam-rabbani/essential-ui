'use client';

import { FormEvent, useState } from 'react';
import { useTasksDispatch } from '../../context/tasksContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    dispatch?.({
      type: 'added',
      payload: {
        id: nextId++,
        text: text.trim()
      }
    });

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button type="submit">Add</Button>
    </form>
  );
}

let nextId = 3;
