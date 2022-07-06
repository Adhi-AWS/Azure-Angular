import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getDashboard(starttime: string, endtime: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}dashUI/dashboard?starttime=${starttime}&endtime=${endtime}`
      // 'http://ec2-13-126-48-120.ap-south-1.compute.amazonaws.com:8082/latest/dashUI/dashboard?starttime=2022-02-01%2000:00:00&endtime=2022-03-31%2023:59:59'
    );
  }
}
