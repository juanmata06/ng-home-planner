import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [],
  template: `<p>login-page works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage { }
