import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTransitionLogsComponent } from './task-transition-logs.component';

describe('TaskTransitionLogsComponent', () => {
  let component: TaskTransitionLogsComponent;
  let fixture: ComponentFixture<TaskTransitionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskTransitionLogsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTransitionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
