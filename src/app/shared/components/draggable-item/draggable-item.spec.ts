import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { DraggableItem } from './draggable-item';

describe('DraggableItem', () => {
  let component: DraggableItem;
  let fixture: ComponentFixture<DraggableItem>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableItem],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DraggableItem);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the draggable-item class', () => {
    const hostElement = compiled.nativeElement;
    expect(hostElement.classList.contains('draggable-item')).toBe(true);
  });

  it('should contain item-header div', () => {
    const headerDiv = compiled.nativeElement.querySelector('#item-header');
    expect(headerDiv).toBeTruthy();
    expect(headerDiv.id).toBe('item-header');
  });

  it('should contain item-body div', () => {
    const bodyDiv = compiled.nativeElement.querySelector('#item-body');
    expect(bodyDiv).toBeTruthy();
    expect(bodyDiv.id).toBe('item-body');
  });

  it('should contain item-footer div', () => {
    const footerDiv = compiled.nativeElement.querySelector('#item-footer');
    expect(footerDiv).toBeTruthy();
    expect(footerDiv.id).toBe('item-footer');
  });

  it('should contain an img element in the footer', () => {
    const footerDiv = compiled.nativeElement.querySelector('#item-footer');
    const img = footerDiv.querySelector('img');
    expect(img).toBeTruthy();
  });
});
