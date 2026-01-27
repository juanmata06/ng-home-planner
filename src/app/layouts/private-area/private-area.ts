import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CutomHeader } from '@shared/components';

@Component({
  selector: 'app-private-area',
  imports: [RouterOutlet, CutomHeader],
  template: `
    <app-cutom-header />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivateArea {}
