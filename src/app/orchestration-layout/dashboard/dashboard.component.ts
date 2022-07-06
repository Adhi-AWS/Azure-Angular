import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppService } from 'src/app/services/app.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  task_id: string = '';

  startOfMonth: string = '';
  endOfMonth: string = '';

  dashboardData: any = null;

  accordionDataList: any = {};

  barChartKeys: any = {
    x: 'task_name',
    value: ['transactions_count'],
  };

  pieChartKeys: any = {
    value: ['Success', 'Failure', 'In Progress', 'In Queue'],
  };

  [key: string]: any;

  cloud_provider_list: any[] = [];
  transactionsData:any[]=[];
  transactionsColumns: any[] = [
    {
      colRefName: 'task_id',
      colDisplayName: 'Task ID',
      isAnchorLink: true,
    },
    {
      colRefName: 'task_name',
      colDisplayName: 'Latest Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'created_date',
      colDisplayName: 'Submitted On',
      isAnchorLink: false,
    },
    {
      colRefName: 'status',
      colDisplayName: 'Status',
      isAnchorLink: false,
    },
  ];


  constructor(
    private router: Router,
    private appService: AppService,
    private dashboardService: DashboardService,
    private transactionsService:TransactionsService
  ) {}

  ngOnInit(): void {
    this.cloud_provider_list = [...this.appService.cloud_providers_list.value];

    this.startOfMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
    this.endOfMonth = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');

    this.cloud_provider_list.forEach((item: any) => {
      this.accordionDataList[`${item.cloud_provider}_top_tasks`] = [];
      this.accordionDataList[`${item.cloud_provider}_transactions`] = [];
    });

    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    var currentDate = new Date();
    this.endOfMonth = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss','en-US');
    this.startOfMonth = formatDate(new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()-60)),'yyyy-MM-dd HH:mm:ss','en-US');
    this.dashboardService
      .getDashboard(this.startOfMonth, this.endOfMonth)
      .subscribe(
        (response: any) => {
          if (response) {
            this.dashboardData = { ...response };

            this.cloud_provider_list.forEach((item: any) => {
              this.accordionDataList[`${item.cloud_provider}_top_tasks`] = [];

              if (response[item.cloud_provider]) {
                response[item.cloud_provider].top_10_tasks.forEach(
                  (obj: any) => {
                    for (const [key, value] of Object.entries(obj)) {
                      this.accordionDataList[
                        `${item.cloud_provider}_top_tasks`
                      ].push({
                        task_name: key,
                        transactions_count: value,
                      });
                    }
                  }
                );

                this.accordionDataList[`${item.cloud_provider}_transactions`] =
                  [
                    {
                      Success: response[item.cloud_provider].success,
                      Failure: response[item.cloud_provider].failure,
                      'In Progress': response[item.cloud_provider].in_progress,
                      'In Queue': response[item.cloud_provider].in_queue,
                    },
                  ];
              }
            });
          }
        },
        (error: any) => {}
      );
      this.getTrackOrderData();
  }
  getTrackOrderData():void{
    this.transactionsService
      .getTransactionDetailsThroughPostRequest(
        {},
         1,
         5
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.transactionsData = [...response.data];
          } else {
            this.transactionsData = [];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Tasks', error);
          }
        }
      );
  }

  clearTaskId(): void {
    this.task_id = '';
  }

  routeToTransactionDetails(): void {
    this.router.navigateByUrl(`/orchestration/transactions/${this.task_id}`);
  }

  goToTask(event: any): void {
    this.router.navigateByUrl(`/orchestration/transactions/${event.task_id}`);
  }


  onMothDatePickerChange(event: any): void {
    this.startOfMonth = event?.startOfMonth;
    this.endOfMonth = event?.endOfMonth;

    this.dashboardData = null;

    this.cloud_provider_list.forEach((item: any) => {
      if (this.dashboardData[item.cloud_provider]) {
        this.accordionDataList[`${item.cloud_provider}_top_tasks`] = [];
        this.accordionDataList[`${item.cloud_provider}_transactions`] = [];
      }
    });

    this.fetchDashboardData();
  }

  onTabChange(): void {
    this.cloud_provider_list.forEach((item: any) => {
      if (this.dashboardData[item.cloud_provider]) {
        this.accordionDataList[`${item.cloud_provider}_top_tasks`] = [
          ...this.accordionDataList[`${item.cloud_provider}_top_tasks`],
        ];
        this.accordionDataList[`${item.cloud_provider}_transactions`] = [
          ...this.accordionDataList[`${item.cloud_provider}_transactions`],
        ];
      }
    });
  }
  transactionDetail(filterValue:any):void{
    if(filterValue == 'Total'){
      this.router.navigateByUrl(`orchestration/transactions?pageIndex=1&pageSize=5`);
    }else{
    this.router.navigateByUrl(`orchestration/transactions?pageIndex=1&pageSize=5&status=${filterValue}`);
    }
  }
}
