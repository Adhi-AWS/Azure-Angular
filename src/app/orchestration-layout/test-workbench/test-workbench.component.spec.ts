import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWorkbenchComponent } from './test-workbench.component';

describe('TestWorkbenchComponent', () => {
  let component: TestWorkbenchComponent;
  let fixture: ComponentFixture<TestWorkbenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestWorkbenchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWorkbenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
