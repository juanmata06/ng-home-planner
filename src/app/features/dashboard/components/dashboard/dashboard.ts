import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardComponent, DraggableTable } from '@shared/components';

import { CustomDashboardHeader } from '@features/dashboard/components/custom-dashboard-header/custom-dashboard-header';

@Component({
  selector: 'app-dashboard',
  imports: [CustomDashboardHeader, CardComponent, DraggableTable],
  template: `
    <app-card class="flex flex-col">
      <app-custom-dashboard-header />
      <app-draggable-table />
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
