import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardComponent } from '../../../card/card.component';

@Component({
  selector: 'app-draggable-item',
  imports: [CardComponent],
  template: `
    <app-card class="flex-col">
      <!-- Item Header -->
      <div id="item-header" class="w-full py-1">
        <span class="font-bold">
          <ng-content />
        </span>
      </div>
      <!-- Item Body -->
      <div id="item-body" class="w-full py-1">
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
      </div>
      <!-- Item Footer -->
      <div id="item-footer" class="w-full py-1 flex justify-between items-center">
        <span>Footer</span>
        <img
          src="https://s1.ppllstatics.com/mujerhoy/www/multimedia/202502/11/media/cortadas/zuckeberg1-k7bF-U230828106152o7E-1248x1248@MujerHoy.jpg"
          alt="Foto de perfil"
          class="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'draggable-item',
  },
})
export class DraggableItem {}
