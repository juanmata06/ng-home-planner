import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardComponent, LoginFormComponent } from '@shared/components';

@Component({
  selector: 'app-login-page',
  imports: [CardComponent, LoginFormComponent],
  template: `
    <div class="flex max-w-7xl m-auto p-4 items-center min-h-screen gap-6">
      <div class="flex items-center justify-center w-full">
        <app-card class="w-full md:w-1/2 bg-black!">
          <app-login-form 
            class="p-4" 
            (formSubmitted)="onFormSubmitted($event)" 
          />
        </app-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  onFormSubmitted(formValue: any): void {
    console.log(formValue);
  }
}
