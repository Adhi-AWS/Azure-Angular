import { Component, HostListener, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-system-configuration-dialog',
  templateUrl: './update-system-configuration-dialog.component.html',
  styleUrls: ['./update-system-configuration-dialog.component.scss'],
})
export class UpdateSystemConfigurationDialogComponent  {
  updateForm: FormGroup = new FormGroup({
    key: new FormControl(this.data.key, Validators.required),
    value: new FormControl(this.data.value, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<UpdateSystemConfigurationDialogComponent>,
    private adminService: AdminService
  ) {}

  

  updateSystemConfiguration(): void {
    this.mdDialogRef.close({
      key: this.updateForm.value.key,
      value: this.updateForm.value.value,
      modified_by: this.adminService.getUsername(),
    });
  }

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }
}
