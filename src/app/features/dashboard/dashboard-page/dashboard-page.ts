import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Dashboard } from "../components/index";

@Component({
  selector: 'app-dashboard-page',
  imports: [Dashboard],
  template: `<div class="p-2">
    <app-dashboard />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage { } // TODO: llamar store desde aqui
