import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateQueueDialogComponent } from './add-update-queue-dialog.component';

describe('AddUpdateQueueDialogComponent', () => {
  let component: AddUpdateQueueDialogComponent;
  let fixture: ComponentFixture<AddUpdateQueueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateQueueDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateQueueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
