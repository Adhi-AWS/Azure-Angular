import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';

@Component({
  selector: 'app-app-add-update-user-dialog',
  templateUrl: './app-add-update-user-dialog.component.html',
  styleUrls: ['./app-add-update-user-dialog.component.scss']
})
export class AppAddUpdateUserDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    created_by: new FormControl(
      this.data.app_title === 'Update' || this.data.app_title === 'Change Password' ? this.data.payload.created_by : '',
      Validators.required
    ),
    password: new FormControl(
      this.data.app_title === 'Update' || this.data.app_title === 'Change Password' ? this.data.payload.password : '',
      Validators.required
    ),
    user_name: new FormControl(
      this.data.app_title === 'Update' || this.data.app_title === 'Change Password' ? this.data.payload.user_name : '',
      Validators.required
    ),
    first_name: new FormControl(
      this.data.app_title === 'Update' || this.data.app_title === 'Change Password' ? this.data.payload.first_name : '',
      Validators.required
    ),
    last_name: new FormControl(
      this.data.app_title === 'Update' || this.data.app_title === 'Change Password' ? this.data.payload.last_name : '',
      Validators.required
    ),
    is_admin: new FormControl(
      this.data.app_title === 'Update' || this.data.app_title === 'Change Password' ? this.data.payload.is_admin : false,
      Validators.required
    ),
    is_active: new FormControl(
      this.data.app_title === 'Update' || this.data.app_title === 'Change Password' ? this.data.payload.is_active : true,
      Validators.required
    ),
    new_password_1: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.new_password_1 : '',
      Validators.required
    ),
    new_password_2: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.new_password_2 : '',
      Validators.required
    ),

  });

  isValid: boolean = true;
  ispasswordValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AppAddUpdateUserDialogComponent>,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.app_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        (this.data.app_title === 'Update' ||
          this.data.app_title === 'Change Password') &&
        this.addUpdateForm.valid &&
        (
          this.data.payload.user_name !== this.auAppValue.user_name ||
          this.data.payload.first_name !== this.auAppValue.first_name ||
          this.data.payload.last_name !== this.auAppValue.last_name ||
          this.data.payload.is_active !== this.auAppValue.is_active)
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get auAppValue(): any {
    return this.addUpdateForm.value;
  }

  addUpdateUser(): void {
    const payload: any = { ...this.auAppValue };
    if (this.data.app_title === 'Update') {
      delete payload.password;
      payload.id = this.data.payload.id;
      payload.modified_by = this.adminService.getUsername();
    } else if (this.data.app_title === 'Change Password') {
      if (payload.new_password_1 === payload.new_password_2) {
        payload.password = payload.new_password_1;
        payload.id = this.data.payload.id;
        payload.modified_by = this.adminService.getUsername();
        this.ispasswordValid = false; 
      }
      else {    
        this.ispasswordValid = true;          
      } 
    } else {
      payload.created_by = this.adminService.getUsername();
      payload.modified_by = this.adminService.getUsername();
    }
    if(!this.ispasswordValid){
      this.mdDialogRef.close(payload);
    }
    
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
