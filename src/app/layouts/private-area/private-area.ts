import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthStore, TasksStore } from '@shared/store';
import { CustomHeader, LoadingSpinner } from '@shared/components';

@Component({
  selector: 'app-private-area',
  imports: [RouterOutlet, CustomHeader, LoadingSpinner],
  host: { class: 'flex flex-col h-screen' },
  template: `
    <app-custom-header />
    <div class="flex-1">
      @if (!authStore.isAuthLoading() && !tasksStore.isTasksLoading()) {
        <router-outlet />
      } @else {
        <app-loading-spinner />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivateArea {
  protected readonly authStore = inject(AuthStore);
  protected readonly tasksStore = inject(TasksStore);
}
