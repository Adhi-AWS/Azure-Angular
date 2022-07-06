import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceModeService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getMaintenanceData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}admin/dbconfig`);
  }

  updateApplication(flag_value: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}admin/maintenance?maintenance_flag=${flag_value}`,
      null
    );
  }
}
