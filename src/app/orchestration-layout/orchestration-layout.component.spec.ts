import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchestrationLayoutComponent } from './orchestration-layout.component';

describe('OrchestrationLayoutComponent', () => {
  let component: OrchestrationLayoutComponent;
  let fixture: ComponentFixture<OrchestrationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrchestrationLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchestrationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
