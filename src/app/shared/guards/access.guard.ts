import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  adminAcess:boolean=false;
  constructor(private router: Router, private adminService: AdminService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      return  this.adminService.isAdminPromise().then((data:any) => {
          if(data.is_admin){
            return true;
          }else{
            this.router.navigateByUrl('/error/no-menu');
            return false;
          }
        })
        .catch((error: any)=> {
            console.log("Promise rejected with " + JSON.stringify(error));
            this.router.navigateByUrl('/error/404');
            return false;
          });
  }
  
}
