import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-update-plan-dialog',
  templateUrl: './add-update-plan-dialog.component.html',
  styleUrls: ['./add-update-plan-dialog.component.scss'],
})
export class AddUpdatePlanDialogComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    name: new FormControl(
      this.data.plan_title === 'Update' || this.data.plan_title === 'Clone'
        ? this.data.payload.name
        : '',
      Validators.required
    ),
    cloud_provider: new FormControl(
      this.data.plan_title === 'Update' || this.data.plan_title === 'Clone'
        ? this.data.payload.cloud_provider
        : '',
      Validators.required
    ),
    execution_plan: new FormControl(
      this.data.plan_title === 'Update' || this.data.plan_title === 'Clone'
        ? this.data.payload.execution_plan
        : '',
      Validators.required
    ),
  });

  isValid: boolean = false;

  cloud_provider_list: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddUpdatePlanDialogComponent>,
    private adminService: AdminService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.cloud_provider_list = [...this.appService.cloud_providers_list.value];

    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.plan_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.plan_title === 'Update' &&
        this.addUpdateForm.valid &&
        this.data.payload.execution_plan !==
          this.addUpdatePlanValue.execution_plan
      ) {
        this.isValid = true;
      } else if (
        this.data.plan_title === 'Clone' &&
        this.addUpdateForm.valid &&
        (this.data.payload.name !== this.addUpdatePlanValue.name ||
          this.data.payload.cloud_provider !==
            this.addUpdatePlanValue.cloud_provider ||
          this.data.payload.execution_plan !==
            this.addUpdatePlanValue.execution_plan)
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get addUpdatePlanValue(): any {
    return this.addUpdateForm.value;
  }

  addUpdatePlan(): void {
    let execution_plan = null;
    try {
      execution_plan = JSON.parse(this.addUpdatePlanValue.execution_plan);
    } catch (error) {
      execution_plan = {};
    }

    const payload: any = {
      execution_plan: execution_plan,
    };

    if (this.data.plan_title === 'Clone') {
      payload.name = this.addUpdatePlanValue.name;
      payload.cloud_provider = this.addUpdatePlanValue.cloud_provider;
      payload.created_by = this.adminService.getUsername();
      payload.input_schema = {};
    } else if (this.data.plan_title === 'Update') {
      payload.id = this.data.payload.id;
      payload.cloud_provider = this.data.payload.cloud_provider;
      payload.modified_by = this.adminService.getUsername();
    } else {
      payload.name = this.addUpdatePlanValue.name;
      payload.cloud_provider = this.addUpdatePlanValue.cloud_provider;
      payload.created_by = this.adminService.getUsername();
      payload.input_schema = {};
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
