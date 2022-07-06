import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class MenuBarDataResolver implements Resolve<any> {
  constructor(private appService:AppService,private adminService:AdminService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Observable<any> {
    return forkJoin(this.appService.getProducts(),this.adminService.isAdmin());
  }
}
