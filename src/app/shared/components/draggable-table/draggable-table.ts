import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';

import {
  CdkDropListGroup,
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Task, TaskStatus } from '@shared/index';

import { DraggableColumn, DraggableItem } from './components/index';

@Component({
  selector: 'app-draggable-table',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, DraggableColumn, DraggableItem],
  template: `
    <div cdkDropListGroup class="py-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      <app-draggable-column
        id="todo-column"
        cdkDropList
        [cdkDropListData]="todo()"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'TODO' }}
        </ng-container>
        <ng-container column-body>
          @for (item of todo(); let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </ng-container>
      </app-draggable-column>
      <app-draggable-column
        id="doing-column"
        cdkDropList
        [cdkDropListData]="doing()"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'DOING' }}
        </ng-container>
        <ng-container column-body>
          @for (item of doing(); let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </ng-container>
      </app-draggable-column>
      <app-draggable-column
        id="done-column"
        cdkDropList
        [cdkDropListData]="done()"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'DONE' }}
        </ng-container>
        <ng-container column-body>
          @for (item of done(); let i = $index; track item) {
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
  readonly statusMap: Record<string, TaskStatus> = {
    'todo-column': 'TODO',
    'doing-column': 'DOING',
    'done-column': 'DONE',
  };

  todo: WritableSignal<Task[]> = signal<Task[]>([
    {
      id: 't1',
      title: 'Get to work',
      description: 'Task pending to be started',
      status: 'TODO',
      createdAt: new Date('2025-01-01'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
    {
      id: 't2',
      title: 'Pick up groceries',
      description: 'Buy food for the week',
      status: 'TODO',
      createdAt: new Date('2025-01-02'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
  ]);

  doing: WritableSignal<Task[]> = signal<Task[]>([
    {
      id: 'd1',
      title: 'Eat',
      description: 'Lunch break',
      status: 'DOING',
      startDate: new Date(),
      createdAt: new Date('2025-01-01'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
    {
      id: 'd2',
      title: 'Code',
      description: 'Working on features',
      status: 'DOING',
      startDate: new Date(),
      createdAt: new Date('2025-01-02'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
  ]);

  done: WritableSignal<Task[]> = signal<Task[]>([
    {
      id: 'dn1',
      title: 'Get up',
      description: 'Wake up',
      status: 'DONE',
      lastCompletedDate: new Date(),
      endDate: new Date(),
      createdAt: new Date('2024-12-30'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
  ]);

  drop(event: CdkDragDrop<Task[]>) {
    const { previousIndex, currentIndex, container, previousContainer } = event;

    if (previousContainer.id === container.id) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
      const task: Task = container.data[currentIndex];
      const columnId = container.id;
      const targetColumn = this.statusMap[columnId];
      this.handleTaskStatusChange(task, targetColumn);
    }
  }

  handleTaskStatusChange(task: Task, targetColumn: TaskStatus) {
    const previousStatus = task.status;
    task.status = targetColumn;

    console.log(task);
  }
}
