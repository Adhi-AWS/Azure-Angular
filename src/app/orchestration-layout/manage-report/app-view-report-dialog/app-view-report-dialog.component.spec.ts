import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewReportDialogComponent } from './app-view-report-dialog.component';

describe('AppViewReportDialogComponent', () => {
  let component: AppViewReportDialogComponent;
  let fixture: ComponentFixture<AppViewReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppViewReportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
