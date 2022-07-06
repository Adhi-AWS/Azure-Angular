import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SystemConfigurationService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getSystemConfigurationData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}admin/sys_config`);
  }

  updateSystemConfiguration(payload: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}admin/sys_config?key=${payload.key}&value=${payload.value}&modified_by=${payload.modified_by}`,
      null
    );
  }
}
