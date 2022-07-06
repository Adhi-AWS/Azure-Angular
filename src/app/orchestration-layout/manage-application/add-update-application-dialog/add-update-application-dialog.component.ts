import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-update-application-dialog',
  templateUrl: './add-update-application-dialog.component.html',
  styleUrls: ['./add-update-application-dialog.component.scss'],
})
export class AddUpdateApplicationDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    source: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.source : '',
      Validators.required
    ),
    description: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.description : '',
      Validators.required
    ),
    encryption_key: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.encryption_key : '',
      Validators.required
    ),
    encryption_iv: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.encryption_iv : '',
      Validators.required
    ),
    is_active: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.is_active : false,
      Validators.required
    ),
    secret_key: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.secret_key : '',
      Validators.required
    ),
    access_key: new FormControl(
      this.data.app_title === 'Update' ? this.data.payload.access_key : '',
      Validators.required
    ),
    channel: new FormControl(
      this.data.app_title === 'Update'
        ? JSON.stringify(this.data.payload.channel)
        : '',
      Validators.required
    ),
  });

  isValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateApplicationDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.app_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.app_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.source !== this.auAppValue.source ||
          this.data.payload.description !== this.auAppValue.description ||
          this.data.payload.encryption_key !== this.auAppValue.encryption_key ||
          this.data.payload.encryption_iv !== this.auAppValue.encryption_iv ||
          this.data.payload.is_active !== this.auAppValue.is_active ||
          this.data.payload.secret_key !== this.auAppValue.secret_key ||
          this.data.payload.access_key !== this.auAppValue.access_key ||
          JSON.stringify(this.data.payload.channel) !== this.auAppValue.channel)
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

  addUpdateApplication(): void {
    const payload: any = { ...this.auAppValue };

    let channel = null;
    try {
      channel = JSON.parse(this.auAppValue.channel);
    } catch (error) {
      channel = {};
    }
    payload.channel = channel;

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
