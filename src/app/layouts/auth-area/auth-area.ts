import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthStore } from '@shared/store/auth.store';
import { LoadingSpinner } from '@shared/components';

@Component({
  selector: 'app-auth-area',
  imports: [RouterOutlet, LoadingSpinner],
  host: { class: 'flex flex-col h-screen' },
  template: `
    <div class="flex-1">
      @if (authStore.isAuthLoading()) {
        <app-loading-spinner />
      } @else {
        <router-outlet />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthArea {
  protected readonly authStore = inject(AuthStore);
}
