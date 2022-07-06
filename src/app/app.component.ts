import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import { AdminService } from './services/admin.service';
import { AppService } from './services/app.service';
import { CustomMatIconService } from './services/custom-mat-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private bnIdle: BnNgIdleService,
    private adminService: AdminService,
    private customMatIconService: CustomMatIconService,
    private appService: AppService
  ) {
    this.customMatIconService.registerIcons();
  }

  ngOnInit(): void {
    this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.adminService.clearSession();
        this.router.navigateByUrl('/error/401');
      }
    });
    this.appService.getAdapters().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.appService.setCloudProviderList([...response.data]);
        }
      },
      (error: any) => {}
    );
  
  }
}
