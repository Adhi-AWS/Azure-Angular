import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageQueueService } from 'src/app/services/manage-queue.service';
import { AddUpdateQueueDialogComponent } from './add-update-queue-dialog/add-update-queue-dialog.component';
import { MapAdapterDialogComponent } from './map-adapter-dialog/map-adapter-dialog.component';

@Component({
  selector: 'app-manage-queue',
  templateUrl: './manage-queue.component.html',
  styleUrls: ['./manage-queue.component.scss'],
})
export class ManageQueueComponent implements  AfterViewInit {
  taskId: string = '';
  manageQueueColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: false,
    },
    {
      colRefName: 'queue_name',
      colDisplayName: 'Queue Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'exchange_key',
      colDisplayName: 'Exchange Key',
      isAnchorLink: false,
    },
    {
      colRefName: 'is_default',
      colDisplayName: 'Default',
      isAnchorLink: false,
    },
    {
      colRefName: 'mapping_names',
      colDisplayName: 'Resource Adapters',
      isAnchorLink: false,
      showAsChips: true,
    },
    {
      colRefName: 'action',
      colDisplayName: 'Action',
      isAnchorLink: false,
      mapAdapter: true,
    },
  ];

  manageQueueData: any = null;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;

  constructor(
    private dialog: MatDialog,
    private manageQueueService: ManageQueueService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {} 

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = 5;
      this.paginator.pageIndex = 0;
      this.paginator.length = 0;
      this.getManageQueueData();
    }
  }

  getManageQueueData(): void {
    this.manageQueueService
      .getQueueProviderMappings(
        this.paginator ? this.paginator.pageIndex + 1 : 1,
        this.paginator ? this.paginator.pageSize : 5
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.manageQueueData = [...response.data];
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          } else {
            this.manageQueueData = [];
            if (this.paginator) {
              this.paginator.length = 0;
              this.paginator.pageIndex = 0;
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Manage Queue', error);
          }
        }
      );
  }

  onPageEvent(event: PageEvent): void {
    this.getManageQueueData();
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddUpdateQueueDialogComponent, {
      width: '50%',
      data: {
        app_title: 'Add',
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageQueueService.addUpdateQueue({ ...payload }).subscribe(
          (response: any) => {
            if (response && response.queue_name) {
              this.alertService.showMessage(
                'Add Queue',
                `Added a Queue: ${response.queue_name} successfully.`,
                true,
                {
                  callback: () => {
                    this.getManageQueueData();
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError('Add Queue', error);
            }
          }
        );
      }
    });
  }

  onMapAdapterClick(event: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(MapAdapterDialogComponent, {
      width: '50%',
      data: {
        payload: { ...event },
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageQueueService
          .mapQueueProviderMappings({ ...payload })
          .subscribe(
            (response: any) => {
              if (response) {
                this.alertService.showMessage(
                  `Map Adapter(s) to Queue: ${event.queue_name}`,
                  `Mapped Resource Adapter(s) to Queue: ${event.queue_name} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageQueueData();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  `Map Adapter(s) to Queue: ${event.queue_name}`,
                  error
                );
              }
            }
          );
      }
    });
  }

  onEditClick(event: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddUpdateQueueDialogComponent, {
      width: '50%',
      data: {
        app_title: 'Update',
        payload: { ...event },
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageQueueService.addUpdateQueue({ ...payload }).subscribe(
          (response: any) => {
            if (response && response.queue_name) {
              this.alertService.showMessage(
                'Update Queue',
                `Updated a Queue: ${response.queue_name} successfully.`,
                true,
                {
                  callback: () => {
                    this.getManageQueueData();
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError('Update Queue', error);
            }
          }
        );
      }
    });
  }

  onDeleteClick(event: any): void {
    this.alertService.showConfirmation(
      'Delete Queue',
      'Do you really want to delete this queue?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.manageQueueService.deleteQueue(event.id).subscribe(
              (response: any) => {
                if (response && response.message) {
                  this.alertService.showMessage(
                    'Delete Queue',
                    `${response.message} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.getManageQueueData();
                        return true;
                      },
                    }
                  );
                }
              },
              (error: any) => {
                if (error instanceof HttpErrorResponse) {
                  this.errorManagementService.handleApiError(
                    'Delete Queue',
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
}
