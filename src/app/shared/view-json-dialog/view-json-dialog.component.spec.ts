import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJsonDialogComponent } from './view-json-dialog.component';

describe('ViewJsonDialogComponent', () => {
  let component: ViewJsonDialogComponent;
  let fixture: ComponentFixture<ViewJsonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJsonDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
