import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewUserDialogComponent } from './app-view-user-dialog.component';

describe('AppViewUserDialogComponent', () => {
  let component: AppViewUserDialogComponent;
  let fixture: ComponentFixture<AppViewUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppViewUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
