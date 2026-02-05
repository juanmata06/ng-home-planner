import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox',
  imports: [],
  template: `
    <label
      class="relative flex cursor-pointer items-center rounded-md pe-2"
      for="input-checkbox"
      data-ripple-dark="true"
    >
      <input
        #input
        id="input-checkbox"
        type="checkbox"
        [checked]="control().value"
        (change)="check($event)"
        class="peer relative h-5 w-5 cursor-pointer appearance-none border border-gray-medium shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded before:bg-gray-medium before:opacity-0 before:transition-opacity checked:border-gray-strong checked:bg-gray-strong checked:before:bg-gray-light hover:before:opacity-10"
      />
      <span
        class="pointer-events-none absolute top-2/4 left-[35%] -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCheckbox  {
  control = input.required<FormControl<boolean>>();

  protected check(event: any) {    
    this.control().setValue(event.target.checked);
  }
}
