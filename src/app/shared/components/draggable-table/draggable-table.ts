import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  CdkDropListGroup,
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Task } from '@shared/index';

import { DraggableItem } from '../draggable-item/draggable-item';

import { DraggableColumn } from '../draggable-column/draggable-column';

@Component({
  selector: 'app-draggable-table',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, DraggableColumn, DraggableItem],
  template: `
    <!-- <app-prueba-draggable /> -->
    <div cdkDropListGroup class="py-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      <app-draggable-column
        cdkDropList
        [cdkDropListData]="todo"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'TODO' }}
        </ng-container>
        <div class="p-2">
          @for (item of todo; let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </div>
      </app-draggable-column>
      <app-draggable-column
        cdkDropList
        [cdkDropListData]="doing"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'DOING' }}
        </ng-container>
        <div class="p-2">
          @for (item of doing; let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </div>
      </app-draggable-column>
      <app-draggable-column
        cdkDropList
        [cdkDropListData]="done"
        (cdkDropListDropped)="drop($event)"
      >
        <ng-container column-title>
          {{ 'DONE' }}
        </ng-container>
        <div class="p-2">
          @for (item of done; let i = $index; track item) {
            <app-draggable-item cdkDrag>
              {{ item.title }}
            </app-draggable-item>
          }
        </div>
      </app-draggable-column>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableTable {
  todo: Task[] = [
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
    {
      id: 't3',
      title: 'Go home',
      description: 'Return home after work',
      status: 'TODO',
      createdAt: new Date('2025-01-03'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
    {
      id: 't4',
      title: 'Fall asleep',
      description: 'End of day',
      status: 'TODO',
      createdAt: new Date('2025-01-04'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
  ];

  doing: Task[] = [
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
    {
      id: 'd3',
      title: 'Sleep',
      description: 'Resting',
      status: 'DOING',
      startDate: new Date(),
      createdAt: new Date('2025-01-03'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
    {
      id: 'd4',
      title: 'Repeat',
      description: 'Daily routine',
      status: 'DOING',
      startDate: new Date(),
      createdAt: new Date('2025-01-04'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
  ];

  done: Task[] = [
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
    {
      id: 'dn2',
      title: 'Brush teeth',
      description: 'Morning hygiene',
      status: 'DONE',
      lastCompletedDate: new Date(),
      endDate: new Date(),
      createdAt: new Date('2024-12-30'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
    {
      id: 'dn3',
      title: 'Take a shower',
      description: 'Morning shower',
      status: 'DONE',
      lastCompletedDate: new Date(),
      endDate: new Date(),
      createdAt: new Date('2024-12-30'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
    {
      id: 'dn4',
      title: 'Check e-mail',
      description: 'Review inbox',
      status: 'DONE',
      lastCompletedDate: new Date(),
      endDate: new Date(),
      createdAt: new Date('2024-12-30'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
    {
      id: 'dn5',
      title: 'Walk dog',
      description: 'Morning walk',
      status: 'DONE',
      lastCompletedDate: new Date(),
      endDate: new Date(),
      createdAt: new Date('2024-12-30'),
      createdById: '',
      createdBy: '',
      assignedToId: '',
      assignedTo: '',
    },
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
