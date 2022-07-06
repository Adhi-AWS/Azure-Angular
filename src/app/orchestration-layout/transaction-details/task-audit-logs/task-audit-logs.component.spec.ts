import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAuditLogsComponent } from './task-audit-logs.component';

describe('TaskAuditLogsComponent', () => {
  let component: TaskAuditLogsComponent;
  let fixture: ComponentFixture<TaskAuditLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskAuditLogsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAuditLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
