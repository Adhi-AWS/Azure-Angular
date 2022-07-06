import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateManageSubCategoryComponent } from './add-update-manage-sub-category.component';

describe('AddUpdateManageSubCategoryComponent', () => {
  let component: AddUpdateManageSubCategoryComponent;
  let fixture: ComponentFixture<AddUpdateManageSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateManageSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateManageSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
