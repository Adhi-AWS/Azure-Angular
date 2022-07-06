import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { ManageCredentialsService } from 'src/app/services/manage-credentials.service';

@Component({
  selector: 'app-add-update-code-dialog',
  templateUrl: './add-update-code-dialog.component.html',
  styleUrls: ['./add-update-code-dialog.component.scss'],
})
export class AddUpdateCodeDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.task_name, Validators.required),
    repo_url: new FormControl(
      this.data.code_title === 'Update' ? this.data.payload.repo_url : '',
      Validators.required
    ),
    branch: new FormControl(
      this.data.code_title === 'Update' ? this.data.payload.branch : '',
      Validators.required
    ),
    cred_id: new FormControl(
      this.data.code_title === 'Update' ? this.data.payload.cred_id : '',
      Validators.required
    ),
    script_path: new FormControl(
      this.data.code_title === 'Update' ? this.data.payload.script_path : '',
      Validators.required
    ),
  });

  isValid: boolean = false;

  credentialsList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateCodeDialogComponent>,
    private manageCredentialsService: ManageCredentialsService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.addUpdateForm.controls.name.disable();

    this.manageCredentialsService.getCredentials().subscribe(
      (response: any) => {
        if (response && response.length) {
          this.credentialsList = [...response];
        } else {
          this.credentialsList = [];
        }
      },
      (error: any) => {}
    );

    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.code_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.code_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.repo_url !== this.updateCodeValue.repo_url ||
          this.data.payload.branch !== this.updateCodeValue.branch ||
          this.data.payload.cred_id !== this.updateCodeValue.cred_id ||
          this.data.payload.script_path !== this.updateCodeValue.script_path)
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get updateCodeValue(): any {
    return this.addUpdateForm.value;
  }

  addUpdateCode(): void {
    const payload: any = { ...this.updateCodeValue };
    payload.cloud_provider = this.data.cloud_provider;
    payload.name = this.data.task_name;
    if (this.data.code_title === 'Update') {
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
