export type Task = {
    id: number;
    title: string;
    description: string;
    checked: boolean;
  }

export type LoaderData = {
    tasks: Task[];
  };