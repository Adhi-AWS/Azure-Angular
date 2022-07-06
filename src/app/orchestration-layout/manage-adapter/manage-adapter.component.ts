import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { AddAdapterDialogComponent } from './add-adapter-dialog/add-adapter-dialog.component';
import { AppService } from 'src/app/services/app.service';
import { ManageAdapterService } from 'src/app/services/manage-adapter.service';

@Component({
  selector: 'app-manage-adapter',
  templateUrl: './manage-adapter.component.html',
  styleUrls: ['./manage-adapter.component.scss'],
})
export class ManageAdapterComponent implements  AfterViewInit {
  taskId: string = '';
  manageAdapterColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: false,
    },
    {
      colRefName: 'cloud_provider',
      colDisplayName: 'Cloud Provider',
      isAnchorLink: false,
    },
    {
      colRefName: 'action',
      colDisplayName: 'Action',
      isAnchorLink: false,
    },
  ];

  manageAdapterData: any = null;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
    private manageAdapterService: ManageAdapterService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = 5;
      this.paginator.pageIndex = 0;
      this.paginator.length = 0;
      this.getAdapterData();
    }
  }

  getAdapterData(): void {
    this.manageAdapterService
      .getAdapters(
        this.paginator ? this.paginator.pageIndex + 1 : 1,
        this.paginator ? this.paginator.pageSize : 5
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.manageAdapterData = [...response.data];
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          } else {
            this.manageAdapterData = [];
            if (this.paginator) {
              this.paginator.length = 0;
              this.paginator.pageIndex = 0;
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Manage Resource Adapter',
              error
            );
          }
        }
      );
  }

  onPageEvent(event: PageEvent): void {
    this.getAdapterData();
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddAdapterDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageAdapterService.addAdapter({ ...payload }).subscribe(
          (response: any) => {
            if (response && response.cloud_provider) {
              this.alertService.showMessage(
                'Add Resource Adapter',
                `Added a Resource Adapter: ${response.cloud_provider} successfully.`,
                true,
                {
                  callback: () => {
                    this.setCloudProvidersListinObservable();
                    this.getAdapterData();
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Add Resource Adapter',
                error
              );
            }
          }
        );
      }
    });
  }

  onDeleteClick(event: any): void {
    this.alertService.showConfirmation(
      'Delete Resource Adapter',
      'Do you really want to delete this adapter?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.manageAdapterService.deleteAdapter(event.id).subscribe(
              (response: any) => {
                if (response && response.message) {
                  this.alertService.showMessage(
                    'Delete Resource Adapter',
                    `${response.message} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.setCloudProvidersListinObservable();
                        this.getAdapterData();
                        return true;
                      },
                    }
                  );
                }
              },
              (error: any) => {
                if (error instanceof HttpErrorResponse) {
                  this.errorManagementService.handleApiError(
                    'Delete Resource Adapter',
                    error
                  );
                }
              }
            );
          }
          return true;
        },
      }
    );
  }

  setCloudProvidersListinObservable(): void {
    this.appService.getAdapters().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.appService.setCloudProviderList([...response.data]);
        }
      },
      (error: any) => {}
    );
  }
}
