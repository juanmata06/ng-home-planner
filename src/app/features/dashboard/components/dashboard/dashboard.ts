import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  template: `<p class="bg-primary">dashboard works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Dashboard { }
