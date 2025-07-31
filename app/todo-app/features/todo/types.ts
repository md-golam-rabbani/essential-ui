export type Task = {
  id: number;
  text: string;
  done: boolean;
};

export type TaskAction =
  | {
      type: 'added';
      payload: { id: number; text: string };
    }
  | {
      type: 'changed';
      payload: {
        task: Task;
      };
    }
  | {
      type: 'deleted';
      payload: {
        id: number;
      };
    };
