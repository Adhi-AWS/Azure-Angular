import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';
import { ManageCategoryService } from 'src/app/services/manage-category.service';

@Component({
  selector: 'app-add-update-manage-sub-category',
  templateUrl: './add-update-manage-sub-category.component.html',
  styleUrls: ['./add-update-manage-sub-category.component.scss']
})
export class AddUpdateManageSubCategoryComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    // id: new FormControl(
    //   this.data.category_title === 'Update' ? this.data.payload.id : ''
    // ),
    name: new FormControl(
      this.data.subCategory_title === 'Update' ? this.data.payload.name : '',
      Validators.required
    ),
    description: new FormControl(
      this.data.subCategory_title === 'Update' ? this.data.payload.description : '',
      Validators.required
    ),
    category: new FormControl(
      this.data.subCategory_title === 'Update' ? this.data.payload.product_category_id : '',
      Validators.required
    ),
    status: new FormControl(
      this.data.subCategory_title === 'Update' ? this.data.payload.status : ''
    ),
    modified_by: new FormControl(
      this.data.subCategory_title === 'Update' ? this.data.payload.modified_by : ''
    ),
    // product_subCategory_id: new FormControl(
    //   this.data.subCategory_title === 'Update' ? this.data.payload.product_category_id : ''
    // ),
  });

  password_hidden: boolean = true;

  isValid: boolean = false;
  category_list: any=[];
  statusList:any=[true,false];


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateManageSubCategoryComponent>,
    private manageCategoryService:ManageCategoryService,
    private adminService: AdminService,
    private appService:AppService
  ) {}

  ngOnInit(): void {
    this.category_list = [];
    this.manageCategoryService
    .getCategoryAll(this.data.category.cloud_provider).subscribe((response: any) => {
        if (response && response.length) {
          this.category_list = [...response];
        }
  });

    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.subCategory_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.subCategory_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.name !== this.auSubCategoryValue.name ||
          this.data.payload.description !== this.auSubCategoryValue.description ||
          this.data.payload.cloud_provider !== this.auSubCategoryValue.cloud_provider ||
          this.data.payload.status !== this.auSubCategoryValue.status )
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get auSubCategoryValue(): any {
    return this.addUpdateForm.value;
  }

  togglePasswordHidden(): void {
    this.password_hidden = !this.password_hidden;
  }

  addUpdateSubCategory(): void {
    const payload: any = { ...this.auSubCategoryValue };
    if (this.data.subCategory_title === 'Update') {
      payload.id = this.data.payload.id;
      payload.cloud_provider = this.data.category.cloud_provider;
      payload.product_category_id = this.data.payload.product_category_id;
      payload.modified_by = this.adminService.getUsername();
    } else {
      payload.status = true;
      payload.cloud_provider = this.data.category.cloud_provider;
      payload.product_category_id = this.data.payload.product_category_id;
      payload.created_by = this.adminService.getUsername();
    }
    this.mdDialogRef.close(payload);
  }

  onReset(): void {
    this.addUpdateForm.reset();
  }

  close(value: any = false): void {
    this.addUpdateForm.reset();
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }

}
