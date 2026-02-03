import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, ChangeDetectionStrategy } from '@angular/core';

import { DraggableColumn } from './draggable-column';

describe('DraggableColumn', () => {
  let component: DraggableColumn;
  let fixture: ComponentFixture<DraggableColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableColumn],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DraggableColumn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ng-content with column-title selector', () => {
    const compiled = fixture.nativeElement;
    const columnHeader = compiled.querySelector('#column-header');

    // Verify the structure contains the header where column-title ng-content would be projected
    expect(columnHeader).toBeTruthy();
    const h5 = columnHeader.querySelector('h5');
    expect(h5).toBeTruthy();
  });

  it('should have ng-content with column-body selector', () => {
    const compiled = fixture.nativeElement;
    const columnBody = compiled.querySelector('.p-2:nth-of-type(2)');

    // Verify the structure contains the body section where column-body ng-content would be projected
    expect(columnBody).toBeTruthy();
  });

  it('should have correct host classes for styling', () => {
    const compiled = fixture.nativeElement;
    const hostClasses = compiled.className;

    expect(hostClasses).toContain('bg-gray-medium');
    expect(hostClasses).toContain('border-[1.5px]');
    expect(hostClasses).toContain('border-gray-medium');
    expect(hostClasses).toContain('rounded-md');
  });

  describe('with projected content', () => {
    @Component({
      standalone: true,
      imports: [DraggableColumn],
      template: `
        <app-draggable-column>
          <span column-title>Test Title</span>
          <span column-body>Test Body</span>
        </app-draggable-column>
      `,
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestHostComponent {}

    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      TestBed.resetTestingModule();
      
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, DraggableColumn],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
    });

    it('should project content into column-title and column-body ng-contents', () => {
      const compiled = hostFixture.nativeElement;
      const columnHeader = compiled.querySelector('#column-header');
      const titleContent = columnHeader.querySelector('[column-title]');

      expect(titleContent).toBeTruthy();
      expect(titleContent.textContent).toContain('Test Title');

      const bodyContent = compiled.querySelector('[column-body]');
      expect(bodyContent).toBeTruthy();
      expect(bodyContent.textContent).toContain('Test Body');
    });
  });

  it('should render "Add Item +" button in footer', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');

    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Add Item +');
  });
});
