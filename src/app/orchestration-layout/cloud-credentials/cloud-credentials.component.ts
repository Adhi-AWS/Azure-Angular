import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { CloudCredentialsService } from 'src/app/services/cloud-credentials.service';
import { AddUpdateCloudCredentialDialogComponent } from './add-update-credential-dialog/add-update-credential-dialog.component';

@Component({
  selector: 'app-cloud-credentials',
  templateUrl: './cloud-credentials.component.html',
  styleUrls: ['./cloud-credentials.component.scss'],
})
export class CloudCredentialsComponent implements OnInit {
  manageCredentialsColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: false,
    },
    {
      colRefName: 'name',
      colDisplayName: 'Name',
      isAnchorLink: false,
    },
    {
      colRefName: 'description',
      colDisplayName: 'Description',
      isAnchorLink: false,
    },
    {
      colRefName: 'source',
      colDisplayName: 'Source',
      isAnchorLink: false,
    },
    {
      colRefName: 'cloud_provider',
      colDisplayName: 'Cloud Provider',
      isAnchorLink: false,
    },
    {
      colRefName: 'credentials',
      colDisplayName: 'Credentials',
      isAnchorLink: false,
    },
    {
      colRefName: 'actions',
      colDisplayName: 'Actions',
      isAnchorLink: false,
    },
  ];

  manageCredentialsData: any = null;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private manageCredentialsService: CloudCredentialsService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.fetchCredentialsData();
  }

  fetchCredentialsData(): void {
    this.manageCredentialsService.getCloudCredentials('All').subscribe(
      (response: any) => {
        if (response.data && response.data.length) {
          this.manageCredentialsData = [...response.data];
        } else {
          this.manageCredentialsData = [];
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError(
            'Cloud Credentials',
            error
          );
        }
      }
    );
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateCloudCredentialDialogComponent,
      {
        width: '50%',
        data: {
          cred_title: 'Add',
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageCredentialsService
          .addUpdateCloudCredential({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Add Credential',
                  `Added a credential id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.fetchCredentialsData();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Add Credential',
                  error
                );
              }
            }
          );
      }
    });
  }

  onEditClick(event: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateCloudCredentialDialogComponent,
      {
        width: '50%',
        data: {
          cred_title: 'Update',
          payload: { ...event },
        },
      }
    );

    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.manageCredentialsService
          .addUpdateCloudCredential({ ...payload })
          .subscribe(
            (response: any) => {
              if (response && response.id) {
                this.alertService.showMessage(
                  'Update Credential',
                  `Updated a credential id: ${response.id} successfully.`,
                  true,
                  {
                    callback: () => {
                      this.fetchCredentialsData();
                      return true;
                    },
                  }
                );
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Update Credential',
                  error
                );
              }
            }
          );
      }
    });
  }

  onDeleteClick(event: any): void {
    this.alertService.showConfirmation(
      'Delete Credential',
      'Do you really want to delete this credential?',
      {
        callback: (value: boolean) => {
          if (value) {
            this.manageCredentialsService
              .deleteCredential(event.id, this.adminService.getUsername())
              .subscribe(
                (response: any) => {
                  if (response && response.length && response[0].id) {
                    this.alertService.showMessage(
                      'Delete Credential',
                      `Deleted a credential id: ${response[0].id} successfully.`,
                      true,
                      {
                        callback: () => {
                          this.fetchCredentialsData();
                          return true;
                        },
                      }
                    );
                  }
                },
                (error: any) => {
                  if (error instanceof HttpErrorResponse) {
                    this.errorManagementService.handleApiError(
                      'Delete Credential',
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
