import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddUpdateReportDialogComponent } from './app-add-update-report-dialog.component';

describe('AppAddUpdateReportDialogComponent', () => {
  let component: AppAddUpdateReportDialogComponent;
  let fixture: ComponentFixture<AppAddUpdateReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAddUpdateReportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddUpdateReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
