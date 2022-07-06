import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePlanDialogComponent } from './add-update-plan-dialog.component';

describe('AddUpdatePlanDialogComponent', () => {
  let component: AddUpdatePlanDialogComponent;
  let fixture: ComponentFixture<AddUpdatePlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdatePlanDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdatePlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
