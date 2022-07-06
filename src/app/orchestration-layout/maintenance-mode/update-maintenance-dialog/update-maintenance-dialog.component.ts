import { Component, HostListener, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-maintenance-dialog',
  templateUrl: './update-maintenance-dialog.component.html',
  styleUrls: ['./update-maintenance-dialog.component.scss'],
})
export class UpdateMaintenanceDialogComponent  {
  updateForm: FormGroup = new FormGroup({
    flag_value: new FormControl(
      this.data.value.toLowerCase(),
      Validators.required
    ),
  });

  flag_list: any[] = ['active', 'inactive'];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<UpdateMaintenanceDialogComponent>,
    private adminService: AdminService
  ) {}

  

  updateMaintenanceMode(): void {
    this.mdDialogRef.close({
      flag_value: this.updateForm.value.flag_value,
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
