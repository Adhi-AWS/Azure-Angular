import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) { }

  getAllReports(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}reports/report?report_type=reports`
    );
  }
  getAllMonitoringReports(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}reports/report?report_type=monitoring`
    );
  }
}
