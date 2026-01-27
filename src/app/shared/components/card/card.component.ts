import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: '<ng-content/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full h-full overflow-hidden p-2 border-[1.5px] border-gray-medium rounded-md flex', // TODO: decide if use or no 'shadow-md'
    '[class.bg-white]': '!isPrimary() && !isSecondary() && !isTransparent()', 
    '[class.bg-primary]': 'isPrimary()',
    '[class.bg-secondary]': 'isSecondary()',
    '[class.bg-transparent]': 'isTransparent()',
    '[class.border-transparent]': 'isNotBordered()',
    '[class.shadow-none]': 'isNotShadow()',
  },
})
export class CardComponent {
  public isPrimary = input(false, {
    transform: (value: boolean | string) =>
      typeof value == 'string' ? value == '' : value,
  });
  public isSecondary = input(false, {
    transform: (value: boolean | string) =>
      typeof value == 'string' ? value == '' : value,
  });
  public isTransparent = input(false, {
    transform: (value: boolean | string) =>
      typeof value == 'string' ? value == '' : value,
  });
  public isNotBordered = input(false, {
    transform: (value: boolean | string) =>
      typeof value == 'string' ? value == '' : value,
  });
  public isNotShadow = input(false, {
    transform: (value: boolean | string) =>
      typeof value == 'string' ? value == '' : value,
  });
}
