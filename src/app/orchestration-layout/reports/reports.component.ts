import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  urlSafe: any;
  apiUrl: string = '';
  reportList: any = [];

  constructor(public sanitizer: DomSanitizer,private reportsService : ReportsService) { }

  ngOnInit(): void {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.apiUrl);
    this.reportsService.getAllReports().subscribe((response:any)=>{
         this.reportList = response;
    })
  }

  selectReport(event:any){
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(event.report_url+"&output=embed");
    console.log(this.apiUrl);
  }
   
  resizeIframe(obj:any){
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
}
