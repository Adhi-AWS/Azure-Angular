import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from 'src/app/services/app.service';
import { ProcessorInsightsService } from 'src/app/services/processor-insights.service';

@Component({
  selector: 'app-processor-insight',
  templateUrl: './processor-insight.component.html',
  styleUrls: ['./processor-insight.component.scss'],
})
export class ProcessorInsightComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  changedEndDate: string = '';

  today: string = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

  displayedColumns: string[] = [
    'processor',
    'cloud_provider',
    'in_progress',
    // 'in_queue',
    'completed',
    'failed',
    'total',
  ];
  processorInsightsData: any[] = [];

  cloud_providers_list: any[] = [];

  constructor(
    private appService: AppService,
    private processorInsightsService: ProcessorInsightsService
  ) {}

  ngOnInit(): void {
    this.cloud_providers_list = [...this.appService.cloud_providers_list.value];

    this.startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

    this.fetchProcessorInsightsData();
  }

  fetchProcessorInsightsData(): void {
    this.processorInsightsService
      .getProcessorInsights(this.startDate, this.endDate)
      .subscribe(
        (response: any) => {
          if (response && response.processor_insights) {
            const tmpData: any[] = [];

            for (const [key, value] of Object.entries(
              response.processor_insights
            )) {
              const valueData: any = value;

              this.cloud_providers_list.forEach((item: any, index: number) => {
                tmpData.push({
                  processor: index === 0 ? key : '',
                  cloud_provider: item.cloud_provider,
                  in_progress: valueData[item.cloud_provider]?.IN_PROGRESS || 0,
                  in_queue: valueData[item.cloud_provider]?.IN_QUEUE || 0,
                  completed: valueData[item.cloud_provider]?.SUCCESS || 0,
                  failed: valueData[item.cloud_provider]?.FAILED || 0,
                  total:
                    (valueData[item.cloud_provider]?.IN_PROGRESS || 0) +
                    (valueData[item.cloud_provider]?.IN_QUEUE || 0) +
                    (valueData[item.cloud_provider]?.SUCCESS || 0) +
                    (valueData[item.cloud_provider]?.FAILED || 0),
                });
              });
            }

            this.processorInsightsData = [...tmpData];
          }
        },
        (error: any) => {}
      );
  }

  startDatePickerChanged(event: any): void {
    this.startDate = event?.value;
    if (new Date(this.startDate) > new Date(this.endDate)) {
      this.changedEndDate = event?.value;
    }
  }

  endDatePickerChanged(event: any): void {
    this.endDate = event?.value;
  }

  onFetchClick(): void {
    this.processorInsightsData = [];
    this.fetchProcessorInsightsData();
  }

  displayValue(i: number): string {
    // eslint-disable-next-line security/detect-object-injection
    if (this.processorInsightsData[i].processor) {
      return '';
    }
    return 'none';
  }
}
