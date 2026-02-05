import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CustomButton } from '@shared/components/custom-button/custom-button';
import { CustomCheckbox } from '@shared/components/custom-checkbox/custom-checkbox';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    // MatCheckboxModule,
    // ButtonComponent,
    RouterLink,
    CustomButton,
    CustomCheckbox,
  ],
  template: `
    <form [formGroup]="form" (submit)="submitForm()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Email -->
      <div class="flex flex-col col-span-full">
        <label for="email" class="mb-1 text-white!">Email*</label>
        <input type="email" id="email" placeholder="company@email.com" formControlName="email" />
      </div>

      <!-- Password -->
      <div class="flex flex-col col-span-full">
        <label for="password" class="mb-1 text-white!">Password*</label>
        <input type="password" id="password" placeholder="********" formControlName="password" />
      </div>

      <!-- login (submit) -->
      <div class="flex flex-col col-span-full justify-center items-center">
        <app-custom-button type="submit"> Login </app-custom-button>

        <label for="submit-button" class="mt-6 text-white!">
          ¿Don't have an account yet? You can
          <a [routerLink]="'/register'" class="uppercase"><strong>register</strong></a>.
        </label>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class LoginFormComponent implements OnInit {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  protected form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  public formSubmitted = output<{
    email?: string;
    password?: string;
  }>();

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  private createForm(): void {}

  public emitFormValue(): void {
    this.formSubmitted.emit(this.form.value);
  }
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  submitForm() {
    //TODO: make her form validations and alert messages
    this.emitFormValue();
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
}
