import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigurationService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getDropDownList(name: string, cloud_provider: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/dropdowns_api_config?name=${name}&cloud_provider=${cloud_provider}`
    );
  }

  getApiConfiguration(
    application_name: string,
    cloud_provider: string,
    task_name: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/api_config?application_name=${application_name}&cloud_provider=${cloud_provider}&task_name=${task_name}`
    );
  }

  addUpdateApiConfiguration(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/api_config`, payload);
  }

  deleteApiConfiguration(
    cloud_provider: string,
    task_name: string
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/api_config?cloud_provider=${cloud_provider}&task_name=${task_name}`
    );
  }
}
