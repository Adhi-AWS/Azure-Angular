import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { CloudCredentialsService } from 'src/app/services/cloud-credentials.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.scss'],
})
export class ProductConfigComponent implements OnInit, OnChanges, OnDestroy {
  @Input() configData: any;
  @Output() backBtn = new EventEmitter<any>();
  @ViewChild('cloudCrendential', { static: true }) cloudCrendential: any;
  loadExternalAssets: boolean = true;
  jsonForm: any = {
    ui_layout: '',
  };
  cloud_provider: string = '';
  productConfig: FormGroup = new FormGroup({
    cloud_credentials: new FormControl('', Validators.required),
  });
  cloud_credentials: string = '';
  cloud_cred_list: any[] = [];
  filtered_cloud_cred_list: any[] = [];
  cp_input: string = '';
  // form:any =[
  //   "name",
  //   "email",
  //   {
  //     "key": "comment",
  //     "type": "textarea",
  //     "placeholder": "Make a comment"
  //   },
  //   {
  //     "type": "submit",
  //     "style": "md-cornered",
  //     "title": "OK"
  //   }
  // ];
  // schema:any = {
  //   "type": "object",
  //   "title": "Comment",
  //   "properties": {
  //     "name": {
  //       "title": "Name",
  //       "type": "string"
  //     },
  //     "email": {
  //       "title": "Email",
  //       "type": "string",
  //       "pattern": "^\\S+@\\S+$",
  //       "description": "Email will be used for evil."
  //     },
  //     "comment": {
  //       "title": "Comment",
  //       "type": "string",
  //       "maxLength": 20,
  //       "validationMessage": "Don't be greedy!"
  //     }
  //   },
  //   "required": [
  //     "name",
  //     "email",
  //     "comment"
  //   ]
  // };

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private dialog: MatDialog,
    private errorManagementService: ErrorManagementService,
    private cloudCredentialsService: CloudCredentialsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.cloud_provider = routeParams.cloud_provider;
    });
    this.cloudCredentialsService
      .getCloudCredentials(this.cloud_provider)
      .subscribe(
        (response: any) => {
          this.cloud_cred_list = [...response];
          this.filtered_cloud_cred_list = [...this.cloud_cred_list];
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorManagementService.handleApiError('Applications', error);
          }
        }
      );
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getConfigData();
  }
  getConfigData() {
    this.productService
      .getConfigData(this.configData.id)
      .subscribe((response: any) => {
        this.jsonForm = response[0];
      });
  }
  back(): void {
    this.backBtn.emit(true);
  }
  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
  // formChange(event:any):void{
  //  console.log("test");
  // }
  // submitForm(payload: any): void {console.log();}
  submitForm(payload: any): void {
    if (payload && this.cloud_credentials ) {
      this.addTagsDataAsObject(payload);
      this.setUsername(payload);
      payload['parameters']['cloud_credentials_id'] = this.cloud_credentials;
      this.productService.createTask(payload).subscribe(
        (response: any) => {
          if (response && response.id && response.task_id) {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            const dialogRef: any = this.dialog.open(ConfirmationComponent, {
              width: '398px',
              height: '309px',
              panelClass:'custom-dialog-container',
              disableClose: true,
              data: {
                confirmationMsg:
                  'Your order has been placed successfully<br><br>You can track the order now, click <a class="trackOrderLink" href=/orchestration/transactions/' +
                  response.task_id +
                  '>Track Order</a>',
              },
            });
            dialogRef.afterClosed().subscribe((value: any) => {
              this.back();
            });
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
  }
  addTagsDataAsObject(payload:any):void{
  if(payload.parameters.tags && payload.parameters.tags.length > 0 ){
    var obj:any = {}; //create the empty output object
    payload.parameters.tags.forEach( function(item:any){ 
    obj[item.key] = item.value ;  //assign the key and value to output obj
  });
    payload.parameters.tags = obj;
  }
  } 
  setUsername(payload: any): any {
    payload.created_by = this.adminService.getUsername();
  }
  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach((field) => {
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     }
  //   });
  // }

  // validateForm(event:any):void{
  //   console.log("test");
  // }
  // valisationError(event:any):void{
  //   console.log("test");
  // }
}
