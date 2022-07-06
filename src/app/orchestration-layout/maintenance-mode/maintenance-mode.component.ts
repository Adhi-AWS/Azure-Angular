import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { MaintenanceModeService } from 'src/app/services/maintenance-mode.service';
import { UpdateMaintenanceDialogComponent } from './update-maintenance-dialog/update-maintenance-dialog.component';

@Component({
  selector: 'app-maintenance-mode',
  templateUrl: './maintenance-mode.component.html',
  styleUrls: ['./maintenance-mode.component.scss'],
})
export class MaintenanceModeComponent implements OnInit {
  maintenanceModeColumns: any[] = [
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

  maintenanceModeData: any = null;

  constructor(
    private dialog: MatDialog,
    private maintenanceModeService: MaintenanceModeService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  ngOnInit(): void {
    this.getMaintenance();
  }

  getMaintenance(): void {
    this.maintenanceModeService.getMaintenanceData().subscribe(
      (response: any) => {
        if (response && response.length) {
          this.maintenanceModeData = [...response];
        } else {
          this.maintenanceModeData = [];
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError('Maintenance Mode', error);
        }
      }
    );
  }

  onEditClick(event: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(UpdateMaintenanceDialogComponent, {
      width: '50%',
      data: { ...event },
    });
    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {
        this.maintenanceModeService
          .updateApplication(payload.flag_value)
          .subscribe(
            (response: any) => {
              this.alertService.showMessage(
                'Update Maintenance Mode',
                `Updated ${payload.key} successfully.`,
                true,
                {
                  callback: () => {
                    this.getMaintenance();
                    return true;
                  },
                }
              );
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                this.errorManagementService.handleApiError(
                  'Update Maintenance Mode',
                  error
                );
              }
            }
          );
      }
    });
  }
}
