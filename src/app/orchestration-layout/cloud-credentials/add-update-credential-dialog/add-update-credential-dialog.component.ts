import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';
import { ManageApplicationsService } from 'src/app/services/manage-applications.service';

@Component({
  selector: 'app-add-update-credential-dialog',
  templateUrl: './add-update-credential-dialog.component.html',
  styleUrls: ['./add-update-credential-dialog.component.scss'],
})
export class AddUpdateCloudCredentialDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    name: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.name : '',
      Validators.required
    ),
    description: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.description : '',
      Validators.required
    ),
    source: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.source : '',
      Validators.required
    ),
    cloud_provider: new FormControl(
      this.data.cred_title === 'Update' ? this.data.payload.cloud_provider : '',
      Validators.required
    ),
    credentials: new FormControl(
      this.data.cred_title === 'Update'
        ? JSON.stringify(this.data.payload.credentials)
        : '',
      Validators.required
    ),
  });

  password_hidden: boolean = true;

  isValid: boolean = false;
  cloudProvideList: any = [];
  sourceList: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateCloudCredentialDialogComponent>,
    private adminService: AdminService,
    private manageApplicationsService: ManageApplicationsService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.appService.cloud_providers_list.value.forEach((item: any) => {
      this.cloudProvideList.push(item.cloud_provider);
    });
    this.manageApplicationsService
      .getApplicationDetails()
      .subscribe((item: any) => {
        item.data.forEach((dataItem: any) => {
          this.sourceList.push(dataItem.source);
        });
      });
    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.cred_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.cred_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.name !== this.auCredValue.name ||
          this.data.payload.description !== this.auCredValue.description ||
          this.data.payload.source !== this.auCredValue.source ||
          this.data.payload.cloud_provider !==
            this.auCredValue.cloud_provider ||
          JSON.stringify(this.data.payload.credentials) !==
            this.auCredValue.credentials)
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

  addUpdateCredential(): void {
    const payload: any = { ...this.addUpdateForm.value };
    let credentials = null;
    try {
      credentials = JSON.parse(payload.credentials);
    } catch (error) {
      credentials = {};
    }
    payload.credentials = credentials;

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
