import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-license-detail',
  templateUrl: './license-detail.component.html',
  styleUrls: ['./license-detail.component.scss']
})
export class LicenseDetailComponent implements OnInit {

  licenseDetail:any;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getLicense().subscribe(
      (response: any) => {
       this.licenseDetail = response;
       if(this.licenseDetail.status){
        this.licenseDetail.status = 'Active';
       }else{
        this.licenseDetail.status = 'InActive';
       }
      },
      (error: any) => {}
    );
  }

}
