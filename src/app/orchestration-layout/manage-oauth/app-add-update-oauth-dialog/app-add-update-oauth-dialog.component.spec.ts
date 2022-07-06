import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddUpdateOauthDialogComponent } from './app-add-update-oauth-dialog.component';

describe('AppAddUpdateOauthDialogComponent', () => {
  let component: AppAddUpdateOauthDialogComponent;
  let fixture: ComponentFixture<AppAddUpdateOauthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAddUpdateOauthDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddUpdateOauthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
