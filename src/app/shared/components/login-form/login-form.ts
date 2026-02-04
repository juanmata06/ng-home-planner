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
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule, 
    // MatCheckboxModule, 
    // ButtonComponent, 
    RouterLink
  ],
  template: `
    <form [formGroup]="form" (submit)="submitForm()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Email -->
      <div class="flex flex-col col-span-full">
        <label for="companyEmail" class="mb-1 text-white"> Email* </label>
        <input
          type="email"
          id="companyEmail"
          placeholder="company@email.com"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col col-span-full">
        <label for="password" class="mb-1 text-white"> Password* </label>
        <input
          type="password"
          id="phoneNumber"
          placeholder="********"
          class="p-3 rounded-lg bg-white"
        />
      </div>

      <!-- Login (submit) -->
      <div class="flex flex-col col-span-full justify-center items-center">
        <button type="submit"> Login </button>
        <label for="submit-button" class="mt-6 text-white">
          ¿Don't have an account yet? You can
          <a [routerLink]="'/register'" class="uppercase"><strong>Register</strong></a
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
export class LoginForm implements OnInit, OnDestroy {
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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
