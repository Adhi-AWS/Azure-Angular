import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-update-manage-category',
  templateUrl: './add-update-manage-category.component.html',
  styleUrls: ['./add-update-manage-category.component.scss']
})
export class AddUpdateManageCategoryComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    // id: new FormControl(
    //   this.data.category_title === 'Update' ? this.data.payload.id : ''
    // ),
    name: new FormControl(
      this.data.category_title === 'Update' ? this.data.payload.name : '',
      Validators.required
    ),
    description: new FormControl(
      this.data.category_title === 'Update' ? this.data.payload.description : '',
      Validators.required
    ),
    cloud_provider: new FormControl(
      this.data.category_title === 'Update' ? this.data.payload.cloud_provider : '',
      Validators.required
    ),
    status: new FormControl(
      this.data.category_title === 'Update' ? this.data.payload.status : ''
    ),
    modified_by: new FormControl(
      this.data.category_title === 'Update' ? this.data.payload.modified_by : ''
    ),
    // product_category_id: new FormControl(
    //   this.data.category_title === 'Update' ? this.data.payload.product_category_id : ''
    // ),
  });

  password_hidden: boolean = true;

  isValid: boolean = false;
  cloudProvideList: any=[];
  statusList:any=[true,false];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateManageCategoryComponent>,
    private adminService: AdminService,
    private appService:AppService
  ) {}

  ngOnInit(): void {
    this.appService.cloud_providers_list.value.forEach((item: any) => {
      this.cloudProvideList.push(item.cloud_provider);
  });

    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.category_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.category_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.name !== this.auCategoryValue.name ||
          this.data.payload.status !== this.auCategoryValue.status ||
          this.data.payload.description !== this.auCategoryValue.description ||
          this.data.payload.cloud_provider !== this.auCategoryValue.cloud_provider ||
          this.data.payload.status !== this.auCategoryValue.status )
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get auCategoryValue(): any {
    return this.addUpdateForm.value;
  }

  togglePasswordHidden(): void {
    this.password_hidden = !this.password_hidden;
  }

  addUpdateCategory(): void {
    const payload: any = { ...this.auCategoryValue };
    if (this.data.category_title === 'Update') {
      payload.id = this.data.payload.id;
      payload.modified_by = this.adminService.getUsername();
    } else {
      payload.status = true;
      payload.created_by = this.adminService.getUsername();
    }
    this.mdDialogRef.close(payload);
  }

  onReset(): void {
    this.addUpdateForm.reset();
  }

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }

}
