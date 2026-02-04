import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  WritableSignal,
  Signal,
  inject,
} from '@angular/core';

import {
  CdkDropListGroup,
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TasksStore } from '@shared/store';
import { Task, TaskStatus } from '@shared/interfaces';
import { CardComponent } from '@shared/components/card/card.component';
import { StatsBanner } from '@shared/components/stats-banner/stats-banner';
import { DraggableColumn, DraggableItem } from '@shared/components/draggable-table/components';

@Component({
  selector: 'app-draggable-table',
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    DraggableColumn,
    DraggableItem,
    StatsBanner,
    CardComponent,
  ],
  template: `
    <app-stats-banner>
      <app-card class="min-w-[340px] max-w-[20%]! block! text-center">
        <span class="text-size-h4!">
          TOTAL:
          <span class="font-bold text-size-h4!">{{ tasksStore.totalTasks() }}</span>
        </span>
      </app-card>
      <!-- TODO: -->
      <!-- <app-card class="min-w-[340px] max-w-[20%]! block! text-center">
        <span class="text-size-h4!">
          IN PROGRESS:
          <span class="font-bold text-size-h4!">{{ tasksStore.tasksInProgress() }}</span>
        </span>
      </app-card> -->
      <app-card class="min-w-[340px] max-w-[20%]! block! text-center">
        <span class="text-size-h4!">
          COMPLETION RATE:
          <span class="font-bold text-size-h4!">{{ tasksStore.completionRate() }}%</span>
        </span>
      </app-card>
    </app-stats-banner>
    <div cdkDropListGroup class="py-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      <app-draggable-column
        id="todo-column"
        cdkDropList
        [cdkDropListData]="tasksStore.todoTasks()"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'TODO' }}
        </ng-container>
        <ng-container column-body>
          @for (item of tasksStore.todoTasks(); let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </ng-container>
      </app-draggable-column>
      <!-- TODO: -->
      <!-- <app-draggable-column
        id="doing-column"
        cdkDropList
        [cdkDropListData]="tasksStore.doingTasks()"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'DOING' }}
        </ng-container>
        <ng-container column-body>
          @for (item of tasksStore.doingTasks(); let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </ng-container>
      </app-draggable-column> -->
      <app-draggable-column
        id="done-column"
        cdkDropList
        [cdkDropListData]="tasksStore.doneTasks()"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'DONE' }}
        </ng-container>
        <ng-container column-body>
          @for (item of tasksStore.doneTasks(); let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </ng-container>
      </app-draggable-column>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableTable {
  readonly tasksStore = inject(TasksStore);

  readonly statusMap: Record<string, TaskStatus> = {
    'todo-column': 'TODO',
    'doing-column': 'DOING',
    'done-column': 'DONE',
  };

  drop(event: CdkDragDrop<Task[]>) {
    const { previousIndex, currentIndex, container, previousContainer } = event;
    if (previousContainer.id !== container.id) {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
      const task: Task = container.data[currentIndex];
      const columnId = container.id;
      const targetColumn = this.statusMap[columnId];
      this.tasksStore.updateTask(task.id, targetColumn);
    }
  }
}
