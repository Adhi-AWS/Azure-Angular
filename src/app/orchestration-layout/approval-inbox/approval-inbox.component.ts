import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { TaskConfigurationService } from 'src/app/services/task-configuration.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { status_list } from 'src/app/shared/static-data/status-list';

@Component({
  selector: 'app-approval-inbox',
  templateUrl: './approval-inbox.component.html',
  styleUrls: ['./approval-inbox.component.scss'],
})
export class ApprovalInboxComponent implements OnInit, AfterContentInit {
  transactionsColumns: any[] = [
    {
      colRefName: 'task_id',
      colDisplayName: 'Task ID',
      isAnchorLink: true,
    },
   /* {
      colRefName: 'identifier',
      colDisplayName: 'Identifier',
      isAnchorLink: false,
    },*/
    {
      colRefName: 'cloud_provider',
      colDisplayName: 'Cloud Provider',
      isAnchorLink: false,
    },
    {
      colRefName: 'task_name',
      colDisplayName: 'Task Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'source',
      colDisplayName: 'Source',
      isAnchorLink: false,
    },
    {
      colRefName: 'created_date',
      colDisplayName: 'Created Date',
      isAnchorLink: false,
    },
    {
      colRefName: 'action',
      colDisplayName: 'Action',
      isAnchorLink: false,
          },
        ];

  cloud_provider_screen_name: string = 'ALL';

  task_id: string = '';
  task_name: string = '';
  cloud_provider: string = '';
  source: string = '';
  status: string = '';
  created_by: string = '';
  reference_key: string = '';
  reference_value: any = null;
  parameter_name: string = '';
  parameter_value: string = '';

  transactionsData: any[] = [];

  reference_keys_list: string[] = [
    'task_instance_id',
    'cust_sub_id',
    'task_request_ref_id',
  ];
  filteredReferenceKeyOptions: Observable<string[]> | undefined;

  parameter_names_list: string[] = [];
  filteredParameterNameOptions: Observable<string[]> | undefined;

  status_list: string[] = [...status_list];

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  pageIndex: number = 1;
  pageSize: number = 5;

