import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef } from '@angular/core';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Task, TaskStatus } from '@shared/index';

import { DraggableItem } from '../draggable-item/draggable-item';

@Component({
  selector: 'app-draggable-column',
  imports: [CdkDropList, CdkDrag, DraggableItem],
  template: `
    <!-- Column Header -->
    <div id="column-header" class="p-2 flex justify-center">
      <h3 class="w-[95%] font-bold">
        {{ columnName }}
      </h3>
      <span>X</span>
    </div>
    <!-- Column Body -->
    <div
      [id]="'column-' + columnStatus"
      cdkDropList
      [cdkDropListData]="items"
      (cdkDropListDropped)="drop($event)"
      class="px-2"
    >
      @for (item of items; let i = $index; track item) {
        <app-draggable-item cdkDrag>{{ item.title }}</app-draggable-item>
      }
    </div>
    <!-- Column Footer -->
    <div id="column-footer" class="p-2">
      <button
        class="w-full px-1 text-start cursor-pointer rounded-md border-[1.5px] border-transparent hover:border-gray-strong"
      >
        Add Item +
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bg-gray-medium border-[1.5px] border-gray-medium rounded-md',
  },
})
export class DraggableColumn {
  @Input() columnStatus!: TaskStatus;
  @Input() columnName!: string;
  @Input() items: Task[] = [];

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
