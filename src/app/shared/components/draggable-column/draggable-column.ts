import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-draggable-column',
  imports: [],
  template: `
    <!-- Column Header -->
    <div id="column-header" class="p-2 flex justify-center">
      <h3 class="w-[95%] font-bold">
        <ng-content select="[column-title]" />
      </h3>
      <span>X</span>
    </div>
    <!-- Column Body -->
    <ng-content />
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
export class DraggableColumn {}
