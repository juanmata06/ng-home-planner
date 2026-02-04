import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {

  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    //* This line allows to receive changes onecs after the component is created ⬇️
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 when !isDoubleSize()', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 when isDoubleSize()', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    
    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });
});