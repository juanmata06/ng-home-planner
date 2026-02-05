import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthStore } from '@shared/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ng-home-planner');
  private readonly authStore = inject(AuthStore);
}
