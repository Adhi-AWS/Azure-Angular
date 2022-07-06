import { TestBed } from '@angular/core/testing';

import { ManageProductItemService } from './manage-product-item.service';

describe('ManageProductItemService', () => {
  let service: ManageProductItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageProductItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
