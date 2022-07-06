import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { LicenseDetailComponent } from './license-detail/license-detail.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent  {
  constructor(private router: Router,
     private adminService: AdminService,
     private dialog: MatDialog) {}

  logout(): void {
    this.adminService.clearSession();
    this.router.navigateByUrl('/admin/login');
  }

  getUserName(): string {
    return this.adminService.getUsername();
  }
  getDisplayname(): string {
    return this.adminService.getDisplayname();
  }
  getLicenseExpiryDays(): string {
    return this.adminService.getLicenseExpiryDays();
  }
  showLicenseDetails() {
    
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const dialogRef: any = this.dialog.open(
        LicenseDetailComponent,
      {
        width: '50%'
      }
    );

  }
}
