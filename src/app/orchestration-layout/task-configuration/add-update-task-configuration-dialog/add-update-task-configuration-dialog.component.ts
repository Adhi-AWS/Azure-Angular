import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-update-task-configuration-dialog',
  templateUrl: './add-update-task-configuration-dialog.component.html',
  styleUrls: ['./add-update-task-configuration-dialog.component.scss'],
})
export class AddUpdateTaskConfigurationDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    cloud_provider: new FormControl(
      this.data.config_title === 'Update'
        ? this.data.payload.cloud_provider
        : '',
      Validators.required
    ),
    task_name: new FormControl(
      this.data.config_title === 'Update' ? this.data.payload.task_name : '',
      Validators.required
    ),
    default_values: new FormControl(
      this.data.config_title === 'Update'
        ? this.data.payload.default_values
        : '',
      Validators.required
    ),
  });

  isValid: boolean = false;

  cloud_provider_list: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateTaskConfigurationDialogComponent>,
    private adminService: AdminService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.cloud_provider_list = [
      ...this.appService.cloud_providers_list.value,
      { cloud_provider: 'saas', screen_name: 'Software as a Service' },
    ];

    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.config_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.config_title === 'Update' &&
        this.addUpdateForm.valid &&
        this.data.payload.default_values !==
          this.addUpdateTaskConfigurationValue.default_values
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get addUpdateTaskConfigurationValue(): any {
    return this.addUpdateForm.value;
  }

  addUpdateTaskConfiguration(): void {
    let default_values = null;
    try {
      default_values = JSON.parse(
        this.addUpdateTaskConfigurationValue.default_values
      );
    } catch (error) {
      default_values = {};
    }

    const payload: any = {
      default_values: default_values,
    };

    if (this.data.config_title === 'Update') {
      payload.cloud_provider = this.data.payload.cloud_provider;
      payload.task_name = this.data.payload.task_name;
      payload.modified_by = this.adminService.getUsername();
    } else {
      payload.cloud_provider =
        this.addUpdateTaskConfigurationValue.cloud_provider;
      payload.task_name = this.addUpdateTaskConfigurationValue.task_name;
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
