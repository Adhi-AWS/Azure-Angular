import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  urlSafe: any;
  apiUrl: string = '';
  reportList: any = [];

  constructor(public sanitizer: DomSanitizer,private reportsService : ReportsService) { }

  ngOnInit(): void {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.apiUrl);
    this.reportsService.getAllMonitoringReports().subscribe((response:any)=>{
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
