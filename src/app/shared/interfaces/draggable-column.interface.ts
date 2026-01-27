import { Task, TaskStatus } from "./task.interface";

export interface DraggableColumn {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}