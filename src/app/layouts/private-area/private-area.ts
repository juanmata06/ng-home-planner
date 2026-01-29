import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomHeader } from '@shared/components';

@Component({
  selector: 'app-private-area',
  imports: [RouterOutlet, CustomHeader],
  template: `
    <app-custom-header />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivateArea {}
