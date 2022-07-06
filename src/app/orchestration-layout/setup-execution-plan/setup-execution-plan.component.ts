import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { SetupExecutionPlanService } from 'src/app/services/setup-execution-plan.service';
import { AutomationCodeComponent } from './automation-code/automation-code.component';
import { AutomationPlanComponent } from './automation-plan/automation-plan.component';

@Component({
  selector: 'app-setup-execution-plan',
  templateUrl: './setup-execution-plan.component.html',
  styleUrls: ['./setup-execution-plan.component.scss'],
})
export class SetupExecutionPlanComponent implements OnInit {
  cloud_provider: string = '';
  cloud_provider_list: any[] = [];
  filtered_cloud_provider_list: any[] = [];
  cp_input: string = '';

  task_name: string = '';
  task_name_list: string[] = [];
  filtered_task_name_list: string[] = [];
  tn_input: string = '';

  showClonePlan: boolean = false;

  @ViewChild(AutomationPlanComponent) plan: AutomationPlanComponent | undefined;
  @ViewChild(AutomationCodeComponent) code: AutomationCodeComponent | undefined;

  constructor(
    private appService: AppService,
    private setupExecutionPlanService: SetupExecutionPlanService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.cloud_provider_list = [...this.appService.cloud_providers_list.value];
    this.filtered_cloud_provider_list = [...this.cloud_provider_list];
  }

  onSearch(field_name: string): void {
    if (field_name === 'cloud_provider') {
      this.filtered_cloud_provider_list = [];

      const filterValue: string = this.cp_input.toLowerCase().trim();
      if (!filterValue) {
        this.filtered_cloud_provider_list = [...this.cloud_provider_list];
      } else {
        this.cloud_provider_list.forEach((item: any) => {
          if (item.cloud_provider.toLowerCase().indexOf(filterValue) >= 0) {
            this.filtered_cloud_provider_list.push(item);
          }
        });
      }
    } else {
      this.filtered_task_name_list = [];

      let filterValue: string = this.tn_input.toLowerCase().trim();
      if (!filterValue) {
        this.filtered_task_name_list = [...this.task_name_list];
      } else {
        this.task_name_list.forEach((item: string) => {
          if (item.toLowerCase().indexOf(filterValue) >= 0) {
            this.filtered_task_name_list.push(item);
          }
        });
      }
    }
  }

  getTaskNameList(): void {
    this.task_name = '';
    this.fetchData();

    this.setupExecutionPlanService
      .getDropdownList('task_name', this.cloud_provider)
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.task_name_list = [...response];
            this.filtered_task_name_list = [...this.task_name_list];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Tasks', error);
          }
        }
      );
  }

  dropDownClosed(): void {
    this.cp_input = '';
    this.filtered_cloud_provider_list = [...this.cloud_provider_list];
    this.tn_input = '';
    this.filtered_task_name_list = [...this.task_name_list];
  }

  fetchData(): void {
    if (this.plan) {
      this.plan.getExecutionPlan(this.cloud_provider, this.task_name);

      if (this.cloud_provider && this.task_name) {
        this.showClonePlan = true;
      } else {
        this.showClonePlan = false;
      }
    }

    if (this.code) {
      this.code.getExecutionCode(this.cloud_provider, this.task_name);
    }
  }

  onAddClick(): void {
    if (this.plan) {
      this.plan.onAddClick();
    }
  }

  onClonePlanClick(): void {
    if (this.plan) {
      this.plan.onCloneClick();
    }
  }

  refreshData(event: any): void {
    this.cloud_provider = event.cloud_provider;
    this.task_name = event.task_name;
    if (this.cloud_provider) {
      this.getTaskNameList();
    }
    this.fetchData();
  }

  onClonePlanSuccess(event: any): void {
    this.cloud_provider = event.cloud_provider;
    this.task_name = event.task_name;

    if (this.code) {
      this.code.cloneCode(this.cloud_provider, this.task_name);
    }
  }
}
