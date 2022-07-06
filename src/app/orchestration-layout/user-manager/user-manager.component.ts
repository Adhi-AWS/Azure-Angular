import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageUserService } from 'src/app/services/manage-user-service';
import { AppAddUpdateUserDialogComponent } from './app-add-update-user-dialog/app-add-update-user-dialog.component';
import { AppViewUserDialogComponent } from './app-view-user-dialog/app-view-user-dialog.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent  {

  manageApplicationColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: true,
    },       
    {
      colRefName: 'first_name',
      colDisplayName: 'First Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'last_name',
      colDisplayName: 'Last Name',
      isAnchorLink: false,
    }, 
    {
      colRefName: 'user_name',
      colDisplayName: 'User Name',
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

  manageUserData: any = null;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  isvalid: any = false;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private ManageUserService: ManageUserService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) { }

  
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = 10;
      this.paginator.pageIndex = 0;
      this.paginator.length = 0;
      this.getManageUser();
    }
  }

  getManageUser(): void {
    this.ManageUserService
      .getUserDetailsByPagination(
        this.paginator ? this.paginator.pageIndex + 1 : 1,
        this.paginator ? this.paginator.pageSize : 5
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.manageUserData = [...response.data];
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          } else {
            this.manageUserData = [];
            if (this.paginator) {
              this.paginator.length = 0;
              this.paginator.pageIndex = 0;
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Manage User',
              error
            );
          }
        }
      );
  }

  onPageEvent(event: PageEvent): void {
    this.getManageUser();
  }

  openApplicationDetailsDialog(event: any): void {
    delete event.password;
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.dialog.open(AppViewUserDialogComponent, {
      width: '50%',
      data: { ...event },
    });
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AppAddUpdateUserDialogComponent,
      {
        width: '50%',
        data: {
          app_title: 'Add',
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.ManageUserService
          .addUpdateUser({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Add User',
                  `Added an user id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageUser();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Add User',
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
      AppAddUpdateUserDialogComponent,
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
        this.ManageUserService
          .addUpdateUser({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Update User',
                  `Updated an user id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageUser();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Update User',
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
      'Delete User',
      'Do you really want to delete this user?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.ManageUserService            
              .deleteUser(event.id, this.adminService.getUsername())
              .subscribe(
                (response: any) => {
                  if (response && response.length && response[0].id) {
                    this.alertService.showMessage(
                      'Delete User',
                      `Deleted an user id: ${response[0].id} successfully.`,
                      true,
                      {
                        callback: () => {
                          this.getManageUser();
                          return true;
                        },
                      }
                    );
                  }
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete User',
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

  onChangePasswordClick(event: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AppAddUpdateUserDialogComponent,
      {
        width: '50%',
        data: {
          app_title: 'Change Password',
          payload: { ...event },
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.ManageUserService
          .addUpdateUser({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Change Password',
                  `Password Change of user id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageUser();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Change Password User',
                  error
                );
              }
            }
          );
      }
    });
  }
}

  
