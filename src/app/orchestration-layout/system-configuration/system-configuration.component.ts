import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { SystemConfigurationService } from 'src/app/services/system-configuration.service';
import { UpdateSystemConfigurationDialogComponent } from './update-system-configuration-dialog/update-system-configuration-dialog.component';

@Component({
  selector: 'app-system-configuration',
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.scss'],
})
export class SystemConfigurationComponent implements OnInit {
  systemConfigurationColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: false,
    },
    {
      colRefName: 'key',
      colDisplayName: 'Key',
      isAnchorLink: false,
    },
    {
      colRefName: 'value',
      colDisplayName: 'Value',
      isAnchorLink: false,
    },
    {
      colRefName: 'created_date',
      colDisplayName: 'Created Date',
      isAnchorLink: false,
    },
    {
      colRefName: 'actions',
      colDisplayName: 'Actions',
      isAnchorLink: false,
    },
  ];

  systemConfigurationData: any = null;

  constructor(
    private dialog: MatDialog,
    private systemConfigurationService: SystemConfigurationService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.getSystemConfiguration();
  }

  getSystemConfiguration(): void {
    this.systemConfigurationService.getSystemConfigurationData().subscribe(
      (response: any) => {
        if (response && response.length) {
          this.systemConfigurationData = [...response];
        } else {
          this.systemConfigurationData = [];
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError(
            'System Configuration',
            error
          );
        }
      }
    );
  }

  onEditClick(event: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(
      UpdateSystemConfigurationDialogComponent,
      {
        width: '50%',
        data: { ...event },
      }
    );
    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.systemConfigurationService
          .updateSystemConfiguration(payload)
          .subscribe(
            (response: any) => {
              this.alertService.showMessage(
                'Update System Configuration',
                `Updated ${payload.key} successfully.`,
                true,
                {
                  callback: () => {
                    this.getSystemConfiguration();
                    return true;
                  },
                }
              );
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Update System Configuration',
                  error
                );
              }
            }
          );
      }
    });
  }
}
