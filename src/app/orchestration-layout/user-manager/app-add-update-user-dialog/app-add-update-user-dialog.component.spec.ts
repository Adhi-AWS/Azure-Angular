import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddUpdateUserDialogComponent } from './app-add-update-user-dialog.component';

describe('AppAddUpdateUserDialogComponent', () => {
  let component: AppAddUpdateUserDialogComponent;
  let fixture: ComponentFixture<AppAddUpdateUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAddUpdateUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddUpdateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
