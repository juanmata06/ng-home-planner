import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CustomButton } from '@shared/components/custom-button/custom-button';
import { Task, TaskStatus } from '@shared/interfaces';

@Component({
  selector: 'app-task-details-modal',
  imports: [ReactiveFormsModule, CustomButton],
  template: `
    <form [formGroup]="form" (submit)="submitForm()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div class="flex flex-col col-span-full">
        <label for="title" class="mb-1 text-white!">Title*</label>
        <input
          type="text"
          id="title"
          placeholder="Task title"
          formControlName="title"
        />
      </div>

      <!-- Description -->
      <div class="flex flex-col col-span-full">
        <label for="description" class="mb-1 text-white!">Description</label>
        <textarea
          id="description"
          placeholder="Task description"
          formControlName="description"
          rows="4"
        ></textarea>
      </div>

      <!-- Status -->
      <div class="flex flex-col">
        <label for="status" class="mb-1 text-white!">Status*</label>
        <select
          id="status"
          formControlName="status"
        >
          <option value="TODO" selected>TODO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <!-- Assigned To ID -->
      <div class="flex flex-col">
        <label for="assignedToId" class="mb-1 text-white!">Assigned To*</label>
        <input
          type="text"
          id="assignedToId"
          placeholder="User ID"
          formControlName="assignedToId"
        />
      </div>

      <!-- Start Date -->
      <div class="flex flex-col">
        <label for="startDate" class="mb-1 text-white!">Start Date</label>
        <input
          type="date"
          id="startDate"
          formControlName="startDate"
        />
      </div>

      <!-- End Date -->
      <div class="flex flex-col">
        <label for="endDate" class="mb-1 text-white!">End Date</label>
        <input
          type="date"
          id="endDate"
          formControlName="endDate"
        />
      </div>

      <!-- Submit Button -->
      <div class="flex flex-col col-span-full justify-center items-center gap-4">
        <app-custom-button type="submit"> Save Task </app-custom-button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class TaskDetailsModal {
  /**
   * Form group for task details
   */
  protected form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl(''),
    status: new FormControl<TaskStatus>('TODO', {
      validators: [Validators.required],
    }),
    assignedToId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
  });

  /**
   * Output event emitter for form submission
   */
  public formSubmitted = output<Partial<Task>>();

  /**
   * Handle form submission
   */
  public submitForm(): void {
    console.log(this.form.value);
    
    // if (this.form.valid) {
    //   this.emitFormValue();
    // }
  }

  /**
   * Emit form values as output
   */
  private emitFormValue(): void {
    const formValue = this.form.value;
    const taskData: Partial<Task> = {
      title: formValue.title || '',
      description: formValue.description || '',
      status: formValue.status as TaskStatus,
      assignedToId: formValue.assignedToId || '',
      startDate: formValue.startDate ? new Date(formValue.startDate) : undefined,
      endDate: formValue.endDate ? new Date(formValue.endDate) : undefined,
      createdAt: new Date(),
      createdById: '',
    };

    this.formSubmitted.emit(taskData);
  }
}