  timeout: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private transactionsService: TransactionsService,
    private taskConfigurationService: TaskConfigurationService,
    private errorManagementService: ErrorManagementService
  ) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.queryParams.subscribe((params) => {
      this.pageIndex = params['pageIndex'] || 1;
      this.pageSize = params['pageSize'] || 5;

      this.task_id = params['task_id'] || '';
      this.task_name = params['task_name'] || '';
      this.source = params['source'] || '';
      this.status = params['status'] || '';
      this.created_by = params['created_by'] || '';
      this.reference_key = params['reference_key'] || '';
      this.reference_value = params['reference_value']
        ? JSON.parse(params['reference_value'])
        : '';
      this.parameter_name = params['parameter_name'] || '';
      this.parameter_value = params['parameter_value']
        ? JSON.parse(params['parameter_value'])
        : '';
    });
  }

  ngOnInit(): void {

    // this.cloud_provider =
    //   this.route.snapshot.paramMap.get('cloud_provider') || '';

    this.appService.cloud_providers_list.value.forEach((item: any) => {
      if (this.cloud_provider.trim() === item.cloud_provider.trim()) {
        // this.cloud_provider_screen_name = item.screen_name;
        this.cloud_provider_screen_name = 'All';
      }
    });

    if (this.task_name.trim()) {
      this.fetchParametersList();
    }

    this.filteredReferenceKeyOptions = of(this.reference_keys_list).pipe(
      map((values: string[]) => values)
    );

    this.filteredParameterNameOptions = of(this.parameter_names_list).pipe(
      map((values: string[]) => values)
    );
  }

  ngAfterContentInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.pageIndex - 1;
      this.paginator.length = 0;
      this.getTransactionData();
    }
  }

  updateHttpQueryParams(): void {
    const queryParams: Params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };

    if (this.task_id.trim()) {
      queryParams['task_id'] = this.task_id.trim();
    }
    if (this.task_name.trim()) {
      queryParams['task_name'] = this.task_name.trim();
    }
    if (this.source.trim()) {
      queryParams['source'] = this.source.trim();
    }
    if (this.status.trim()) {
      queryParams['status'] = this.status.trim();
    }
    if (this.created_by.trim()) {
      queryParams['created_by'] = this.created_by.trim();
    }

    if (this.reference_key.trim()) {
      queryParams['reference_key'] = this.reference_key.trim();
    }
    if (this.reference_value.trim()) {
      queryParams['reference_value'] = JSON.stringify(
        this.reference_value.trim()
      );
    }
    if (this.parameter_name.trim()) {
      queryParams['parameter_name'] = this.parameter_name.trim();
    }
    if (this.parameter_value.trim()) {
      queryParams['parameter_value'] = JSON.stringify(
        this.parameter_value.trim()
      );
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  getTransactionData(): void {
    const filters: any = {};
    if (this.task_id.trim()) {
      filters['task_id'] = this.task_id.trim();
    }
    if (this.cloud_provider.trim()) {
      filters['cloud_provider'] = this.cloud_provider.trim();
    }
    if (this.task_name.trim()) {
      filters['task_name'] = this.task_name.trim();
    }
    if (this.source.trim()) {
      filters['source'] = this.source.trim();
    }
    if (this.status.trim()) {
      filters['status'] = this.status.trim();
    }
    if (this.created_by.trim()) {
      filters['created_by'] = this.created_by.trim();
    }
    if (this.reference_key.trim() && this.reference_value.trim()) {
      filters['references'] = {
        [this.reference_key.trim()]: this.reference_value.trim(),
      };
    }
    if (this.parameter_name.trim() && this.parameter_value.trim()) {
      filters['parameters'] = {
        [this.parameter_name.trim()]: this.parameter_value.trim(),
      };
    }

    this.updateHttpQueryParams();

    this.transactionsService
      .getTransactionDetailsThroughPostRequest(
        {
          // commenting filter as we don't require filter any more
          // ...filters,
        },
        this.paginator ? this.paginator.pageIndex + 1 : 1,
        this.paginator ? this.paginator.pageSize : 5
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.transactionsData = [...response.data];
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          } else {
            this.transactionsData = [];
            if (this.paginator) {
              this.paginator.length = 0;
              this.paginator.pageIndex = 0;
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Tasks', error);
          }
        }
      );
  }

  onTaskNameChange(): void {
    if (this.timeout) {
      //if there is already a timeout in process cancel it
      window.clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.fetchParametersList();
    }, 1000);
  }

  fetchParametersList(): void {
    this.taskConfigurationService
      .getTaskConfiguration(this.cloud_provider, this.task_name)
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.parameter_names_list = Object.keys(response[0].default_values);

            this.filteredParameterNameOptions = of(
              this.parameter_names_list
            ).pipe(map((values: string[]) => values));
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Parameters List',
              error
            );
          }
        }
      );
  }

  onInputChange(field_name: string): void {
    switch (field_name) {
      case 'reference_key':
        this.filteredReferenceKeyOptions = of(this.reference_keys_list).pipe(
          map((values: string[]) =>
            this._filterReferenceKey(values, this.reference_key)
          )
        );
        break;
      case 'parameter_name':
        this.filteredParameterNameOptions = of(this.parameter_names_list).pipe(
          map((values: string[]) =>
            this._filterParameterName(values, this.parameter_name)
          )
        );
        break;
      default:
        break;
    }
  }

  private _filterReferenceKey(values: string[], inputValue: string): string[] {
    return values.filter((value: string) =>
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  private _filterParameterName(values: any, inputValue: string): string[] {
    return values.filter((value: any) =>
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  clearFilters(): void {
    this.task_id = '';
    this.task_name = '';
    this.source = '';
    this.status = '';
    this.created_by = '';
    this.reference_key = '';
    this.reference_value = '';
    this.parameter_name = '';
    this.parameter_value = '';

    this.pageIndex = 1;

    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }

    this.getTransactionData();
  }

  searchTransactions(): void {
    this.getTransactionData();
  }

  refreshTable(): void {
    this.pageIndex = 1;

    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.getTransactionData();
  }

  goToTask(event: any): void {
    this.router.navigateByUrl(`/orchestration/transactions/${event.task_id}`);
  }

  onPageEvent(): void {
    if (this.paginator) {
      this.pageIndex = this.paginator.pageIndex + 1;
      this.pageSize = this.paginator.pageSize;
    }
    this.getTransactionData();
  }
}
