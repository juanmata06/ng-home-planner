import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-draggable-column',
  imports: [],
  template: `
    <!-- Column Header -->
    <div id="column-header" class="flex justify-center">
      <h5 class="w-[95%] font-bold">
        <ng-content select="[column-title]" />
      </h5>
      <span>X</span>
    </div>
    <!-- Column Body -->
    <div id="column-body" class="max-h-[60vh] overflow-y-auto flex flex-col gap-2">
      <ng-content select="[column-body]" />
    </div>
    <!-- Column Footer -->
    <div id="column-footer">
      <button
        (click)="addItemClicked.emit(true)"
        class="w-full px-1 text-start cursor-pointer rounded-md border-[1.5px] border-transparent hover:border-gray-strong"
      >
        Add Item +
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'h-full bg-gray-medium border-[1.5px] border-gray-medium rounded-md p-2 w-100 w-[20%]-md flex flex-col gap-2',
  },
})
export class DraggableColumn {
  public addItemClicked = output<boolean>();
}
