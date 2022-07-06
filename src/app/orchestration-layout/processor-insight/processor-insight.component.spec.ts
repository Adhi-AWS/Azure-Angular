import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorInsightComponent } from './processor-insight.component';

describe('ProcessorInsightComponent', () => {
  let component: ProcessorInsightComponent;
  let fixture: ComponentFixture<ProcessorInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorInsightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
