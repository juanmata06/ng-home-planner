import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
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

import { ReplaySubject } from 'rxjs';

import { CustomButton } from '@shared/components/custom-button/custom-button';
import { CustomCheckbox } from '@shared/components/custom-checkbox/custom-checkbox';

// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { ButtonComponent } from '../button/button.component';

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
        <app-custom-checkbox 
          [control]="form.controls['communications']"
          />
        <label for="communications" class="text-white!">
          {{ 'I agree to receive other communications from My Learning' }}.
        </label>
      </div>

      <!-- Register (submit) -->
      <div class="flex flex-col col-span-full justify-center items-center">
        <app-custom-button type="submit"> Register </app-custom-button>

        <label for="submit-button" class="mt-6 text-white!">
          ¿Already have an account? You can
          <a [routerLink]="'/login'" class="uppercase"><strong>login</strong></a
          >.
        </label>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  protected form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConfirmation: new FormControl('', [Validators.required]),
    communications: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });
  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  public formSubmitted = output<boolean>();

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  private createForm(): void {}

  public emitFormValue(): void {
    // this.formSubmitted.emit(this.form.value);
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
    console.log(this.form.value);

    //TODO: make her form validations and alert messages
    this.emitFormValue();
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
}
