import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOauthComponent } from './manage-oauth.component';

describe('ManageOauthComponent', () => {
  let component: ManageOauthComponent;
  let fixture: ComponentFixture<ManageOauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
