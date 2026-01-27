import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

import { CustomDraggableColumn } from '../custom-draggable-column/custom-draggable-column';

@Component({
  selector: 'app-custom-draggable-table',
  imports: [CdkDropListGroup, CustomDraggableColumn],
  template: `
    <div cdkDropListGroup class="py-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      <app-custom-draggable-column columnName="TO DO" [items]="todo" />
      <app-custom-draggable-column columnName="DOING" [items]="doing" />
      <app-custom-draggable-column columnName="DONE" [items]="done" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDraggableTable {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing = ['Eat', 'Code', 'Sleep', 'Repeat'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
}
