import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParallelTasksDialogComponent } from './view-parallel-tasks-dialog.component';

describe('ViewParallelTasksDialogComponent', () => {
  let component: ViewParallelTasksDialogComponent;
  let fixture: ComponentFixture<ViewParallelTasksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewParallelTasksDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParallelTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
