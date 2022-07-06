import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCodeDialogComponent } from './add-update-code-dialog.component';

describe('AddUpdateCodeDialogComponent', () => {
  let component: AddUpdateCodeDialogComponent;
  let fixture: ComponentFixture<AddUpdateCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateCodeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
