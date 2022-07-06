import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ManageOauthService } from 'src/app/services/manage-oauth-service';
import { AppAddUpdateOauthDialogComponent } from './app-add-update-oauth-dialog/app-add-update-oauth-dialog.component';
import { AppViewOauthDialogComponent } from './app-view-oauth-dialog/app-view-oauth-dialog.component';

@Component({
  selector: 'app-manage-oauth',
  templateUrl: './manage-oauth.component.html',
  styleUrls: ['./manage-oauth.component.scss']
})
export class ManageOauthComponent  {

  manageApplicationColumns: any[] = [
    {
      colRefName: 'id',
      colDisplayName: 'ID',
      isAnchorLink: true,
    },
    {
      colRefName: 'provider',
      colDisplayName: 'Provider',
      isAnchorLink: false,
    },
    {
      colRefName: 'client_id',
      colDisplayName: 'Client Id',
      isAnchorLink: false,
    },
    {
      colRefName: 'client_secret',
      colDisplayName: 'Client Secret',
      isAnchorLink: false,
    },
    {
      colRefName: 'config_url',
      colDisplayName: 'Config Url',
      isAnchorLink: false,
    },
    {
      colRefName: 'app_home_url',
      colDisplayName: 'Home Url',
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

  manageOauthData: any = null;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  isvalid: any = false;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private ManageOauthService: ManageOauthService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
   ) { }

   
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngAfterViewInit(): void {
     if (this.paginator) {
       this.paginator.pageSize = 10;
       this.paginator.pageIndex = 0;
       this.paginator.length = 0;
       this.getManageOauth();
     }
   }

   getManageOauth(): void {
     this.ManageOauthService
       .getOauthDetailsByPagination(
         this.paginator ? this.paginator.pageIndex + 1 : 1,
         this.paginator ? this.paginator.pageSize : 5
       )
       .subscribe(
         (response: any) => {
           if (response && response.length) {
             this.manageOauthData = [...response];
             if (this.paginator) {
               this.paginator.length = response.length;
             }
           } else {
             this.manageOauthData = [];
             if (this.paginator) {
               this.paginator.length = 0;
               this.paginator.pageIndex = 0;
             }
           }
         },
         (error: any) => {
           if (error instanceof HttpErrorResponse) {
             this.errorManagementService.handleApiError(
               'Manage Oauth',
               error
             );
           }
         }
       );
   }

   onPageEvent(event: PageEvent): void {
     this.getManageOauth();
   }

   openApplicationDetailsDialog(event: any): void {
     // eslint-disable-next-line security/detect-non-literal-fs-filename
     this.dialog.open(AppViewOauthDialogComponent, {
       width: '50%',
       data: { ...event },
     });
   }

   onAddClick(): void {
     // eslint-disable-next-line security/detect-non-literal-fs-filename
     const dialogRef: any = this.dialog.open(
      AppAddUpdateOauthDialogComponent,
       {
         width: '50%',
         data: {
           app_title: 'Add',
         },
       }
     );

     dialogRef.afterClosed().subscribe((payload: any) => {
       if (payload) {
         this.ManageOauthService
           .addUpdateOauth({ ...payload })
           .subscribe(
             (response: any) => {
               if (response && response.id) {
                 this.alertService.showMessage(
                   'Add Oauth',
                   `Added an oauth id: ${response.id} successfully.`,
                   true,
                   {
                     callback: () => {
                       this.getManageOauth();
                       return true;
                     },
                   }
                 );
               }
             },
             (error: any) => {
               if (error instanceof HttpErrorResponse) {
                 this.errorManagementService.handleApiError(
                   'Add Oauth',
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
       AppAddUpdateOauthDialogComponent,
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
         this.ManageOauthService
           .addUpdateOauth({ ...payload })
           .subscribe(
             (response: any) => {
               if (response && response.id) {
                 this.alertService.showMessage(
                   'Update Oauth',
                   `Updated an oauth id: ${response.id} successfully.`,
                   true,
                   {
                     callback: () => {
                       this.getManageOauth();
                       return true;
                     },
                   }
                 );
               }
             },
             (error: any) => {
               if (error instanceof HttpErrorResponse) {
                 this.errorManagementService.handleApiError(
                   'Update Oauth',
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
       'Delete Oauth',
       'Do you really want to delete this oauth?',
       {
         callback: (value: boolean) => {
           if (value) {
             this.ManageOauthService
               .deleteOauth(event.id, this.adminService.getUsername())
               .subscribe(
                 (response: any) => {
                   if (response && response.length && response[0].id) {
                     this.alertService.showMessage(
                       'Delete Oauth',
                       `Deleted an oauth id: ${response[0].id} successfully.`,
                       true,
                       {
                         callback: () => {
                           this.getManageOauth();
                           return true;
                         },
                       }
                     );
                   }
                 },
                 (error: any) => {
                   if (error instanceof HttpErrorResponse) {
                     this.errorManagementService.handleApiError(
                       'Delete User',
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
