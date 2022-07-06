import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';

@Component({
  selector: 'app-app-add-update-report-dialog',
  templateUrl: './app-add-update-report-dialog.component.html',
  styleUrls: ['./app-add-update-report-dialog.component.scss']
})
export class AppAddUpdateReportDialogComponent implements OnInit {

  addUpdateForm: FormGroup = new FormGroup({
    description: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.description : '',
      Validators.required
    ),
    report_url: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.report_url : '',
      Validators.required
    ),
    name: new FormControl(
      this.data.app_title === 'Update'  ? this.data.payload.name : '',
      Validators.required
    ),       
    
  });
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AppAddUpdateReportDialogComponent>,
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
          this.data.payload.name !== this.auAppValue.name ||
          this.data.payload.report_url !== this.auAppValue.report_url ||
          this.data.payload.description !== this.auAppValue.description)
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

  addUpdateReport(): void {
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
