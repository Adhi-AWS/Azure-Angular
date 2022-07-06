import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppService } from 'src/app/services/app.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageCategoryService } from 'src/app/services/manage-category.service';
import { ManageSubCategoryService } from 'src/app/services/manage-sub-category.service';
import { AddUpdateManageSubCategoryComponent } from './add-update-manage-sub-category/add-update-manage-sub-category/add-update-manage-sub-category.component';

@Component({
  selector: 'app-manage-sub-category',
  templateUrl: './manage-sub-category.component.html',
  styleUrls: ['./manage-sub-category.component.scss']
})
export class ManageSubCategoryComponent implements OnInit {
  cloud_provider: string = '';
  category:any;
  cloud_provider_list: any[] = [];
  filtered_cloud_provider_list: any[] = [];
  cp_input: string = '';

  category_list: any[] = [];
  filtered_category_list: any[] = [];
  tn_input: string = '';

  manageSubCategoryColumns: any[] = [
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

  manageSubCategoryData: any[] = [];
  @ViewChild('subCategorypaginator', { static: true })
  paginator!: MatPaginator;
  productCategoryId: any;


  constructor(private appService:AppService,
    private manageCategoryService:ManageCategoryService,
    private errorManagementService:ErrorManagementService,
    private manageSubCategoryService:ManageSubCategoryService,
    private adminService:AdminService,
    private alertService:AlertService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.appService.cloud_providers_list.value.forEach((item: any) => {
      this.filtered_cloud_provider_list.push(item.cloud_provider);
      this.cloud_provider_list.push(item.cloud_provider);
  });

  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageSize = 10;
      this.paginator.pageIndex = 0;
      this.paginator.length = 0;
    }
  }

  getCategoryList(): void {
    this.category_list  = [];
    this.filtered_category_list = [];
    this.manageSubCategoryData = [];
    this.manageCategoryService
      .getCategoryAll(this.cloud_provider)
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.category_list = [...response];
            this.filtered_category_list = [...this.category_list];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Tasks', error);
          }
        }
      );
  }
  
  onSearch(field_name: string): void {
    if (field_name === 'cloud_provider') {
      this.filtered_cloud_provider_list = [];

      const filterValue: string = this.cp_input.toLowerCase().trim();
      if (!filterValue) {
        this.filtered_cloud_provider_list = [...this.cloud_provider_list];
      } else {
        this.cloud_provider_list.forEach((item: any) => {
          if (item.toLowerCase().indexOf(filterValue) >= 0) {
            this.filtered_cloud_provider_list.push(item);
          }
        });
      }
    } else {
      this.filtered_category_list = [];

      let filterValue: string = this.tn_input.toLowerCase().trim();
      if (!filterValue) {
        this.filtered_category_list = [...this.category_list];
      } else {
        this.category_list.forEach((item: any) => {
          if (item.name.toLowerCase().indexOf(filterValue) >= 0) {
            this.filtered_category_list.push(item);
          }
        });
      }
    }
  }
  dropDownClosed(): void {
    this.cp_input = '';
    this.filtered_cloud_provider_list = [...this.cloud_provider_list];
    this.tn_input = '';
    this.filtered_category_list = [...this.category_list];
  }
  // getSubCategoryData(category:any):void{
  //   console.log(category);
  // }
  onPageEvent(event: PageEvent): void {
    this.getSubCategoryData();
  }
  getSubCategoryData(): void {
      this.manageSubCategoryService
        .getSubCategory(
          this.cloud_provider,
          this.category.id,
          this.paginator ? this.paginator.pageIndex + 1 : 1,
          this.paginator ? this.paginator.pageSize : 10
        )
        .subscribe(
          (response: any) => {
            if (response && response.total && response.data) {
              this.manageSubCategoryData = [...response.data];
              if (this.paginator) {
                this.paginator.length = response.total;
              }
            } else {
              this.manageSubCategoryData = [];
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
  
    onAddClick(): void {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const dialogRef: any = this.dialog.open(
        AddUpdateManageSubCategoryComponent,
        {
          width: '50%',
          data: {
            subCategory_title: 'Add',
            category:this.category,
            payload: { "product_category_id" : this.category.id },
          },
        }
      );
  
      dialogRef.afterClosed().subscribe((payload: any) => {
        if (payload) {
          this.manageSubCategoryService
            .addEditSubCategory({ ...payload })
            .subscribe(
              (response: any) => {
                if (response && response.id) {
                  this.alertService.showMessage(
                    'Add Sub Category',
                    `Added Sub Category id: ${response.id} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.getSubCategoryData();
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
        AddUpdateManageSubCategoryComponent,
        {
          width: '50%',
          data: {
            subCategory_title: 'Update',
            category:this.category,
            payload: { ...event },
          },
        }
      );
  
      dialogRef.afterClosed().subscribe((payload: any) => {
        if (payload) {
          this.manageSubCategoryService
            .addEditSubCategory({ ...payload })
            .subscribe(
              (response: any) => {
                if (response && response.id) {
                  this.alertService.showMessage(
                    'Update Sub Category',
                    `Updated Sub Category id: ${response.id} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.getSubCategoryData();
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
              this.manageSubCategoryService
                .deleteSubCategory(event.id, this.adminService.getUsername())
                .subscribe(
                  (response: any) => {
                    if (response && response.length && response[0].id) {
                      this.alertService.showMessage(
                        'Delete Sub Category',
                        `Deleted Sub Category id: ${response[0].id} successfully.`,
                        true,
                        {
                          callback: () => {
                            this.getSubCategoryData();
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

}
