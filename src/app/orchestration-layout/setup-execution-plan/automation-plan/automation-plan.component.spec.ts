import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationPlanComponent } from './automation-plan.component';

describe('AutomationPlanComponent', () => {
  let component: AutomationPlanComponent;
  let fixture: ComponentFixture<AutomationPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationPlanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
