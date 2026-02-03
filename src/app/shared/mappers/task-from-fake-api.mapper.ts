import { Task, FakeApiTask } from '@shared/interfaces';


export function mapFakeApiTaskToTask(fakeTask: FakeApiTask): Task {
  return {
    id: fakeTask.id.toString(),
    title: fakeTask.title,
    description: undefined,
    status: fakeTask.completed ? 'DONE' : 'TODO',
    lastCompletedDate: fakeTask.completed ? new Date() : undefined,
    createdAt: new Date(),
    startDate: undefined,
    endDate: undefined,
    createdById: fakeTask.userId.toString(),
    createdBy: undefined,
    assignedToId: fakeTask.userId.toString(),
    assignedTo: undefined,
  };
}
