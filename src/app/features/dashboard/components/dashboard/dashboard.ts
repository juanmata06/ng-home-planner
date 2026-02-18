import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent, DraggableTable, StatsBanner } from '@shared/components';
import { CustomDashboardHeader } from '@features/dashboard/components/custom-dashboard-header/custom-dashboard-header';

@Component({
  selector: 'app-dashboard',
  imports: [CustomDashboardHeader, CardComponent, DraggableTable, StatsBanner],
  template: `
    <app-stats-banner />
    <app-card class="flex flex-col">
      <app-custom-dashboard-header />
      <app-draggable-table />
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
