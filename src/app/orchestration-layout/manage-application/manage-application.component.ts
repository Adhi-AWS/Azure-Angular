import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageApplicationsService } from 'src/app/services/manage-applications.service';
import { AddUpdateApplicationDialogComponent } from './add-update-application-dialog/add-update-application-dialog.component';
import { ViewApplicationDialogComponent } from './view-application-dialog/view-application-dialog.component';

@Component({
  selector: 'app-manage-application',
  templateUrl: './manage-application.component.html',
  styleUrls: ['./manage-application.component.scss'],
})
export class ManageApplicationComponent implements  AfterViewInit {
  taskId: string = '';
  manageApplicationColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: true,
    },
    {
      colRefName: 'source',
      colDisplayName: 'Source',
      isAnchorLink: false,
    },
    {
      colRefName: 'description',
      colDisplayName: 'Description',
      isAnchorLink: false,
    },
    {
      colRefName: 'encryption_key',
      colDisplayName: 'Encryption Key',
      isAnchorLink: false,
    },
    {
      colRefName: 'encryption_iv',
      colDisplayName: 'Encryption IV',
      isAnchorLink: false,
    },
    {
      colRefName: 'is_active',
      colDisplayName: 'Active',
      isAnchorLink: false,
    },
    {
      colRefName: 'created_date',
      colDisplayName: 'Created Date',
      isAnchorLink: false,
    },
    {
      colRefName: 'actions',
      colDisplayName: 'Actions',
      isAnchorLink: false,
    },
  ];

  manageApplicationData: any = null;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private manageApplicationsService: ManageApplicationsService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}  

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = 5;
      this.paginator.pageIndex = 0;
      this.paginator.length = 0;
      this.getManageApplications();
    }
  }

  getManageApplications(): void {
    this.manageApplicationsService
      .getApplicationDetailsByPagination(
        this.paginator ? this.paginator.pageIndex + 1 : 1,
        this.paginator ? this.paginator.pageSize : 5
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.manageApplicationData = [...response.data];
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          } else {
            this.manageApplicationData = [];
            if (this.paginator) {
              this.paginator.length = 0;
              this.paginator.pageIndex = 0;
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Manage Applications',
              error
            );
          }
        }
      );
  }

  onPageEvent(event: PageEvent): void {
    this.getManageApplications();
  }

  openApplicationDetailsDialog(event: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.dialog.open(ViewApplicationDialogComponent, {
      width: '50%',
      data: { ...event },
    });
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateApplicationDialogComponent,
      {
        width: '50%',
        data: {
          app_title: 'Add',
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageApplicationsService
          .addUpdateApplication({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Add Application',
                  `Added an application id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageApplications();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Add Application',
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
    const dialogRef: any = this.dialog.open(
      AddUpdateApplicationDialogComponent,
      {
        width: '50%',
        data: {
          app_title: 'Update',
          payload: { ...event },
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageApplicationsService
          .addUpdateApplication({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Update Application',
                  `Updated an application id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageApplications();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Update Application',
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
      'Delete Application',
      'Do you really want to delete this application?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.manageApplicationsService
              .deleteApplication(event.id, this.adminService.getUsername())
              .subscribe(
                (response: any) => {
                  if (response && response.length && response[0].id) {
                    this.alertService.showMessage(
                      'Delete Application',
                      `Deleted an application id: ${response[0].id} successfully.`,
                      true,
                      {
                        callback: () => {
                          this.getManageApplications();
                          return true;
                        },
                      }
                    );
                  }
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete Application',
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
