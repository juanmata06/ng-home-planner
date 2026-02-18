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
import { DraggableColumn, DraggableItem } from '@shared/components/draggable-table/components';
import { ModalService } from '@shared/services/modal-service';
import { TaskDetailsModal } from '../task-details-modal/task-details-modal';

@Component({
  selector: 'app-draggable-table',
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    DraggableColumn,
    DraggableItem,
  ],
  template: `
    <div
      cdkDropListGroup
      class="py-2 flex flex-col justify-center md:flex-row items-center md:items-start gap-4"
    >
      <app-draggable-column
        id="todo-column"
        cdkDropList
        [cdkDropListData]="tasksStore.todoTasks()"
        (cdkDropListDropped)="drop($event)"
        (addItemClicked)="openCreateTaskModal('TODO')"
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
      <app-draggable-column 
        id="doing-column"
        (addItemClicked)="openCreateTaskModal('DOING')"
      >
        <ng-container column-title>
          {{ 'DOING' }}
        </ng-container>
        <!-- TODO: -->
        <ng-container column-body> </ng-container>
      </app-draggable-column>
      <app-draggable-column
        id="done-column"
        cdkDropList
        [cdkDropListData]="tasksStore.doneTasks()"
        (cdkDropListDropped)="drop($event)"
        (addItemClicked)="openCreateTaskModal('DONE')"
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
  readonly modalService: ModalService = inject(ModalService);
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

  openCreateTaskModal(status: TaskStatus) {
    this.modalService.openModal(TaskDetailsModal, 60)
  }
}
