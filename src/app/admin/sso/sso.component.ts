import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-footer',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.scss']
})
export class SSOComponent implements OnInit {

  response: any;
  urlParams: any;
  email: any;
  username: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
        this.email = params['email'];
        this.username = params['name'] ;
        if (this.email && this.username) {
          sessionStorage.setItem(
            'user_authenticated',
            JSON.stringify({ user:  this.email })
          );
          sessionStorage.setItem(
            'display_name',
            JSON.stringify({ display_name: this.username })
          );
          this.router.navigateByUrl('/orchestration');
		    }
		    else {
		      this.router.navigateByUrl('/admin/login');
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
  }
}
