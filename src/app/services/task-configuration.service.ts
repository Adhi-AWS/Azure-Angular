import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskConfigurationService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getDropDownList(name: string, cloud_provider: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/dropdowns_task_config?name=${name}&cloud_provider=${cloud_provider}`
    );
  }

  getTaskConfiguration(
    cloud_provider: string,
    task_name: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/task_config?cloud_provider=${cloud_provider}&task_name=${task_name}`
    );
  }

  addUpdateTaskConfiguration(
    cloud_provider: string,
    task_name: string,
    payload: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}dashUI/task_config?cloud_provider=${cloud_provider}&task_name=${task_name}`,
      payload
    );
  }

  deleteTaskConfiguration(
    cloud_provider: string,
    task_name: string
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/task_config?cloud_provider=${cloud_provider}&task_name=${task_name}`
    );
  }
}
