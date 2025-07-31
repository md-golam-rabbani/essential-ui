'use client';

import { useState } from 'react';
import { useTasks, useTasksDispatch } from '../../context/tasksContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Task } from '../../types';

export default function TaskList() {
  const tasks = useTasks() ?? [];

  return (
    <>
      {tasks && tasks.length > 0 && (
        <ul className="space-y-2">
          {tasks?.map((task, index) => (
            <li key={index}>
              <Task task={task} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

type TaskProps = {
  task: Task;
};

function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();

  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <Input
          value={task?.text}
          onChange={(e) => {
            dispatch?.({
              type: 'changed',
              payload: {
                task: {
                  ...task,
                  text: e.target.value
                }
              }
            });
          }}
        />
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </>
    );
  } else {
    taskContent = (
      <>
        <Input value={task?.text} disabled />

        <Button variant={'secondary'} onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {taskContent}

      <Button
        variant={'destructive'}
        onClick={() => {
          dispatch?.({
            type: 'deleted',
            payload: {
              id: task?.id
            }
          });
        }}
      >
        Delete
      </Button>
    </div>
  );
}
