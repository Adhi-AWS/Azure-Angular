import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageCredentialsService } from 'src/app/services/manage-credentials.service';
import { AddUpdateCredentialDialogComponent } from './add-update-credential-dialog/add-update-credential-dialog.component';

@Component({
  selector: 'app-manage-credentials',
  templateUrl: './manage-credentials.component.html',
  styleUrls: ['./manage-credentials.component.scss'],
})
export class ManageCredentialsComponent implements OnInit {
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
      colRefName: 'username',
      colDisplayName: 'Username',
      isAnchorLink: false,
    },
    {
      colRefName: 'password',
      colDisplayName: 'Password',
      isAnchorLink: false,
    },
    {
      colRefName: 'ssh_key',
      colDisplayName: 'SSH Key',
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
    private manageCredentialsService: ManageCredentialsService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.fetchCredentialsData();
  }

  fetchCredentialsData(): void {
    this.manageCredentialsService.getCredentials().subscribe(
      (response: any) => {
        if (response && response.length) {
          this.manageCredentialsData = [...response];
        } else {
          this.manageCredentialsData = [];
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError(
            'Manage Credentials',
            error
          );
        }
      }
    );
  }

  onAddClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      AddUpdateCredentialDialogComponent,
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
          .addUpdateCredential({ ...payload })
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
      AddUpdateCredentialDialogComponent,
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
          .addUpdateCredential({ ...payload })
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
