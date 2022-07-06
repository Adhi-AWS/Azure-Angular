import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { ApiConfigurationService } from 'src/app/services/api-configuration.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageApplicationsService } from 'src/app/services/manage-applications.service';
import { AddUpdateApiConfigurationDialogComponent } from './add-update-api-configuration-dialog/add-update-api-configuration-dialog.component';

@Component({
  selector: 'app-api-configuration',
  templateUrl: './api-configuration.component.html',
  styleUrls: ['./api-configuration.component.scss'],
})
export class ApiConfigurationComponent implements OnInit {
  application_name: string = '';
  application_name_list: any[] = [];
  filtered_application_name_list: any[] = [];
  an_input: string = '';

  cloud_provider: string = '';
  cloud_provider_list: any[] = [];
  filtered_cloud_provider_list: any[] = [];
  cp_input: string = '';

  task_name: string = '';
  task_name_list: string[] = [];
  filtered_task_name_list: string[] = [];
  tn_input: string = '';

  api_configuration_data: any;

  constructor(
    private dialog: MatDialog,
    private apiConfigurationService: ApiConfigurationService,
    private manageApplicationsService: ManageApplicationsService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.manageApplicationsService
      .getApplicationDetailsByPagination(1, 10000)
      .subscribe(
        (response: any) => {
          if (response && response.total && response.data) {
            this.application_name_list = [...response.data];
            this.filtered_application_name_list = [
              ...this.application_name_list,
            ];
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Applications', error);
          }
        }
      );

    this.apiConfigurationService
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
    if (field_name === 'application_name') {
      this.filtered_application_name_list = [];

      const filterValue: string = this.an_input.toLowerCase().trim();
      if (!filterValue) {
        this.filtered_application_name_list = [...this.application_name_list];
      } else {
        this.application_name_list.forEach((item: any) => {
          if (item.source.toLowerCase().indexOf(filterValue) >= 0) {
            this.filtered_application_name_list.push(item);
          }
        });
      }
    } else if (field_name === 'cloud_provider') {
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
    this.api_configuration_data = null;

    this.apiConfigurationService
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
    this.an_input = '';
    this.filtered_application_name_list = [...this.application_name_list];
    this.cp_input = '';
    this.filtered_cloud_provider_list = [...this.cloud_provider_list];
    this.tn_input = '';
    this.filtered_task_name_list = [...this.task_name_list];
  }

  fetchData(
    application_name: string,
    cloud_provider: string,
    task_name: string
  ): void {
    this.api_configuration_data = null;

    this.application_name = application_name;
    this.cloud_provider = cloud_provider;
    this.task_name = task_name;

    this.apiConfigurationService
      .getApiConfiguration(application_name, cloud_provider, task_name)
      .subscribe(
        (response: any) => {
          if (response && response.length) {
            this.api_configuration_data = { ...response[0] };
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'API Configuration',
              error
            );
          }
        }
      );
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateApiConfigurationDialogComponent,
      {
        width: '50%',
        data: {
          config_title: 'Add',
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.apiConfigurationService
          .addUpdateApiConfiguration({ ...payload })
          .subscribe(
            (response: any) => {
              if (response) {
                this.alertService.showMessage(
                  'Add API Configuration',
                  `Added API configuration for Task Name ${response.cloud_provider} - ${response.task_name} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getTaskNameList();
                      setTimeout(() => {
                        this.fetchData(
                          payload.application_name,
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
                  'Add API Configuration',
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
      AddUpdateApiConfigurationDialogComponent,
      {
        width: '50%',
        data: {
          config_title: 'Update',
          payload: {
            ...this.api_configuration_data,
            headers: JSON.stringify(
              this.api_configuration_data.headers,
              undefined,
              4
            ),
            request_parameters: JSON.stringify(
              this.api_configuration_data.request_parameters,
              undefined,
              4
            ),
            request_parameters_map: JSON.stringify(
              this.api_configuration_data.request_parameters_map,
              undefined,
              4
            ),
            response_parameters_map: JSON.stringify(
              this.api_configuration_data.response_parameters_map,
              undefined,
              4
            ),
          },
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.apiConfigurationService
          .addUpdateApiConfiguration({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Update API Configuration',
                  `Updated API Configuration for Task Name ${response.cloud_provider} - ${response.task_name} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.getTaskNameList();
                      setTimeout(() => {
                        this.fetchData(
                          payload.application_name,
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
                  'Update API Configuration',
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
      'Delete API Configuration',
      'Do you really want to delete this API Configuration?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.apiConfigurationService
              .deleteApiConfiguration(
                this.api_configuration_data.cloud_provider,
                this.api_configuration_data.task_name
              )
              .subscribe(
                (response: any) => {
                  this.alertService.showMessage(
                    'Delete API Configuration',
                    `Deleted a API Configuration id: ${this.api_configuration_data.id} successfully.`,
                    true,
                    {
                      callback: () => {
                        this.getTaskNameList();
                        setTimeout(() => {
                          this.fetchData('', '', '');
                        });
                        return true;
                      },
                    }
                  );
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete API Configuration',
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
