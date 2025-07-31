import { TasksProvider } from './context/tasksContext';
import AddTask from './components/add-task';
import TaskList from './components/task-list';

export function TodoMain() {
  return (
    <TasksProvider>
      <div className="mx-auto max-w-[560px] space-y-6 rounded-2xl bg-white p-10 shadow-lg">
        <h2 className="text-3xl font-semibold text-black">Day off in Kyoto</h2>

        <AddTask />

        <TaskList />
      </div>
    </TasksProvider>
  );
}
