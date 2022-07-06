import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ConfigAuditService } from 'src/app/services/config-audit.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';

@Component({
  selector: 'app-config-audit',
  templateUrl: './config-audit.component.html',
  styleUrls: ['./config-audit.component.scss'],
})
export class ConfigAuditComponent  {
  configAuditColumns: any[] = [
    {
      colRefName: 'modified_date',
      colDisplayName: 'Modified Date',
      isAnchorLink: false,
    },
    {
      colRefName: 'operation_name',
      colDisplayName: 'Operation Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'modified_by',
      colDisplayName: 'Modified By',
      isAnchorLink: false,
    },
    {
      colRefName: 'config_name',
      colDisplayName: 'Config Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'config_value',
      colDisplayName: 'Config Value',
      isAnchorLink: false,
    },
  ];

  configAuditData: any = null;

  operation_name: string = '';
  isOperationNameSearched = false;
  config_name: string = '';
  isConfigNameSearched = false;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;

  constructor(
    private configAuditService: ConfigAuditService,
    private errorManagementService: ErrorManagementService
  ) {}

  

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = 5;
      this.paginator.pageIndex = 0;
      this.paginator.length = 0;
      this.getConfigAuditData();
    }
  }

  getConfigAuditData(
    operation_name: string = 'All',
    config_name: string = 'All'
  ): void {
    this.configAuditService
      .getConfigAudit(
        operation_name,
        config_name,
        this.paginator ? this.paginator.pageIndex + 1 : 1,
        this.paginator ? this.paginator.pageSize : 5
      )
      .subscribe(
        (response: any) => {
          if (operation_name && operation_name !== 'All') {
            this.isOperationNameSearched = true;
          }
          if (config_name && config_name !== 'All') {
            this.isConfigNameSearched = true;
          }

          if (response && response.total && response.data) {
            this.configAuditData = [...response.data];
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          } else {
            this.configAuditData = [];
            if (this.paginator) {
              this.paginator.length = 0;
              this.paginator.pageIndex = 0;
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Config Audit', error);
          }
        }
      );
  }

  onOperationNameInput(): void {
    if (!this.operation_name && this.isOperationNameSearched) {
      this.clearOperationName();
    }
  }

  clearOperationName(): void {
    this.operation_name = '';
    this.isOperationNameSearched = false;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.getConfigAuditData(
      'All',
      this.config_name.trim() ? this.config_name.trim() : 'All'
    );
  }

  onConfigNameInput(): void {
    if (!this.config_name && this.isConfigNameSearched) {
      this.clearConfigName();
    }
  }

  clearConfigName(): void {
    this.config_name = '';
    this.isConfigNameSearched = false;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.getConfigAuditData(
      this.operation_name.trim() ? this.operation_name.trim() : 'All',
      'All'
    );
  }

  search(): void {
    this.getConfigAuditData(
      this.operation_name.trim() ? this.operation_name.trim() : 'All',
      this.config_name.trim() ? this.config_name.trim() : 'All'
    );
  }

  refreshTable(): void {
    this.operation_name = '';
    this.config_name = '';
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.getConfigAuditData();
  }

  onPageEvent(event: PageEvent): void {
    this.getConfigAuditData(
      this.operation_name.trim() ? this.operation_name.trim() : 'All',
      this.config_name.trim() ? this.config_name.trim() : 'All'
    );
  }
}
