import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTaskConfigurationDialogComponent } from './add-update-task-configuration-dialog.component';

describe('AddUpdateTaskConfigurationDialogComponent', () => {
  let component: AddUpdateTaskConfigurationDialogComponent;
  let fixture: ComponentFixture<AddUpdateTaskConfigurationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateTaskConfigurationDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AddUpdateTaskConfigurationDialogComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
