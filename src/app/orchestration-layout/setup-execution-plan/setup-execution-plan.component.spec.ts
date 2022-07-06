import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupExecutionPlanComponent } from './setup-execution-plan.component';

describe('SetupExecutionPlanComponent', () => {
  let component: SetupExecutionPlanComponent;
  let fixture: ComponentFixture<SetupExecutionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupExecutionPlanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupExecutionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
