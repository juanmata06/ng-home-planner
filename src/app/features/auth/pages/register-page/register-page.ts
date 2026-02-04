import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RegisterFormComponent, CardComponent } from '@shared/components';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent, CardComponent],
  template: `
    <div class="flex max-w-7xl m-auto p-4 items-center h-screen gap-6">
      <div class="flex flex-col md:flex-row items-center md:items-stretch w-full gap-8">
        <app-card class="flex-col w-full md:w-1/2">
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
                <!-- <fa-icon [icon]="faCheck" matListItemIcon /> --> X
                <span>
                  {{ 'Completely free of charge' }}
                </span>
              </li>
              <li class="flex items-center gap-2">
                <!-- <fa-icon [icon]="faCheck" matListItemIcon /> --> X
                <span>
                  {{ 'Book the best suTable timeslot for you' }}
                </span>
              </li>
              <li class="flex items-center gap-2">
                <!-- <fa-icon [icon]="faCheck" matListItemIcon /> --> X
                <span>
                  {{ 'See Clerk in action with your own products' }}
                </span>
              </li>
            </ul>
          </div>
        </app-card>
        <app-card class="w-full md:w-1/2 bg-black!">
          <app-register-form class="p-4" />
        </app-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPage {}
