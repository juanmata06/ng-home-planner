import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-prueba-draggable',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
  template: `
    <div cdkDropListGroup>
      <div class="example-container">
        <h2>To do</h2>
        <div
          cdkDropList
          [cdkDropListData]="todo"
          class="example-list"
          (cdkDropListDropped)="drop($event)"
        >
          @for (item of todo; track item) {
            <div class="example-box" cdkDrag>{{ item }}</div>
          }
        </div>
      </div>
      <div class="example-container">
        <h2>Done</h2>
        <div
          cdkDropList
          [cdkDropListData]="done"
          class="example-list"
          (cdkDropListDropped)="drop($event)"
        >
          @for (item of done; track item) {
            <div class="example-box" cdkDrag>{{ item }}</div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PruebaDraggable {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  drop(event: CdkDragDrop<string[]>) {
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
