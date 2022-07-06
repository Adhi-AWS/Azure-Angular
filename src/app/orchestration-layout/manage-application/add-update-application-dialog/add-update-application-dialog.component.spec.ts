import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateApplicationDialogComponent } from './add-update-application-dialog.component';

describe('AddUpdateApplicationDialogComponent', () => {
  let component: AddUpdateApplicationDialogComponent;
  let fixture: ComponentFixture<AddUpdateApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateApplicationDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
