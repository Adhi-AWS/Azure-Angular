import { Component, HostListener, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { ManageQueueService } from 'src/app/services/manage-queue.service';

@Component({
  selector: 'app-add-adapter-dialog',
  templateUrl: './add-adapter-dialog.component.html',
  styleUrls: ['./add-adapter-dialog.component.scss'],
})
export class AddAdapterDialogComponent  {
  addAdapterForm: FormGroup = new FormGroup({
    cloud_provider: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddAdapterDialogComponent>,
    private adminService: AdminService
  ) {}

  

  get addAdapterValue(): any {
    return this.addAdapterForm.value;
  }

  addAdapter(): void {
    const payload: any = {
      data: [],
      created_by: this.adminService.getUsername(),
    };

    payload.data.push({ cloud_provider: this.addAdapterValue.cloud_provider });

    this.mdDialogRef.close(payload);
  }

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }
}
