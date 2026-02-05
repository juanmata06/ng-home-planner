import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  template: `
    <div class="flex items-center justify-center h-full">
      <div id="spinner-container" class="flex items-center justify-center">
        <div
          id="spinner"
          class="
            h-20 w-20 animate-spin rounded-full 
            border-10 border-gray-medium border-t-primary
          "
        ></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinner {}
