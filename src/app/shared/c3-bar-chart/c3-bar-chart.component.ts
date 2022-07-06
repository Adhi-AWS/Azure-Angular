import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-shared-c3-bar-chart',
  templateUrl: './c3-bar-chart.component.html',
  styleUrls: ['./c3-bar-chart.component.scss'],
})
export class C3BarChartComponent implements  OnChanges, AfterViewInit {
  @Input() chartTitle: string | undefined;
  @Input() frequency:string | undefined;
  @Input() chartId: string | undefined;
  @Input() chartHeight: string | undefined;
  @Input() chartDataJson: any;
  @Input() chartDataKeys: any;
  @Input() chartDataGroups?: any;
  @Input() showLegends: boolean = false;
  @Input() axisRotated: boolean = false;

  

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
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
          '#000',
        ],
      },
      point: {
          show:true
      },
      data: {
        type: 'line',
        json: this.chartDataJson,
        keys: this.chartDataKeys
      },
      axis: {
        x: {
          type: 'category',
          tick: {
            centered: true,
          },
        },
        rotated: this.axisRotated,
      },
      legend: {
        show: this.showLegends,
        position: 'inset',
        inset: {
          anchor: 'top-left',
          x: 0,
          y: -60,
          step: 3,
        },
      },
      grid: {
        x: { show: true },
        y: { show: true },
      },
    };

    if (this.chartDataGroups) {
      chartConfigObj['data']['groups'] = this.chartDataGroups;
    }

    let chart: any;
    setTimeout(() => {
      chart = c3.generate(chartConfigObj);
    }, 0);

    setTimeout(() => {
      chart.resize();
    }, 400);
  }
}
