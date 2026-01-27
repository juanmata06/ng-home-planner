import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-dashboard-header',
  imports: [],
  template: `
    <nav class="flex justify-between items-center gap-4">
      <h2 class="font-bold">
        {{ 'Week 19 - 25 / JAN' }}
      </h2>
      <input type="text" />
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDashboardHeader {}
