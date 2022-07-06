import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { TaskConfigurationService } from 'src/app/services/task-configuration.service';
import { AddUpdateTaskConfigurationDialogComponent } from './add-update-task-configuration-dialog/add-update-task-configuration-dialog.component';

@Component({
  selector: 'app-task-configuration',
  templateUrl: './task-configuration.component.html',
  styleUrls: ['./task-configuration.component.scss'],
})
export class TaskConfigurationComponent implements OnInit {
  cloud_provider: string = '';
  cloud_provider_list: any[] = [];
  filtered_cloud_provider_list: any[] = [];
  cp_input: string = '';

  task_name: string = '';
  task_name_list: string[] = [];
  filtered_task_name_list: string[] = [];
  tn_input: string = '';

  task_configuration_data: any;

  constructor(
    private dialog: MatDialog,
    private taskConfigurationService: TaskConfigurationService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.taskConfigurationService
      .getDropDownList('cloud_provider', 'All')
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.cloud_provider_list = [...response];
            this.filtered_cloud_provider_list = [...this.cloud_provider_list];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Cloud Providers',
              error
            );
          }
        }
      );
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
    this.task_configuration_data = null;

    this.taskConfigurationService
      .getDropDownList('task_name', this.cloud_provider)
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

  fetchData(cloud_provider: string, task_name: string): void {
    this.task_configuration_data = null;

    this.cloud_provider = cloud_provider;
    this.task_name = task_name;

    this.taskConfigurationService
      .getTaskConfiguration(cloud_provider, task_name)
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.task_configuration_data = { ...response[0] };
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Task Configuration',
              error
            );
          }
        }
      );
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateTaskConfigurationDialogComponent,
      {
        width: '50%',
        data: {
          config_title: 'Add',
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.taskConfigurationService
          .addUpdateTaskConfiguration(
            payload.cloud_provider,
            payload.task_name,
            { ...payload.default_values }
          )
          .subscribe(
            (response: any) => {
              if (response) {
                this.alertService.showMessage(
                  'Add Task Configuration',
                  `Added configuration for Task Name ${response.cloud_provider} - ${response.task_name} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getTaskNameList();
                      setTimeout(() => {
                        this.fetchData(
                          payload.cloud_provider,
                          payload.task_name
                        );
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
                  'Add Task Configuration',
                  error
                );
              }
            }
          );
      }
    });
  }

  onEditClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateTaskConfigurationDialogComponent,
      {
        width: '50%',
        data: {
          config_title: 'Update',
          payload: {
            cloud_provider: this.task_configuration_data.cloud_provider,
            task_name: this.task_configuration_data.task_name,
            default_values: JSON.stringify(
              this.task_configuration_data.default_values,
              undefined,
              4
            ),
          },
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.taskConfigurationService
          .addUpdateTaskConfiguration(
            payload.cloud_provider,
            payload.task_name,
            { ...payload.default_values }
          )
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Update Task Configuration',
                  `Updated configuration for Task Name ${response.cloud_provider} - ${response.task_name} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getTaskNameList();
                      setTimeout(() => {
                        this.fetchData(
                          payload.cloud_provider,
                          payload.task_name
                        );
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
                  'Update Task Configuration',
                  error
                );
              }
            }
          );
      }
    });
  }

  onDeleteClick(): void {
    this.alertService.showConfirmation(
      'Delete Task Configuration',
      'Do you really want to delete this Task Configuration?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.taskConfigurationService
              .deleteTaskConfiguration(
                this.task_configuration_data.cloud_provider,
                this.task_configuration_data.task_name
              )
              .subscribe(
                (response: any) => {
                  this.alertService.showMessage(
                    'Delete Task Configuration',
                    `Deleted a Task Configuration id: ${this.task_configuration_data.id} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.getTaskNameList();
                        setTimeout(() => {
                          this.fetchData('', '');
                        });
                        return true;
                      },
                    }
                  );
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete Task Configuration',
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
}
