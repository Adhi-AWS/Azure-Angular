import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSystemConfigurationDialogComponent } from './update-system-configuration-dialog.component';

describe('UpdateSystemConfigurationDialogComponent', () => {
  let component: UpdateSystemConfigurationDialogComponent;
  let fixture: ComponentFixture<UpdateSystemConfigurationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSystemConfigurationDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSystemConfigurationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
