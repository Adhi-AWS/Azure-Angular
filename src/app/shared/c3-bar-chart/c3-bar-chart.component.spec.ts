import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C3BarChartComponent } from './c3-bar-chart.component';

describe('C3BarChartComponent', () => {
  let component: C3BarChartComponent;
  let fixture: ComponentFixture<C3BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [C3BarChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C3BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
