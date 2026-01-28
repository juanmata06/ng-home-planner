export type TaskStatus = 'TODO' | 'DOING' | 'DONE';

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
