import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCredentialDialogComponent } from './add-update-credential-dialog.component';

describe('AddUpdateCredentialDialogComponent', () => {
  let component: AddUpdateCredentialDialogComponent;
  let fixture: ComponentFixture<AddUpdateCredentialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateCredentialDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateCredentialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
