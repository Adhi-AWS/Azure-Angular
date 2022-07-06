import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCloudCredentialDialogComponent } from './add-update-credential-dialog.component';

describe('AddUpdateCloudCredentialDialogComponent', () => {
  let component: AddUpdateCloudCredentialDialogComponent;
  let fixture: ComponentFixture<AddUpdateCloudCredentialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateCloudCredentialDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateCloudCredentialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
