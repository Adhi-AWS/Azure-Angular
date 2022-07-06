import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdapterDialogComponent } from './add-adapter-dialog.component';

describe('AddAdapterDialogComponent', () => {
  let component: AddAdapterDialogComponent;
  let fixture: ComponentFixture<AddAdapterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdapterDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
