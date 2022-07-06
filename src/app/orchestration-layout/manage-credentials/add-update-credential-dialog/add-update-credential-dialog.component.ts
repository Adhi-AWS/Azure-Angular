import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-update-credential-dialog',
  templateUrl: './add-update-credential-dialog.component.html',
  styleUrls: ['./add-update-credential-dialog.component.scss'],
})
export class AddUpdateCredentialDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    name: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.name : '',
      Validators.required
    ),
    description: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.description : '',
      Validators.required
    ),
    username: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.username : '',
      Validators.required
    ),
    password: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.password : '',
      Validators.required
    ),
    ssh_key: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.ssh_key : '',
      Validators.required
    ),
  });

  password_hidden: boolean = true;

  isValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateCredentialDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.cred_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.cred_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.name !== this.auCredValue.name ||
          this.data.payload.description !== this.auCredValue.description ||
          this.data.payload.username !== this.auCredValue.username ||
          this.data.payload.password !== this.auCredValue.password ||
          this.data.payload.ssh_key !== this.auCredValue.ssh_key)
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get auCredValue(): any {
    return this.addUpdateForm.value;
  }

  togglePasswordHidden(): void {
    this.password_hidden = !this.password_hidden;
  }

  addUpdateCredential(): void {
    const payload: any = { ...this.auCredValue };
    if (this.data.cred_title === 'Update') {
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
