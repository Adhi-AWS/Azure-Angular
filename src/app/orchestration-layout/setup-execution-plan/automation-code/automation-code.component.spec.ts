import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationCodeComponent } from './automation-code.component';

describe('AutomationCodeComponent', () => {
  let component: AutomationCodeComponent;
  let fixture: ComponentFixture<AutomationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomationCodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
