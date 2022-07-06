import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-update-queue-dialog',
  templateUrl: './add-update-queue-dialog.component.html',
  styleUrls: ['./add-update-queue-dialog.component.scss'],
})
export class AddUpdateQueueDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    queue_name: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.queue_name : '',
      Validators.required
    ),
    exchange_key: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.exchange_key : '',
      Validators.required
    ),
    is_default: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.is_default : false,
      Validators.required
    ),
  });

  isValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateQueueDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.app_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.app_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.queue_name !== this.auQueueValue.queue_name ||
          this.data.payload.exchange_key !== this.auQueueValue.exchange_key ||
          this.data.payload.is_default !== this.auQueueValue.is_default)
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get auQueueValue(): any {
    return this.addUpdateForm.value;
  }

  addUpdateQueue(): void {
    const payload: any = { ...this.auQueueValue };

    payload.cloudorch_processor_id = null;

    if (this.data.app_title === 'Update') {
      payload.id = this.data.payload.id;
      payload.modified_by = this.adminService.getUsername();
    } else {
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
