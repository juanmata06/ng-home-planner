import { Task, TaskStatus } from "./task.interface";

export interface TasksColumn {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}