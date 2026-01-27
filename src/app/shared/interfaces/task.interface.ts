export enum TaskStatus {
  Todo = 0,
  Doing = 1,
  Done = 2,
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  lastCompletedDate?: Date;
  createdAt: Date;
  startDate?: Date;
  endDate?: Date;
  createdById: string;
  createdBy: any;
  assignedToId: string;
  assignedTo: any;
}
