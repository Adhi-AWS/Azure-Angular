import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogueDetailsComponent } from './product-catalogue-details.component';

describe('ProductCatalogueDetailsComponent', () => {
  let component: ProductCatalogueDetailsComponent;
  let fixture: ComponentFixture<ProductCatalogueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCatalogueDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
