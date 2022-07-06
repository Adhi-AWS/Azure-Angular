import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { ErrorManagementService } from 'src/app/services/error-management.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-admin-login-new',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent  {
  loginForm: FormGroup = new FormGroup({
    email_id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  password_hidden: boolean = true;
  isHtcLogin: boolean = false;
  commonLogin: boolean = true;
  apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private appService: AppService,
    private encryptDecryptService: EncryptDecryptService,
    private alertService: AlertService,
    private errorManagementService: ErrorManagementService
  ) {}

  

  login(): void {
    const formValue: any = this.loginForm.value;
    const redirectUrl = this.adminService.redirectUrlAfterLogin.value;

    /*if (environment.environmentName === 'dev') {
      sessionStorage.setItem(
        'user_authenticated',
        JSON.stringify({ user: formValue.email_id })
      );

      if (redirectUrl) {
        this.router.navigateByUrl(redirectUrl);
      } else {
        this.router.navigateByUrl('/orchestration');
      }
      return;
    }*/

    const payload: any = {
      username: formValue.email_id,
      /*password: this.encryptDecryptService.encrypt(
        'hN5w8cHOcE5iazBkZtLSCcUkt-30ftOX6iDdjyr3H9c=',
        formValue.password
      ),*/
      password: formValue.password,
    };
    
    this.adminService.authenticateUser(payload).subscribe(
      (response: any) => {
        if (response && response.email_verified && response.name) {
          sessionStorage.setItem(
            'user_authenticated',
            JSON.stringify({ user: payload.username })
          );
          sessionStorage.setItem(
            'display_name',
            JSON.stringify({ display_name: response.name })
          );
          sessionStorage.setItem(
            'isChampLogin', 'true'
          );
          if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigateByUrl('/orchestration');
          }
        } else {
          this.alertService.showMessage(
            'User Authentication',
            'Unable to authenticate this user. Please check your Email ID and Password.',
            false
          );
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.errorManagementService.handleApiError(
            'User Authentication',
            error
          );
        }
      }
    );

    this.adminService.getLicense().subscribe(
      (response: any) => {
        if (response) {
          sessionStorage.setItem(
            'license_expiry_days',
            JSON.stringify({ license_expiry_days: response.expiry_days })
          );
        }
      },
      (error: any) => {}
    );

     this.appService.getProducts().subscribe(
      (response: any) => {
        if (response) {
          this.appService.setproductCategoryList([...response]);
        }
      },
      (error: any) => {}
    );

    this.appService.getAdapters().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.appService.setCloudProviderList([...response.data]);
        }
      },
      (error: any) => {}
    );
  }
  cancel(){
    this.commonLogin =true;
    this.isHtcLogin =false;
  }

  loginActiveDirectory(loginType:string):void{
    if(loginType ==='champ'){
      this.commonLogin =false;
      this.isHtcLogin =true;
    }else  if(loginType ==='google'){
    //this google condition is temporary only for POC, will be removed
      window.location.href = `https://interactivedevops.com:8082/latest/sso/login?provider=${loginType}`      
    }else{
      window.location.href = `${this.apiUrl}sso/login?provider=${loginType}`      
    }

  }

  clearControl(control: any): void {
    control.setValue('');
  }

  togglePasswordHidden(): void {
    this.password_hidden = !this.password_hidden;
  }
}
