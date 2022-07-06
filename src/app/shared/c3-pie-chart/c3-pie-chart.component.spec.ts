import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C3PieChartComponent } from './c3-pie-chart.component';

describe('C3PieChartComponent', () => {
  let component: C3PieChartComponent;
  let fixture: ComponentFixture<C3PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [C3PieChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C3PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
