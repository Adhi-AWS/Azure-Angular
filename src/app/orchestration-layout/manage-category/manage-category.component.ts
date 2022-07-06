import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageCategoryService } from 'src/app/services/manage-category.service';
import { AddUpdateManageCategoryComponent } from './add-update-manage-category/add-update-manage-category/add-update-manage-category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  manageCategoryColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: false,
    },
    {
      colRefName: 'name',
      colDisplayName: 'Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'description',
      colDisplayName: 'Description',
      isAnchorLink: false,
    },
    {
      colRefName: 'status',
      colDisplayName: 'Status',
      isAnchorLink: false,
    },
    {
      colRefName: 'cloud_provider',
      colDisplayName: 'Cloud Provider',
      isAnchorLink: false,
    },
    {
      colRefName: 'actions',
      colDisplayName: 'Actions',
      isAnchorLink: false,
    },
  ];

  manageCategoryData: any = null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private manageCategoryService: ManageCategoryService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.getManageCategoryData();
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = 10;
      this.paginator.pageIndex = 0;
      this.paginator.length = 0;
       this.getManageCategoryData();
    }
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateManageCategoryComponent,
      {
        width: '50%',
        data: {
          category_title: 'Add',
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageCategoryService
          .addEditCategory({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Add Category',
                  `Added a Category id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageCategoryData();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Add Category',
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
      AddUpdateManageCategoryComponent,
      {
        width: '50%',
        data: {
          category_title: 'Update',
          payload: { ...event },
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageCategoryService
          .addEditCategory({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Update Category',
                  `Updated a Category id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getManageCategoryData();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Update Category',
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
      'Delete Category',
      'Do you really want to delete this Category?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.manageCategoryService
              .deleteCategory(event.id, this.adminService.getUsername())
              .subscribe(
                (response: any) => {
                  if (response && response.length && response[0].id) {
                    this.alertService.showMessage(
                      'Delete Category',
                      `Deleted a Category id: ${response[0].id} successfully.`,
                      true,
                      {
                        callback: () => {
                          this.getManageCategoryData();
                          return true;
                        },
                      }
                    );
                  }
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete Category',
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
    this.getManageCategoryData(
    );
  }
    getManageCategoryData(
      cloud_provider: string = 'All',
    ): void {
      this.manageCategoryService
        .getCategory(
          cloud_provider,
          this.paginator ? this.paginator.pageIndex + 1 : 1,
          this.paginator ? this.paginator.pageSize : 10
        )
        .subscribe(
          (response: any) => {
            if (response && response.total && response.data) {
              this.manageCategoryData = [...response.data];
              if (this.paginator) {
                this.paginator.length = response.total;
              }
            } else {
              this.manageCategoryData = [];
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
