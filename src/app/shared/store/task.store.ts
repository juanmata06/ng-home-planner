import { inject, effect, computed } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

import { Task, TaskStatus } from '../interfaces/index';
import { TaskService } from '../services/index';
import { Subject, takeUntil } from 'rxjs';

type TaskState = {
  tasks: Task[];
  isTasksLoading: boolean;
};

const initialState: TaskState = {
  tasks: [],
  isTasksLoading: false,
};

const filteredTasks = (tasks: Task[], status: TaskStatus) => {
  return tasks.filter((task) => task.status === status);
};

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState<TaskState>(initialState),
  withComputed((store) => ({
    totalTasks: computed(() => store.tasks().length),
    todoTasks: computed(() => filteredTasks(store.tasks(), 'TODO')),
    doingTasks: computed(() => filteredTasks(store.tasks(), 'DOING')),
    doneTasks: computed(() => filteredTasks(store.tasks(), 'DONE')),
    tasksInProgress: computed(() => filteredTasks(store.tasks(), 'DOING').length),
    completionRate: computed(() => {
      const total = store.tasks().length;
      const done = filteredTasks(store.tasks(), 'DONE').length;
      return total > 0 ? Math.round(((done / total) * 100) * 100) / 100 : 0;
    }),
  })),
  withMethods((
    store, 
    taskService = inject(TaskService), 
    destroy$ = new Subject<void>()
  ) => ({
    destroySubject: () => destroy$,
    getAllTasks: (): void => {
      patchState(store, { isTasksLoading: true });
      taskService
        .getAllTasks()
        .pipe(takeUntil(destroy$))
        .subscribe((tasks: Task[]) => {
          patchState(store, { 
            tasks, 
            isTasksLoading: false 
          });
        });
    },
    updateTask: (id: string, status: TaskStatus): void => {
      taskService
        .updateStatusTask(Number(id), status)
        .pipe(takeUntil(destroy$))
        .subscribe(() => {
          patchState(store, {
            tasks: store
              .tasks()
              .map((task) => (`${task.id}` === `${id}` ? { ...task, status } : task)),
          });
        });
    },
  })),
  withHooks({
    onInit(store) {
      store.getAllTasks();
    },
    onDestroy(store) {
      store.destroySubject().next();
      store.destroySubject().complete();
    },
  })
);
