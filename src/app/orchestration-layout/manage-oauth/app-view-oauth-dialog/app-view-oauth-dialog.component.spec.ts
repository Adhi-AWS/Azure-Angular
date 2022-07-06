import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewOauthDialogComponent } from './app-view-oauth-dialog.component';

describe('AppViewOauthDialogComponent', () => {
  let component: AppViewOauthDialogComponent;
  let fixture: ComponentFixture<AppViewOauthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppViewOauthDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewOauthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
