import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-shared-c3-pie-chart',
  templateUrl: './c3-pie-chart.component.html',
  styleUrls: ['./c3-pie-chart.component.scss'],
})
export class C3PieChartComponent implements  OnChanges, AfterViewInit {
  @Input() chartTitle: string | undefined;
  @Input() frequency:string | undefined;
  @Input() chartId: string | undefined;
  @Input() chartHeight: string | undefined;
  @Input() chartDataJson: any;
  @Input() chartDataKeys: any;
  @Input() showLegends: boolean = false;

  

  ngAfterViewInit(): void {
    this.configureChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.configureChart();
    }
  }

  configureChart(): void {
    const chartConfigObj: c3.ChartConfiguration = {
      bindto: `#${this.chartId}`,
      size: {
        height: Number(this.chartHeight),
      },
      color: {
        pattern: [
          '#00A596',
          '#EA515D',
          '#FDC64F',
          '#171763',
          '#96181C',
          '#23297A',
          '#1177C5',
          '#C14F48',
          '#A4670F',
          '#257504',
          '#F76E64',
          '#75D122',
          '#F3B12D',
          '#7E82FF',
          '#67A5FF',
        ],
      },
      padding: {
        top: 0,
        left: 40,
        bottom: 40,
        right: 40,
      },
      pie: {
        label: {
          show: true,
          format: function (value): string {
            return value?.toString();
          },
        },
      },
      data: {
        type: 'pie',
        json: this.chartDataJson,
        keys: this.chartDataKeys,
      },
      legend: {
        show: this.showLegends,
        position: 'inset',
        inset: {
          anchor: 'bottom-right',
          x: 0,
          y: -75,
          step: 1,
        },
      },
      tooltip: {
        format: {
          value: function (value): string | undefined {
            return value?.toString();
          },
        },
      },
    };

    let chart: any;
    setTimeout(() => {
      chart = c3.generate(chartConfigObj);
    }, 0);

    setTimeout(() => {
      chart.resize();
    }, 400);
  }
}
