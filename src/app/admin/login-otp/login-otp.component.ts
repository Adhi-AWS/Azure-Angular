import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { SnackBarService } from './../../services/snackbar.service';
import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-admin-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss'],
})
export class LoginOtpComponent implements OnInit {
  @ViewChild('cd', { static: false })
  private countdown!: CountdownComponent;

  @Input() emailID: any;

  otpCharLength: any = 4;

  loading: boolean = false;
  submitted = false;
  showAlert = false;
  count: number = 0;
  alertMsg: { type: any; timeout: number; msg: any } = {
    type: null,
    timeout: 0,
    msg: null,
  };

  otpSend: boolean = false;
  resendbtn: boolean = false;
  isOtpSend: boolean = false;
  timeconfig = {};
  otpValue: any = null;
  registerUserDetail: any = '';
  otpValidated: any;
  authenticated: any;

  returnUrl: string = '';
  maskedEmail: any;
  maskedMobile: any = '';
  maxCountError = false;
  siteAdminServicePath = {
    sendOtp: 'siteadmin-auth-svc/access/v1.0/sendloginOtp',
    validateOtp: 'siteadmin-auth-svc/access/v1.0/validateOtp',
    resendOtp: 'siteadmin-auth-svc/access/v1.0/resendOtp',
    postLogin: '/orchestration',
  };
  userType: any;
  otpTimer: any = '';

  constructor(
    private router: Router,
    private commonService: CommonService,
    private snackbarService: SnackBarService
  ) {
    this.returnUrl = this.siteAdminServicePath.postLogin;
  }

  ngOnInit(): void {
    this.count = 0;
    this.emailID = localStorage.getItem('emailAdminLogin');
    this.sendOtp();
  }

  // on OTP enter
  keyUpOtpInput(e: any): void {
    this.otpValue = e;
  }

  // send OTP to email
  sendOtp(): void {
    if (this.emailID) {
      this.otpSend = false;
      this.isOtpSend = false;
      this.commonService
        .postAPI(this.siteAdminServicePath.sendOtp, {})
        .subscribe(
          (res) => {
            this.otpSend = true;
            let minute: any = res.timeout / 60;
            let second: any = res.timeout % 60;
            if (minute < 10) {
              minute = `0${minute}`;
            }
            if (second < 10) {
              second = `0${second}`;
            }
            this.otpTimer =
              second !== '00'
                ? `${minute} minute:${second} second`
                : `${minute} minute`;
            this.maskedEmail = res?.maskedEmail;
            this.maskedMobile = res?.maskedMobile;
            this.snackbarService.openSnackBar(res?.message, undefined, {
              duration: 4000,
            });
            this.startCountdown();
          },
          (err) => {
            this.resendbtn = true;
            this.otpSend = false;
            this.showAlertMsg('error', err);
          }
        );
    }
  }

  //validate OTP
  onSubmit(): void {
    if (this.otpValue) {
      const req = {
        otpValue: this.otpValue,
      };
      this.loading = true;
      this.commonService
        .postAPI(this.siteAdminServicePath.validateOtp, req)
        .subscribe(
          (res) => {
            if (res) {
              this.loading = false;
              this.submitted = false;
              this.snackbarService.openSnackBar(res, undefined, {
                duration: 4000,
              });
              this.router.navigateByUrl(this.returnUrl);
            }
          },
          (err) => {
            this.showAlertMsg('error', err);
          }
        );
    }
  }

  //Resend OTP
  resendOtp(): void {
    this.resendbtn = false;
    if (this.count <= 3) {
      this.commonService.getAPI(this.siteAdminServicePath.resendOtp).subscribe(
        (res) => {
          this.snackbarService.openSnackBar(res, undefined, { duration: 4000 });
          this.startCountdown();
          this.otpValue = null;
        },
        (err) => {
          this.otpValue = null;
          this.resendbtn = true;
          this.showAlertMsg('error', err);
          this.snackbarService.openSnackBar(
            'Redirecting to login. ' + err,
            undefined,
            { duration: 4000 }
          );
          this.router.navigateByUrl('/admin/login');
        }
      );
    } else {
      this.showAlertMsg('error', 'Maximum number of resends has been done');
      this.maxCountError = true;
      // setTimeout(() => {
      //   this.router.navigateByUrl('/admin/login');
      // }, 6000);
    }
  }

  //count down call
  startCountdown(): void {
    if (this.count <= 3) {
      this.isOtpSend = true;
      this.timeconfig = { leftTime: 60, format: 'mm:ss' };
      this.count += 1;
      // setTimeout(() => this.countdown.restart());
      if (this.countdown) {
        this.countdown.restart();
      }
    }
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/admin/login');
  }

  handleEvent(event: any): void {
    if (event.left === 0) {
      this.resendbtn = true;
      this.isOtpSend = false;
    }
  }

  showAlertMsg(type: any, msg: any): void {
    this.showAlert = true;
    this.alertMsg = {
      type,
      timeout: 4000,
      msg,
    };
  }

  onAlertBoxClosed(): void {
    this.showAlert = false;
  }

  clearControl(control: any): void {
    control.setValue('');
  }
}
