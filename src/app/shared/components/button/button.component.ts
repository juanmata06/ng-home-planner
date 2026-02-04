import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit, ViewEncapsulation, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'border-r border-b border-indigo-400',
    '[class.w-1/4]': '!isDoubleSize()',
    '[class.w-2/4]': 'isDoubleSize()'
  }
})
export class ButtonComponent {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  buttonValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  //* Input signals:
  public isCommandButton = input(false, {
    transform: (value: boolean | string) => typeof value == 'string' ? value == '' : value
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => typeof value == 'string' ? value == '' : value
  });

  //* Output signals:
  public onClickButton = output<string>();

  //* Host bindings:
  // @HostBinding('class.is-command-button') get CommandStyle() {
  //   return this.isCommandButton();
  // }

  // The way it used to be done before use host:
  // @HostBinding('class.w-2/4') get CommandStyle() {
  //   return this.isDoubleSize();
  // }

  public isButtonPressed = signal(false);

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */

  constructor() { }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */

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
  public emitButtonValue(): void {
    if (!this.buttonValue()?.nativeElement) { return; }
    this.onClickButton.emit(this.buttonValue()!.nativeElement.innerText.trim());
  }

  public buttonPressStyling(key: string) {
    if (!this.buttonValue()) return;

    const value = this.buttonValue()!.nativeElement.innerText;

    if (key !== value) return;

    this.isButtonPressed.set(true);

    setTimeout(() => {
      this.isButtonPressed.set(false);
    }, 100);
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
}