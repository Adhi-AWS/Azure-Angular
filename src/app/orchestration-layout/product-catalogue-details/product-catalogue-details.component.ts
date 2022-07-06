import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import JSONEditor from 'jsoneditor';
import { ProductCatalogueDetails } from 'src/app/models/product-catalogue.model';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ProductCatalogueService } from 'src/app/services/product-catalogue.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { JsonEditorDialogComponent } from 'src/app/shared/json-editor-dialog/json-editor-dialog.component';

@Component({
  selector: 'app-product-catalogue-details',
  templateUrl: './product-catalogue-details.component.html',
  styleUrls: ['./product-catalogue-details.component.scss'],
})
export class ProductCatalogueDetailsComponent implements OnInit {
  cloud_provider: string = '';
  task_name: string = '';
  adminFlag:boolean=false;

  productCatalogueDetails: any = null;

  @ViewChild('productCatalogueJsonEditor') jsonEditor: ElementRef | undefined;
  editor: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private adminService: AdminService,
    private transactionsService: TransactionsService,
    private productCatalogueService: ProductCatalogueService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {
    this.cloud_provider =
      this.route.snapshot.paramMap.get('cloud_provider') || '';
    this.task_name = this.route.snapshot.paramMap.get('task_name') || '';
  }

  ngOnInit(): void {
    this.fetchProductCatalogueDetails();
    this.adminService.isAdmin().subscribe((response)=>{
      this.adminFlag = response.is_admin;
   })
  }

  fetchProductCatalogueDetails(): void {
    this.productCatalogueDetails = null;

    this.productCatalogueService
      .getProductCatalogueDetails(
        this.cloud_provider === 'NA' ? '' : this.cloud_provider,
        this.task_name
      )
      .subscribe(
        (response: ProductCatalogueDetails) => {
          if (response && response.id) {
            this.productCatalogueDetails = { ...response };

            setTimeout(() => {
              this.editor = new JSONEditor(
                this.jsonEditor?.nativeElement,
                {
                  mode: 'code',
                },
                this.productCatalogueDetails.payload
              );
            });
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError(
              'Product Catalogue Details',
              error
            );
          }
        }
      );
  }

  onTestPayloadClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(JsonEditorDialogComponent, {
      minWidth: '50%',
      data: {
        jsonEditorTitle: this.productCatalogueDetails
          ? 'Update Test Payload'
          : 'Add Test Payload',
        description_field: true,
        description: this.productCatalogueDetails
          ? this.productCatalogueDetails.description
          : '',
        payload: this.productCatalogueDetails
          ? this.productCatalogueDetails.payload
          : {},
      },
    });

    dialogRef.afterClosed().subscribe((updatedTestPayload: any) => {
      if (updatedTestPayload) {
        const payload: any = {
          cloud_provider:
            this.cloud_provider === 'NA' ? '' : this.cloud_provider,
          task_name: this.task_name,
          description: updatedTestPayload.description,
          payload: updatedTestPayload.payload,
        };

        this.productCatalogueService.addOrUpdateTestPayload(payload).subscribe(
          (response: any) => {
            if (response && response.id) {
              this.alertService.showMessage(
                `${
                  this.productCatalogueDetails ? 'Update' : 'Add'
                } Test Payload Transaction ID: ${response.id} successfully.`,
                `${
                  this.productCatalogueDetails ? 'Updated' : 'Added'
                } Test Payload Transaction ID: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.fetchProductCatalogueDetails();
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Deploy Transaction',
                error
              );
            }
          }
        );
      }
    });
  }

  onDeployClick(): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const dialogRef: any = this.dialog.open(JsonEditorDialogComponent, {
      minWidth: '50%',
      data: {
        payload: this.productCatalogueDetails.payload,
      },
    });

    dialogRef.afterClosed().subscribe((updatedPayload: any) => {
      if (updatedPayload) {
        this.transactionsService.retryTransaction(updatedPayload).subscribe(
          (response: any) => {
            if (response && response.id && response.task_id) {
              this.alertService.showMessage(
                'Deploy Transaction',
                `Deployed a transaction id: ${response.id} successfully.`,
                true,
                {
                  callback: () => {
                    this.router.navigateByUrl(
                      `/orchestration/transactions/${response.task_id}`
                    );
                    return true;
                  },
                }
              );
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.errorManagementService.handleApiError(
                'Deploy Transaction',
                error
              );
            }
          }
        );
      }
    });
  }
}
