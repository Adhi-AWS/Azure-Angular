import { TestBed } from '@angular/core/testing';

import { MenuBarDataResolver } from './menu-bar-data.resolver';

describe('MenuBarDataResolver', () => {
  let resolver: MenuBarDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MenuBarDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
