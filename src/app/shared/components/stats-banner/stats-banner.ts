import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stats-banner',
  imports: [],
  template: `
    <div class="py-2 flex flex-wrap justify-center gap-4">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host: { class: 'py-6'
})
export class StatsBanner {}
