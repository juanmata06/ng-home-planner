import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-area',
  imports: [],
  template: `<p>auth-area works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthArea { }
