import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { ReplaySubject } from 'rxjs';

// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule, 
    // MatCheckboxModule, 
    // ButtonComponent, 
    RouterLink
  ],
  template: `
    <form [formGroup]="form" (submit)="submitForm()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Name -->
      <div class="flex flex-col">
        <label for="fullName" class="mb-1 text-white!"> Full name* </label>
        <input type="text" id="fullName" placeholder="John Doe" class="p-3 rounded-lg bg-white" />
      </div>

      <!-- Email -->
      <div class="flex flex-col">
        <label for="companyEmail" class="mb-1 text-white!">Email*</label>
        <input
          type="email"
          id="email"
          placeholder="company@email.com"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col">
        <label for="password" class="mb-1 text-white!">Password*</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Password confirmation -->
      <div class="flex flex-col">
        <label for="passwordConfirmation" class="mb-1 text-white!">Password confirmation*</label>
        <input
          type="password"
          id="passwordConfirmation"
          placeholder="********"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Communications -->
      <div class="flex flex-row md:col-span-2">
        <input type="checkbox" name="" id="">
        <label for="communications" class="text-white!">
          {{ 'I agree to receive other communications from My Learning' }}.
        </label>
      </div>

      <!-- Register (submit) -->
      <div class="flex flex-col col-span-full justify-center items-center">
        <button type="submit" class="text-white bg-primary rounded-md px-4 py-2 cursor-pointer hover:opacity-90">
          Register
        </button>

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
  form!: FormGroup;
  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  private _formBuilder: FormBuilder = inject(FormBuilder);
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
  private createForm(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
      communications: [false],
    });
  }

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
