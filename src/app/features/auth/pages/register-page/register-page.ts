import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { RegisterFormComponent, CardComponent } from '@shared/components';
import { AuthStore } from '@shared/store/auth.store';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent, FontAwesomeModule, CardComponent],
  template: `
    <div class="flex max-w-7xl m-auto p-4 items-center min-h-screen gap-6">
      <div class="flex flex-col md:flex-row items-center md:items-stretch w-full gap-8">
        <app-card class="flex-col w-full md:w-1/2 min-h-[400px]">
          <div class="p-4">
            <div class="flex flex-col align-middle text-left">
              <h3 class="pb-4 select-none">
                {{ 'My Learning' }}
              </h3>
              <h2>{{ 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' }}.</h2>
            </div>
          </div>
          <div class="p-4">
            <ul>
              <li class="flex items-center gap-2">
                <fa-icon [icon]="faCheck" matListItemIcon />
                <span>
                  {{ 'Completely free of charge' }}
                </span>
              </li>
              <li class="flex items-center gap-2">
                <fa-icon [icon]="faCheck" matListItemIcon />
                <span>
                  {{ 'Book the best suTable timeslot for you' }}
                </span>
              </li>
              <li class="flex items-center gap-2">
                <fa-icon [icon]="faCheck" matListItemIcon />
                <span>
                  {{ 'See Clerk in action with your own products' }}
                </span>
              </li>
            </ul>
          </div>
        </app-card>
        <app-card class="w-full md:w-1/2 bg-black! min-h-[400px]">
          <app-register-form 
            class="p-4"
            (formSubmitted)="onFormSubmitted($event)" 
          />
        </app-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPage {
  private readonly authStore = inject(AuthStore);
  
  readonly faCheck: IconDefinition = faCheck;
  
  onFormSubmitted(formValue: any): void {
    this.authStore.registerUser({
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      userRole: 'User',
    });
  }
}
