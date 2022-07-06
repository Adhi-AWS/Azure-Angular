import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { SetupExecutionPlanService } from 'src/app/services/setup-execution-plan.service';
import { AddUpdateCodeDialogComponent } from './add-update-code-dialog/add-update-code-dialog.component';

@Component({
  selector: 'app-automation-code',
  templateUrl: './automation-code.component.html',
  styleUrls: ['./automation-code.component.scss'],
})
export class AutomationCodeComponent  {
  @Output() refreshSetupExecution = new EventEmitter();

  codeData: any = {};

  cloud_provider: string = '';
  task_name: string = '';

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private setupExecutionPlanService: SetupExecutionPlanService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  

  getExecutionCode(cloud_provider: string, task_name: string): void {
    this.codeData = null;
    this.cloud_provider = cloud_provider;
    this.task_name = task_name;

    if (cloud_provider && task_name) {
      this.setupExecutionPlanService
        .getCode(cloud_provider, task_name)
        .subscribe(
          (response: any) => {
            if (response && response.id) {
              const tmpData: any = {};
              for (const [key, value] of Object.entries(response)) {
                if (key !== 'cred_id') {
                  // eslint-disable-next-line security/detect-object-injection
                  tmpData[key] = value;
                } else {
                  // eslint-disable-next-line security/detect-object-injection
                  tmpData[key] = value;
                  tmpData['cred_name'] = response.credentials.name;
                }
              }
              this.codeData = { ...tmpData };
            }
          },
          (error: any) => {
            this.codeData = {};
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Execution Code',
                error
              );
            }
          }
        );
    }
  }

  cloneCode(cloud_provider: string, task_name: string): void {
    if (Object.keys(this.codeData).length) {
      const payload: any = {
        cloud_provider: cloud_provider,
        name: task_name,
        repo_url: this.codeData.repo_url,
        branch: this.codeData.branch,
        cred_id: this.codeData.cred_id,
        script_path: this.codeData.script_path,
        created_by: this.adminService.getUsername(),
      };

      this.setupExecutionPlanService.updateCode({ ...payload }).subscribe(
        (response: any) => {
          if (response && response.id) {
            this.alertService.showMessage(
              'Clone Code',
              `Cloned a code: ${response.id} successfully.`,
              true,
              {
                callback: () => {
                  this.refreshSetupExecution.emit({
                    cloud_provider: payload.cloud_provider,
                    task_name: payload.name,
                  });
                  return true;
                },
              }
            );
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Add Code', error);
          }
        }
      );
    } else {
      this.refreshSetupExecution.emit({
        cloud_provider: cloud_provider,
        task_name: name,
      });
    }
  }

  onDeleteClick(): void {
    this.alertService.showConfirmation(
      'Delete Code',
      'Do you really want to delete this code?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.setupExecutionPlanService
              .deleteCode(this.codeData.id, this.adminService.getUsername())
              .subscribe(
                (response: any) => {
                  if (response && response.length && response[0].id) {
                    this.codeData = {};
                    this.alertService.showMessage(
                      'Delete Code',
                      `Deleted a code: ${response[0].id} successfully.`,
                      true
                    );
                  }
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete Code',
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

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddUpdateCodeDialogComponent, {
      width: '50%',
      data: {
        code_title: 'Add',
        cloud_provider: this.cloud_provider,
        task_name: this.task_name,
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.setupExecutionPlanService.updateCode({ ...payload }).subscribe(
          (response: any) => {
            if (response && response.id) {
              this.alertService.showMessage(
                'Add Code',
                `Added a code: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.refreshSetupExecution.emit({
                      cloud_provider: payload.cloud_provider,
                      task_name: payload.name,
                    });
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError('Add Code', error);
            }
          }
        );
      }
    });
  }

  onEditClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(AddUpdateCodeDialogComponent, {
      width: '50%',
      data: {
        code_title: 'Update',
        cloud_provider: this.cloud_provider,
        task_name: this.task_name,
        payload: { ...this.codeData },
      },
    });

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.setupExecutionPlanService.updateCode({ ...payload }).subscribe(
          (response: any) => {
            if (response && response.id) {
              this.alertService.showMessage(
                'Update Code',
                `Updated a code id: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.refreshSetupExecution.emit({
                      cloud_provider: payload.cloud_provider,
                      task_name: payload.name,
                    });
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError('Update Code', error);
            }
          }
        );
      }
    });
  }
}
