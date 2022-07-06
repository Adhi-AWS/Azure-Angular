import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavListItemComponent } from './side-nav-list-item.component';

describe('SideNavListItemComponent', () => {
  let component: SideNavListItemComponent;
  let fixture: ComponentFixture<SideNavListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
