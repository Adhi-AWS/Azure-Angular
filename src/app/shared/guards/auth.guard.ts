import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  menuList: any;

  constructor(private router: Router, private adminService: AdminService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.adminService.getUsername();

    if (['/admin/', '/admin/login'].includes(state.url)) {
      if (user) {
        this.adminService.setRedirectUrlAfterLogin('');
        this.router.navigateByUrl('/orchestration');
      }
    } else {
      if (!user) {
        if (state.url !== '/error/401' && state.url !== '/error/no-menu') {
          this.adminService.setRedirectUrlAfterLogin(state.url);
          this.router.navigateByUrl('/admin/login');
        }
      } else {
        this.adminService.setRedirectUrlAfterLogin('');
      }
    }

    return true;
  }
}
