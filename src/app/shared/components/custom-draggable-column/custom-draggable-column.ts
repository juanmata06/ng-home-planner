import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-custom-draggable-column',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './custom-draggable-column.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bg-gray-medium border-[1.5px] border-gray-medium rounded-md',
  },
})
export class CustomDraggableColumn {
  @Input() columnName!: string;
  @Input() items: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    const { previousIndex, currentIndex, container, previousContainer } = event;
    if (container === previousContainer) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
    }
    console.log(this.items);
    console.log({ previousIndex, currentIndex, container, previousContainer });
    
    
  }
}
