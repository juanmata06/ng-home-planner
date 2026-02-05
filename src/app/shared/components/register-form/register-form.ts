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
  selector: 'app-register-form',
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
      <!-- Name -->
      <div class="flex flex-col">
        <label for="name" class="mb-1 text-white!"> Full name* </label>
        <input type="text" id="name" placeholder="John Doe" formControlName="name" />
      </div>

      <!-- Email -->
      <div class="flex flex-col">
        <label for="email" class="mb-1 text-white!">Email*</label>
        <input type="email" id="email" placeholder="company@email.com" formControlName="email" />
      </div>

      <!-- Password -->
      <div class="flex flex-col">
        <label for="password" class="mb-1 text-white!">Password*</label>
        <input type="password" id="password" placeholder="********" formControlName="password" />
      </div>

      <!-- Password confirmation -->
      <div class="flex flex-col">
        <label for="passwordConfirmation" class="mb-1 text-white!">Password confirmation*</label>
        <input
          type="password"
          id="passwordConfirmation"
          placeholder="********"
          formControlName="passwordConfirmation"
        />
      </div>

      <!-- Communications -->
      <div class="flex flex-row md:col-span-2 items-center gap-2">
        <app-custom-checkbox [control]="form.controls['communications']" />
        <label for="communications" class="text-white!">
          {{ 'I agree to receive other communications from My Learning' }}.
        </label>
      </div>

      <!-- Register (submit) -->
      <div class="flex flex-col col-span-full justify-center items-center">
        <app-custom-button type="submit"> Register </app-custom-button>

        <label for="submit-button" class="mt-6 text-white!">
          ¿Already have an account? You can
          <a [routerLink]="'/auth/login'" class="uppercase"><strong>login</strong></a>.
        </label>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class RegisterFormComponent implements OnInit {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  protected form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    passwordConfirmation: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    communications: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });
  public formSubmitted = output<{
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    communications?: boolean;
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
