import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { ModalService } from '@shared/services/modal-service';

@Component({
  selector: 'app-custom-modal',
  imports: [],
  template: `
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            [style.width.%]="width"
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8"
          >
            <div class="bg-white p-2" #modalBody></div>
            <button (click)="closeModal()">CERRAR</button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: '',
  },
})
export class CustomModal implements AfterViewInit {
  readonly modalService: ModalService = inject(ModalService);
  @Input() width: number = 50;
  @ViewChild('modalBody') modalBodyRef!: ElementRef;

  ngAfterViewInit(): void {
    if (this.modalBodyRef) {
      // Content loaded, handle any logic here 😊
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
