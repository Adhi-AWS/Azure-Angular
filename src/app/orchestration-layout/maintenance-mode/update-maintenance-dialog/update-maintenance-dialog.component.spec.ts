import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintenanceDialogComponent } from './update-maintenance-dialog.component';

describe('UpdateMaintenanceDialogComponent', () => {
  let component: UpdateMaintenanceDialogComponent;
  let fixture: ComponentFixture<UpdateMaintenanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateMaintenanceDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaintenanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
