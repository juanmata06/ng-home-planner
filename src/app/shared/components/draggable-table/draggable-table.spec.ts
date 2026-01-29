import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

import { Task } from '@shared/index';

import { DraggableTable } from './draggable-table';

describe('DraggableTable', () => {
  let component: DraggableTable;
  let fixture: ComponentFixture<DraggableTable>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableTable],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DraggableTable);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('Component Structure', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have 3 signals: todo, doing, done', () => {
      expect(component.todo).toBeDefined();
      expect(component.doing).toBeDefined();
      expect(component.done).toBeDefined();
    });

    it('signals should be writable signals with initial data', () => {
      expect(component.todo().length).toBeGreaterThan(0);
      expect(component.doing().length).toBeGreaterThan(0);
      expect(component.done().length).toBeGreaterThan(0);
    });
  });

  describe('Template - Draggable Columns', () => {
    it('should render 3 app-draggable-column components', () => {
      const columns = compiled.queryAll(By.css('app-draggable-column'));
      expect(columns.length).toBe(3);
    });

    it('should have unique column ids', () => {
      const columns = compiled.queryAll(By.css('app-draggable-column'));
      const ids = columns.map((col) => col.nativeElement.getAttribute('id'));

      expect(ids.length).toBe(3);
      expect(ids).toContain('todo-column');
      expect(ids).toContain('doing-column');
      expect(ids).toContain('done-column');
    });

    it('should have correct column ids', () => {
      const columns = compiled.queryAll(By.css('app-draggable-column'));
      const columnIds = columns.map((col) => col.nativeElement.getAttribute('id'));

      expect(columnIds).toEqual(['todo-column', 'doing-column', 'done-column']);
    });

    it('should bind todo column to todo() signal', () => {
      const columns = compiled.queryAll(By.css('app-draggable-column'));
      const todoColumn = columns[0];
      const dropList = todoColumn.injector.get(CdkDropList);

      expect(dropList.data).toEqual(component.todo());
    });

    it('should bind doing column to doing() signal', () => {
      const columns = compiled.queryAll(By.css('app-draggable-column'));
      const doingColumn = columns[1];
      const dropList = doingColumn.injector.get(CdkDropList);

      expect(dropList.data).toEqual(component.doing());
    });

    it('should bind done column to done() signal', () => {
      const columns = compiled.queryAll(By.css('app-draggable-column'));
      const doneColumn = columns[2];
      const dropList = doneColumn.injector.get(CdkDropList);

      expect(dropList.data).toEqual(component.done());
    });
  });

  describe('Drop Functionality', () => {
    it('should move item within the same column using moveItemInArray', () => {
      const todoTasks = component.todo();
      const initialOrder = [...todoTasks];

      const mockEvent = {
        previousIndex: 0,
        currentIndex: 1,
        container: {
          data: todoTasks,
          id: 'todo-column',
        },
        previousContainer: {
          data: todoTasks,
          id: 'todo-column',
        },
      } as CdkDragDrop<Task[]>;

      component.drop(mockEvent);

      expect(component.todo()[0]).toEqual(initialOrder[1]);
      expect(component.todo()[1]).toEqual(initialOrder[0]);
    });

    it('should transfer item between columns and update status', () => {
      const todoTasks = component.todo();
      const doingTasks = component.doing();
      const initialTodoCount = todoTasks.length;
      const initialDoingCount = doingTasks.length;

      const mockEvent = {
        previousIndex: 0,
        currentIndex: 0,
        container: {
          data: doingTasks,
          id: 'doing-column',
        },
        previousContainer: {
          data: todoTasks,
          id: 'todo-column',
        },
      } as CdkDragDrop<Task[]>;

      component.drop(mockEvent);

      expect(component.todo().length).toBe(initialTodoCount - 1);
      expect(component.doing().length).toBe(initialDoingCount + 1);
    });

    it('should transfer item from TODO to DONE column', () => {
      const todoTasks = component.todo();
      const doneTasks = component.done();
      const itemToMove = todoTasks[0];

      const mockEvent = {
        previousIndex: 0,
        currentIndex: 0,
        container: {
          data: doneTasks,
          id: 'done-column',
        },
        previousContainer: {
          data: todoTasks,
          id: 'todo-column',
        },
      } as CdkDragDrop<Task[]>;

      component.drop(mockEvent);

      expect(doneTasks).toContain(itemToMove);
      expect(todoTasks).not.toContain(itemToMove);
    });
  });

  describe('handleTaskStatusChange', () => {
    it('should update task status to TODO', () => {
      const task: Task = {
        id: 'test-1',
        title: 'Test Task',
        description: 'Test',
        status: 'DOING',
        createdAt: new Date(),
        createdById: '',
        createdBy: '',
        assignedToId: '',
        assignedTo: '',
      };

      component.handleTaskStatusChange(task, 'TODO');

      expect(task.status).toBe('TODO');
    });

    it('should update task status to DOING', () => {
      const task: Task = {
        id: 'test-2',
        title: 'Test Task',
        description: 'Test',
        status: 'TODO',
        createdAt: new Date(),
        createdById: '',
        createdBy: '',
        assignedToId: '',
        assignedTo: '',
      };

      component.handleTaskStatusChange(task, 'DOING');

      expect(task.status).toBe('DOING');
    });

    it('should update task status to DONE', () => {
      const task: Task = {
        id: 'test-3',
        title: 'Test Task',
        description: 'Test',
        status: 'TODO',
        createdAt: new Date(),
        createdById: '',
        createdBy: '',
        assignedToId: '',
        assignedTo: '',
      };

      component.handleTaskStatusChange(task, 'DONE');

      expect(task.status).toBe('DONE');
    });

    it('should handle task status change from DOING to DONE', () => {
      const task: Task = component.doing()[0];
      const initialStatus = task.status;

      component.handleTaskStatusChange(task, 'DONE');

      expect(task.status).toBe('DONE');
      expect(task.status).not.toBe(initialStatus);
    });
  });

  describe('Drop with Status Change Integration', () => {
    it('should call handleTaskStatusChange when dropping to different column', () => {
      spyOn(component, 'handleTaskStatusChange');

      const todoTasks = component.todo();
      const doingTasks = component.doing();

      const mockEvent = {
        previousIndex: 0,
        currentIndex: 0,
        container: {
          data: doingTasks,
          id: 'doing-column',
        },
        previousContainer: {
          data: todoTasks,
          id: 'todo-column',
        },
      } as CdkDragDrop<Task[]>;

      component.drop(mockEvent);

      expect(component.handleTaskStatusChange).toHaveBeenCalledWith(
        doingTasks[0],
        'DOING'
      );
    });

    it('should not call handleTaskStatusChange when moving within same column', () => {
      spyOn(component, 'handleTaskStatusChange');

      const todoTasks = component.todo();

      const mockEvent = {
        previousIndex: 0,
        currentIndex: 1,
        container: {
          data: todoTasks,
          id: 'todo-column',
        },
        previousContainer: {
          data: todoTasks,
          id: 'todo-column',
        },
      } as CdkDragDrop<Task[]>;

      component.drop(mockEvent);

      expect(component.handleTaskStatusChange).not.toHaveBeenCalled();
    });

    it('should correctly map column id to task status', () => {
      expect(component.statusMap['todo-column']).toBe('TODO');
      expect(component.statusMap['doing-column']).toBe('DOING');
      expect(component.statusMap['done-column']).toBe('DONE');
    });
  });
});
