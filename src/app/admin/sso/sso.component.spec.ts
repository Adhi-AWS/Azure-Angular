import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('SSOComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<SSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
