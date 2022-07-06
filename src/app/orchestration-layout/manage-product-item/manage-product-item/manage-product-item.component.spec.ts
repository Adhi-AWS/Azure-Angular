import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductItemComponent } from './manage-product-item.component';

describe('ManageProductItemComponent', () => {
  let component: ManageProductItemComponent;
  let fixture: ComponentFixture<ManageProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
