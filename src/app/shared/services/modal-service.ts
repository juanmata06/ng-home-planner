import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  inject,
  Injectable,
  Injector,
} from '@angular/core';
import { CustomModal } from '@shared/components';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private componentFactoryResolver: ComponentFactoryResolver = inject(ComponentFactoryResolver);
  private injector: Injector = inject(Injector);
  private appRef: ApplicationRef = inject(ApplicationRef);
  private modalComponentRef: ComponentRef<CustomModal> | null = null;

  openModal(component: any, width: number = 50) {
    if (!this.modalComponentRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomModal);
      const modalComponentRef = componentFactory.create(this.injector);
      this.modalComponentRef = modalComponentRef;
      this.appRef.attachView(modalComponentRef.hostView);
      document.body.appendChild(modalComponentRef.location.nativeElement);
      this.modalComponentRef.instance.width = width;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    if (this.modalComponentRef) {
      setTimeout(() => {
        // Ensure modal component is fully initialized before appending content
        this.modalComponentRef?.instance.modalBodyRef.nativeElement.appendChild(
          componentRef.location.nativeElement,
        );
      });
    }
  }

  closeModal(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
  }
}
