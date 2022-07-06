import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageReportService } from 'src/app/services/manage-report-service';
import { AppAddUpdateReportDialogComponent } from './app-add-update-report-dialog/app-add-update-report-dialog.component';
import { AppViewReportDialogComponent } from './app-view-report-dialog/app-view-report-dialog.component';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.scss']
})
export class ManageReportComponent  {

  manageApplicationColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: true,
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
      colRefName: 'report_url',
      colDisplayName: 'Report Url',
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

  manageReportData: any = null;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  isvalid: any = false;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private ManageReportService: ManageReportService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) { }

  
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngAfterViewInit(): void {
     if (this.paginator) {
       this.paginator.pageSize = 10;
       this.paginator.pageIndex = 0;
       this.paginator.length = 0;
       this.getManageReport();
     }
   }

   getManageReport(): void {
     this.ManageReportService
       .getReportDetailsByPagination(
         this.paginator ? this.paginator.pageIndex + 1 : 1,
         this.paginator ? this.paginator.pageSize : 5
       )
       .subscribe(
         (response: any) => {
           console.log("response",response);
           if (response && response.length) {
             this.manageReportData = [...response];
             if (this.paginator) {
               this.paginator.length = response.length;
             }
           } else {
             this.manageReportData = [];
             if (this.paginator) {
               this.paginator.length = 0;
               this.paginator.pageIndex = 0;
             }
           }
         },
         (error: any) => {
           if (error instanceof HttpErrorResponse) {
             this.errorManagementService.handleApiError(
               'Manage Report',
               error
             );
           }
         }
       );
   }

   onPageEvent(event: PageEvent): void {
     this.getManageReport();
   }

   openApplicationDetailsDialog(event: any): void {
     // eslint-disable-next-line security/detect-non-literal-fs-filename
     this.dialog.open(AppViewReportDialogComponent, {
       width: '50%',
       data: { ...event },
     });
   }

   onAddClick(): void {
     // eslint-disable-next-line security/detect-non-literal-fs-filename
     const dialogRef: any = this.dialog.open(
      AppAddUpdateReportDialogComponent,
       {
         width: '50%',
         data: {
           app_title: 'Add',
         },
       }
     );

     dialogRef.afterClosed().subscribe((payload: any) => {
       if (payload) {
         this.ManageReportService
           .addUpdateReport({ ...payload })
           .subscribe(
             (response: any) => {
               if (response && response.id) {
                 this.alertService.showMessage(
                   'Add Report',
                   `Added an report id: ${response.id} successfully.`,
                   true,
                   {
                     callback: () => {
                       this.getManageReport();
                       return true;
                     },
                   }
                 );
               }
             },
             (error: any) => {
               if (error instanceof HttpErrorResponse) {
                 this.errorManagementService.handleApiError(
                   'Add Report',
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
       AppAddUpdateReportDialogComponent,
       {
         width: '50%',
         data: {
           app_title: 'Update',
           payload: { ...event },
         },
       }
     );

     dialogRef.afterClosed().subscribe((payload: any) => {
       if (payload) {
         this.ManageReportService
           .addUpdateReport({ ...payload })
           .subscribe(
             (response: any) => {
               if (response && response.id) {
                 this.alertService.showMessage(
                   'Update Report',
                   `Updated an report id: ${response.id} successfully.`,
                   true,
                   {
                     callback: () => {
                       this.getManageReport();
                       return true;
                     },
                   }
                 );
               }
             },
             (error: any) => {
               if (error instanceof HttpErrorResponse) {
                 this.errorManagementService.handleApiError(
                   'Update Report',
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
       'Delete Report',
       'Do you really want to delete this report?',
       {
         callback: (value: boolean) => {
           if (value) {
             this.ManageReportService
               .deleteReport(event.id, this.adminService.getUsername())
               .subscribe(
                 (response: any) => {
                   if (response && response.length && response[0].id) {
                     this.alertService.showMessage(
                       'Delete Report',
                       `Deleted an report id: ${response[0].id} successfully.`,
                       true,
                       {
                         callback: () => {
                           this.getManageReport();
                           return true;
                         },
                       }
                     );
                   }
                 },
                 (error: any) => {
                   if (error instanceof HttpErrorResponse) {
                     this.errorManagementService.handleApiError(
                       'Delete Report',
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
