import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductItem } from 'src/app/models/productItem.model';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppService } from 'src/app/services/app.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageCategoryService } from 'src/app/services/manage-category.service';
import { ManageProductItemService } from 'src/app/services/manage-product-item.service';
import { ManageSubCategoryService } from 'src/app/services/manage-sub-category.service';
import { JsonEditorDialogComponent } from 'src/app/shared/json-editor-dialog/json-editor-dialog.component';

@Component({
  selector: 'app-manage-product-item',
  templateUrl: './manage-product-item.component.html',
  styleUrls: ['./manage-product-item.component.scss']
})
export class ManageProductItemComponent implements OnInit {
 
  productItemDetail:any;
  editor: any;
  cloud_provider: string = '';
  category:any;
  subCategory:any;
  product:any;
  cloud_provider_list: any[] = [];
  filtered_cloud_provider_list: any[] = [];
  cp_input: string = '';

  category_list: any[] = [];
  filtered_category_list: any[] = [];
  tn_input: string = '';

  subCategory_list: any[] = [];
  filtered_subCategory_list: any[] = [];
  sn_input: string = '';
  
  product_list: any[] = [];
  filtered_product_list: any[] = [];
  pn_input: string = '';
  statusList:any = [true,false];
  cloud_marketplace_list:any = [true,false];
  htc_marketplace_list:any = [true,false];
  form_title:string='';

