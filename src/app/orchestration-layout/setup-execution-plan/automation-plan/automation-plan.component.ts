import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { SetupExecutionPlanService } from 'src/app/services/setup-execution-plan.service';
import { AddUpdatePlanDialogComponent } from './add-update-plan-dialog/add-update-plan-dialog.component';

@Component({
  selector: 'app-automation-plan',
  templateUrl: './automation-plan.component.html',
  styleUrls: ['./automation-plan.component.scss'],
})
export class AutomationPlanComponent  {
  @Output() refreshSetupExecution = new EventEmitter();
  @Output() clonedPlanDetails = new EventEmitter();

  planData: any = {};

  cloud_provider: string = '';
  task_name: string = '';

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private setupExecutionPlanService: SetupExecutionPlanService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  

  getExecutionPlan(cloud_provider: string, task_name: string): void {
    this.cloud_provider = cloud_provider;
    this.task_name = task_name;
    this.planData = null;

    if (cloud_provider && task_name) {
      this.setupExecutionPlanService
        .getPlan(cloud_provider, task_name)
        .subscribe(
          (response: any) => {
            if (response && response.id) {
              this.planData = { ...response };
            }
          },
          (error: any) => {
            this.planData = {};
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Execution Plan',
                error
              );
            }
          }
        );
    } else {
      this.planData = {};
    }
  }

  onDeleteClick(): void {
    this.alertService.showConfirmation(
      'Delete Plan',
      'Do you really want to delete this plan?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.setupExecutionPlanService
              .deletePlan(
                this.planData.id,
                true,
                this.adminService.getUsername()
              )
              .subscribe(
                (response: any) => {
                  this.alertService.showMessage(
                    'Delete Plan',
                    `Deleted a plan id: ${this.planData.id} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.refreshSetupExecution.emit({
                          cloud_provider: '',
                          task_name: '',
                        });
                        return true;
                      },
                    }
                  );
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete Plan',
                      error
                    );
                  }
                }
              );
          }
          return true;
        },
      }
    );
  }

  onCloneClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddUpdatePlanDialogComponent, {
      width: '50%',
      data: {
        plan_title: 'Clone',
        payload: {
          execution_plan: JSON.stringify(
            this.planData.execution_plan,
            undefined,
            4
          ),
          cloud_provider: this.planData.cloud_provider,
          name: this.task_name,
          input_schema: JSON.stringify({}, undefined, 4),
        },
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.setupExecutionPlanService.addPlan({ ...payload }).subscribe(
          (response: any) => {
            if (response && response.id) {
              this.alertService.showMessage(
                'Clone Plan',
                `Cloned a plan id: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.clonedPlanDetails.emit({
                      cloud_provider: response.cloud_provider,
                      task_name: response.task[0].task_name,
                    });
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError('Clone Plan', error);
            }
          }
        );
      }
    });
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddUpdatePlanDialogComponent, {
      width: '50%',
      data: {
        plan_title: 'Add',
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.setupExecutionPlanService.addPlan({ ...payload }).subscribe(
          (response: any) => {
            if (
              response &&
              response.id &&
              response.task &&
              response.task.length
            ) {
              this.alertService.showMessage(
                'Add Plan',
                `Added a plan id: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.refreshSetupExecution.emit({
                      cloud_provider: response.cloud_provider,
                      task_name: response.task[0].task_name,
                    });
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError('Add Plan', error);
            }
          }
        );
      }
    });
  }

  onEditClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddUpdatePlanDialogComponent, {
      width: '50%',
      data: {
        plan_title: 'Update',
        payload: {
          id: this.planData.id,
          execution_plan: JSON.stringify(
            this.planData.execution_plan,
            undefined,
            4
          ),
          created_by: this.planData.created_by,
          modified_by: this.planData.modified_by,
          cloud_provider: this.planData.cloud_provider,
          name: this.task_name,
          input_schema: JSON.stringify({}, undefined, 4),
        },
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.setupExecutionPlanService
          .updatePlan('plan', { ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Update Plan',
                  `Updated a plan id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.refreshSetupExecution.emit({
                        cloud_provider: this.cloud_provider,
                        task_name: this.task_name,
                      });
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Update Plan',
                  error
                );
              }
            }
          );
      }
    });
  }
}
