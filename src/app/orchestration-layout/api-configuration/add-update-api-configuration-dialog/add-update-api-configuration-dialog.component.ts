import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-update-api-configuration-dialog',
  templateUrl: './add-update-api-configuration-dialog.component.html',
  styleUrls: ['./add-update-api-configuration-dialog.component.scss'],
})
export class AddUpdateApiConfigurationDialogComponent implements OnInit {
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
    application_name: new FormControl(
      this.data.config_title === 'Update'
        ? this.data.payload.application_name
        : '',
      Validators.required
    ),
    request_url: new FormControl(
      this.data.config_title === 'Update' ? this.data.payload.request_url : '',
      Validators.required
    ),
    callback_url: new FormControl(
      this.data.config_title === 'Update' ? this.data.payload.callback_url : '',
      Validators.required
    ),
    method: new FormControl(
      this.data.config_title === 'Update' ? this.data.payload.method : '',
      Validators.required
    ),
    headers: new FormControl(
      this.data.config_title === 'Update' ? this.data.payload.headers : '',
      Validators.required
    ),
    request_parameters: new FormControl(
      this.data.config_title === 'Update'
        ? this.data.payload.request_parameters
        : '',
      Validators.required
    ),
    credentials: new FormControl(
      this.data.config_title === 'Update' ? this.data.payload.credentials : '',
      Validators.required
    ),
    request_parameters_map: new FormControl(
      this.data.config_title === 'Update'
        ? this.data.payload.request_parameters_map
        : '',
      Validators.required
    ),
    response_parameters_map: new FormControl(
      this.data.config_title === 'Update'
        ? this.data.payload.response_parameters_map
        : '',
      Validators.required
    ),
  });

  isValid: boolean = false;

  cloud_provider_list: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdateApiConfigurationDialogComponent>,
    private adminService: AdminService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.cloud_provider_list = [...this.appService.cloud_providers_list.value];

    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.config_title === 'Add') {
        if (
          this.addUpdateTaskConfigurationValue.application_name &&
          this.addUpdateTaskConfigurationValue.request_url &&
          this.addUpdateTaskConfigurationValue.callback_url &&
          this.addUpdateTaskConfigurationValue.method &&
          this.addUpdateTaskConfigurationValue.headers &&
          this.addUpdateTaskConfigurationValue.request_parameters &&
          this.addUpdateTaskConfigurationValue.request_parameters_map &&
          this.addUpdateTaskConfigurationValue.response_parameters_map
        ) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
      } else if (
        this.data.config_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.application_name !==
          this.addUpdateTaskConfigurationValue.application_name ||
          this.data.payload.request_url !==
            this.addUpdateTaskConfigurationValue.request_url ||
          this.data.payload.callback_url !==
            this.addUpdateTaskConfigurationValue.callback_url ||
          this.data.payload.method !==
            this.addUpdateTaskConfigurationValue.method ||
          this.data.payload.headers !==
            this.addUpdateTaskConfigurationValue.headers ||
          this.data.payload.credentials !==
            this.addUpdateTaskConfigurationValue.credentials ||
          this.data.payload.request_parameters !==
            this.addUpdateTaskConfigurationValue.request_parameters ||
          this.data.payload.request_parameters_map !==
            this.addUpdateTaskConfigurationValue.request_parameters_map ||
          this.data.payload.response_parameters_map !==
            this.addUpdateTaskConfigurationValue.response_parameters_map)
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
    let headers = null;
    try {
      headers = JSON.parse(this.addUpdateTaskConfigurationValue.headers);
    } catch (error) {
      headers = {};
    }

    let request_parameters = null;
    try {
      request_parameters = JSON.parse(
        this.addUpdateTaskConfigurationValue.request_parameters
      );
    } catch (error) {
      request_parameters = {};
    }

    let request_parameters_map = null;
    try {
      request_parameters_map = JSON.parse(
        this.addUpdateTaskConfigurationValue.request_parameters_map
      );
    } catch (error) {
      request_parameters_map = {};
    }

    let response_parameters_map = null;
    try {
      response_parameters_map = JSON.parse(
        this.addUpdateTaskConfigurationValue.response_parameters_map
      );
    } catch (error) {
      response_parameters_map = {};
    }

    const payload: any = {
      headers: headers,
      request_parameters: request_parameters,
      request_parameters_map: request_parameters_map,
      response_parameters_map: response_parameters_map,
    };

    payload.application_name =
      this.addUpdateTaskConfigurationValue.application_name;
    payload.request_url = this.addUpdateTaskConfigurationValue.request_url;
    payload.callback_url = this.addUpdateTaskConfigurationValue.callback_url;
    payload.method = this.addUpdateTaskConfigurationValue.method;
    payload.credentials = this.addUpdateTaskConfigurationValue.credentials;

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
