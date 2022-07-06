import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageUserService } from 'src/app/services/manage-user-service';
import { AddRoleComponent } from './add-role/add-role.component';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit { 
  manageRoleColumns: any[] = [
  {
    colRefName: 'id',
    colDisplayName: 'ID',
    isAnchorLink: false,
  },
  {
    colRefName: 'username',
    colDisplayName: 'Name',
    isAnchorLink: false,
  },
  {
    colRefName: 'role',
    colDisplayName: 'Role',
    isAnchorLink: false,
  },
  {
    colRefName: 'roleDescription',
    colDisplayName: 'Role description',
    isAnchorLink: false,
  },
  {
    colRefName: 'actions',
    colDisplayName: 'Actions',
    isAnchorLink: false,
  }
];

manageRoleData: any = null;
@ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;

constructor(
  private dialog: MatDialog,
  private adminService: AdminService,
  private manageUserService: ManageUserService,
  private alertService: AlertService,
  private errorManagementService: ErrorManagementService
) {}

ngOnInit(): void {
  this.getManageRoleData();
}
// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
ngAfterViewInit(): void {
  if (this.paginator) {
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.paginator.length = 0;
     this.getManageRoleData();
  }
}

onAddClick(): void {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const dialogRef: any = this.dialog.open(
    AddRoleComponent,
    {
      width: '50%',
      data: {
        role_title: 'Add',
      },
    }
  );

  dialogRef.afterClosed().subscribe((payload: any) => {
    if (payload) {
      this.manageUserService
        .addUpdateUserInRole({ ...payload })
        .subscribe(
          (response: any) => {
            if (response && response.id) {
              this.alertService.showMessage(
                'Add role',
                `Added a role id: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.getManageRoleData();
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Add role',
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
    AddRoleComponent,
    {
      width: '50%',
      data: {
        role_title: 'Update',
        payload: { ...event },
      },
    }
  );

  dialogRef.afterClosed().subscribe((payload: any) => {
    if (payload) {
      this.manageUserService
        .addUpdateUserInRole({ ...payload })
        .subscribe(
          (response: any) => {
            if (response && response.id) {
              this.alertService.showMessage(
                'Update role',
                `Updated a role id: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.getManageRoleData();
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Update role',
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
    'Delete role',
    'Do you really want to delete this role?',
    {
      callback: (value: boolean) => {
        if (value) {
          this.manageUserService
            .deleteUserRole(event.id, this.adminService.getUsername())
            .subscribe(
              (response: any) => {
                if (response && response.length && response[0].id) {
                  this.alertService.showMessage(
                    'Delete role',
                    `Deleted a role id: ${response[0].id} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.getManageRoleData();
                        return true;
                      },
                    }
                  );
                }
              },
              (error: any) => {
                if (error instanceof HttpErrorResponse) {
                  this.errorManagementService.handleApiError(
                    'Delete role',
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
onPageEvent(event: PageEvent): void {
  this.getManageRoleData(
  );
}
getManageRoleData(
  ): void {
    this.manageUserService
      .getUserInRole(
        this.paginator ? this.paginator.pageIndex + 1 : 1,
        this.paginator ? this.paginator.pageSize : 10
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.manageRoleData = [...response.data];
            this.manageRoleData.forEach((element:any) => {
              element.role = element.roles_details.name;
              element.roleDescription = element.roles_details.description;
            });
            if (this.paginator) {
              this.paginator.length = response.total;
            }
          } else {
            this.manageRoleData = [];
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

}
