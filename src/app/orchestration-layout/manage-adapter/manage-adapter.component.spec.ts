import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdapterComponent } from './manage-adapter.component';

describe('ManageAdapterComponent', () => {
  let component: ManageAdapterComponent;
  let fixture: ComponentFixture<ManageAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAdapterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
