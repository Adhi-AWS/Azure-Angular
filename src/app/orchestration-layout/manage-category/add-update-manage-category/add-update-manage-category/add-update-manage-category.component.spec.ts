import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateManageCategoryComponent } from './add-update-manage-category.component';

describe('AddUpdateManageCategoryComponent', () => {
  let component: AddUpdateManageCategoryComponent;
  let fixture: ComponentFixture<AddUpdateManageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateManageCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateManageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