  addUpdateForm = new FormGroup({
    // id: new FormControl(
    //   this.data.category_title === 'Update' ? this.data.payload.id : ''
    // ),
    name: new FormControl( '',
      Validators.required
    ),
    description: new FormControl('',
      Validators.required
    ),
    htc_marketplace: new FormControl('',
      Validators.required
    ),
    cloud_marketplace: new FormControl('',
      Validators.required
    ),
    price: new FormControl(0,
      // eslint-disable-next-line security/detect-unsafe-regex
      [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
    ),
    logo_base64:new FormControl('',Validators.required),
    ui_layout:new FormControl(''),
    status: new FormControl(''
    )
    // product_subCategory_id: new FormControl(
    //   this.data.subCategory_title === 'Update' ? this.data.payload.product_category_id : ''
    // ),
  });

  constructor(private productItemService : ManageProductItemService,
    private appService:AppService,
    private alertService:AlertService,
    private adminService:AdminService,
    private errorManagementService:ErrorManagementService,
    private manageCategoryService:ManageCategoryService,
    private manageSubCategoryService:ManageSubCategoryService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.appService.cloud_providers_list.value.forEach((item: any) => {
      this.filtered_cloud_provider_list.push(item.cloud_provider);
      this.cloud_provider_list.push(item.cloud_provider);
  });
  }
  getCategoryList(): void {
    this.category_list  = [];
    this.filtered_category_list = [];
    this.subCategory = [];
    this.filtered_subCategory_list = [];
    this.product_list = [];
    this.filtered_product_list = [];
    this.product = undefined
    // this.manageSubCategoryData = [];
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
  getSubCategoryData(): void {
    this.subCategory = [];
    this.filtered_subCategory_list = [];
    this.product_list = [];
    this.filtered_product_list = [];
    this.product = undefined
    this.manageSubCategoryService
      .getSubCategory(
        this.cloud_provider,
        this.category.id,
      )
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.subCategory_list = [...response.data];
            this.filtered_subCategory_list = [...response.data];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Config Audit', error);
          }
        }
      );
  }
  getProductList():void{
    this.product_list = [];
    this.filtered_product_list = [];
    this.product = undefined
    this.productItemService
      .getProductAll(
        this.cloud_provider,
        this.subCategory.id,
      )
      .subscribe(
        (response: any) => {
          if (response) {
            this.product_list = [...response];
            this.filtered_product_list = [...response];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Config Audit', error);
          }
        }
      );
  }
  dropDownClosed(): void {
    this.cp_input = '';
    this.filtered_cloud_provider_list = [...this.cloud_provider_list];
    this.tn_input = '';
    this.filtered_category_list = [...this.category_list];
    this.sn_input = '';
    this.filtered_subCategory_list = [...this.subCategory_list];
    this.pn_input = '';
    this.filtered_product_list = [...this.product_list];
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
    } else if(field_name === 'category') {
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
    } else if(field_name === 'subCategory') {
      this.filtered_subCategory_list = [];

      let filterValue: string = this.sn_input.toLowerCase().trim();
      if (!filterValue) {
        this.filtered_subCategory_list = [...this.subCategory_list];
      } else {
        this.subCategory_list.forEach((item: any) => {
          if (item.name.toLowerCase().indexOf(filterValue) >= 0) {
            this.filtered_subCategory_list.push(item);
          }
        });
      }
    } else if(field_name === 'product') {
      this.filtered_product_list = [];

      let filterValue: string = this.pn_input.toLowerCase().trim();
      if (!filterValue) {
        this.filtered_product_list = [...this.product_list];
      } else {
        this.product_list.forEach((item: any) => {
          if (item.name.toLowerCase().indexOf(filterValue) >= 0) {
            this.filtered_product_list.push(item);
          }
        });
      }
    }
  }

  displayForm(action:string):void{
      
    this.form_title = action;
    this.addUpdateForm = new FormGroup({
      // id: new FormControl(
      //   this.data.category_title === 'Update' ? this.data.payload.id : ''
      // ),
      name: new FormControl(
        this.product.name ? this.product.name : '',
        Validators.required
      ),
      description: new FormControl(
        this.product.description ? this.product.description : '',
        Validators.required
      ),
      price: new FormControl(this.product.price ? this.product.price : 0,
        // eslint-disable-next-line security/detect-unsafe-regex
        [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ),
      logo_base64: new FormControl(
        this.product.logo_base64 ? this.product.logo_base64 : '',
        Validators.required
      ),
      htc_marketplace: new FormControl(
        this.product.htc_marketplace != null ? this.product.htc_marketplace : '',
      Validators.required
      ),
      cloud_marketplace: new FormControl(this.product.cloud_marketplace != null ? this.product.cloud_marketplace : '',
      Validators.required
      ),
      ui_layout: new FormControl(
        this.product.ui_layout ? JSON.stringify(this.product.ui_layout) : JSON.stringify({
          data: {},
          layout: [],
          schema: {}
        })
      ),
      status: new FormControl(
        this.product.status != null ? this.product.status : '',
        Validators.required
      )
      // product_subCategory_id: new FormControl(
      //   this.data.subCategory_title === 'Update' ? this.data.payload.product_category_id : ''
      // ),
    });
    
  }
  onAddClick():void{
    this.product = new ProductItem();
    this.displayForm('Add New');
  }

  deleteProduct(): void {
      this.alertService.showConfirmation(
        'Delete Product',
        'Do you really want to delete this Product?',
        {
          callback: (value: boolean) => {
            if (value) {
              this.productItemService
                .deleteCategory(this.product.id, this.adminService.getUsername())
                .subscribe(
                  (response: any) => {
                    if (response && response.length && response[0].id) {
                      this.alertService.showMessage(
                        'Delete Category',
                        `Deleted a Category id: ${response[0].id} successfully.`,
                        true,
                        {
                          callback: () => {
                            this.getProductList();
                            this.onAddClick();
                            this.product = undefined;
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
  addUiLayoutData():void{
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(JsonEditorDialogComponent, {
      minWidth: '50%',
      data: {
        payload: this.product.ui_layout,
      },
    });

    dialogRef.afterClosed().subscribe((updatedTestPayload: any) => {
      if (updatedTestPayload) {
        this.product.ui_layout = updatedTestPayload;
      }
    })
  }
  addUpdateProduct(): void {
    if(this.addUpdateForm.valid) {
    this.addUpdateForm.value.cloud_provider = this.cloud_provider;
    if (this.product.id) {
      this.addUpdateForm.value.id = this.product.id;
      this.addUpdateForm.value.modified_by = this.adminService.getUsername();
      this.addUpdateForm.value.ui_layout = this.product.ui_layout;
      this.productItemService
      .addEditProductItem(this.addUpdateForm.value)
      .subscribe(
        (response: any) => {
          if (response && response.id) {
            this.alertService.showMessage(
              'Update User',
              `Updated an user id: ${response.id} successfully.`,
              true,
              {
                callback: () => {
                  this.getProductList();
                  this.product = undefined;
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
    } else {
      this.product.product_subcategory_id = this.subCategory.id;
      this.addUpdateForm.value.product_subcategory_id = this.subCategory.id;
      this.addUpdateForm.value.created_by=this.adminService.getUsername();
      this.addUpdateForm.value.ui_layout = this.product.ui_layout;
      this.productItemService
            .addEditProductItem(this.addUpdateForm.value)
            .subscribe(
              (response: any) => {
                if (response && response.id) {
                  this.alertService.showMessage(
                    'Add Sub Category',
                    `Added Sub Category id: ${response.id} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.getProductList();
                        this.onAddClick();
                        this.product = undefined;
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
  }
}
}
