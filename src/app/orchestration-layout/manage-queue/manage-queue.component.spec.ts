import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQueueComponent } from './manage-queue.component';

describe('ManageQueueComponent', () => {
  let component: ManageQueueComponent;
  let fixture: ComponentFixture<ManageQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageQueueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
