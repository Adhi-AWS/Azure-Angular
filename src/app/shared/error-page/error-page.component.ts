import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-error-page-admin',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  errorCode: string = '';
  errorObj: any;
  errorConfig: any = {
    '404': {
      heading: 'Oops!',
      msg: 'Something went wrong. Try again later.',
      btnText: 'Go to Login',
      redirectURL: '/',
    },
    '401': {
      heading: 'Session Timeout',
      msg: 'We are sorry for inconvenience, but session timeout was added for Security reasons to ensure your data is protected.',
      btnText: 'Login',
      redirectURL: '/admin/login',
    },
    '403': {
      heading: 'Whoops',
      msg: 'This url is valid but you are not authorised for this content.',
      btnText: 'Go to Login',
      redirectURL: '/',
    },
    'no-menu': {
      heading: 'Whoops',
      msg: 'You do not have access to any Menu/Feature. Please contact Administrator',
      btnText: 'Go to Dashboard',
      redirectURL: '',
    },
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
    this.route.params.subscribe((params) => {
      this.errorCode = params['errorCode'];
      if (!this.errorCode) {
        this.errorCode = '404';
      }
      this.errorObj = this.errorConfig[this.errorCode];
    });
  }

  ngOnInit(): void {
    if (this.errorCode === '401') {
      setTimeout(() => {
        // this.logout();
      }, 1000);
    }
  }

  goBack(): void {
    window.history.back();
  }

  logout(): void {
    this.adminService.clearSession();
    this.router.navigateByUrl('/admin/login');
  }
}
