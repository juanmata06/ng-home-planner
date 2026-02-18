import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TasksStore } from '@shared/store';
import { CardComponent } from '@shared/components';

@Component({
  selector: 'app-stats-banner',
  imports: [CardComponent],
  template: `
    <div class="py-2 flex flex-wrap justify-center gap-4">
      <app-card class="min-w-[340px] max-w-[20%]! block! text-center">
        <span class="text-size-h4!">
          TOTAL:
          <span class="font-bold text-size-h4!">{{ tasksStore.totalTasks() }}</span>
        </span>
      </app-card>
      <!-- TODO: -->
      <!-- <app-card class="min-w-[340px] max-w-[20%]! block! text-center">
        <span class="text-size-h4!">
          IN PROGRESS:
          <span class="font-bold text-size-h4!">{{ tasksStore.tasksInProgress() }}</span>
        </span>
      </app-card> -->
      <app-card class="min-w-[340px] max-w-[20%]! block! text-center">
        <span class="text-size-h4!">
          COMPLETION RATE:
          <span class="font-bold text-size-h4!">{{ tasksStore.completionRate() }}%</span>
        </span>
      </app-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host: { class: 'py-6'
})
export class StatsBanner {
    readonly tasksStore = inject(TasksStore);

}
