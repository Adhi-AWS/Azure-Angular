import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';

@Component({
  selector: 'app-app-add-update-oauth-dialog',
  templateUrl: './app-add-update-oauth-dialog.component.html',
  styleUrls: ['./app-add-update-oauth-dialog.component.scss']
})
export class AppAddUpdateOauthDialogComponent implements OnInit {

  addUpdateForm: FormGroup = new FormGroup({
    provider: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.provider : '',
      Validators.required
    ),
    client_id: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.client_id : '',
      Validators.required
    ),
    client_secret: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.client_secret : '',
      Validators.required
    ),
    config_url: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.config_url : '',
      Validators.required
    ),
    app_home_url: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.app_home_url : '',
      Validators.required
    ),
    app_error_url: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.app_error_url : '',
      Validators.required
    ),    
    

  });
  isValid: boolean = true;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AppAddUpdateOauthDialogComponent>,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.app_title === 'Add'&& this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        (this.data.app_title === 'Update') &&
        this.addUpdateForm.valid &&
        (
          this.data.payload.provider !== this.auAppValue.provider ||
          this.data.payload.client_id !== this.auAppValue.client_id ||
          this.data.payload.client_secret !== this.auAppValue.client_secret ||
          this.data.payload.config_url !== this.auAppValue.config_url ||
          this.data.payload.app_home_url !== this.auAppValue.app_home_url ||
          this.data.payload.app_error_url !== this.auAppValue.app_error_url)
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

  addUpdateOauth(): void {
    const payload: any = { ...this.auAppValue };
    if (this.data.app_title === 'Update') {
      payload.id = this.data.payload.id;
      payload.modified_by = this.adminService.getUsername();
    } else {
      payload.created_by = this.adminService.getUsername();
      payload.modified_by = this.adminService.getUsername();
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
