import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SetupExecutionPlanService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getDropdownList(name: string, cloud_provider: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}dashUI/dropdowns?name=${name}&cloud_provider=${cloud_provider}`
    );
  }

  getPlan(cloud_provider: string, task_name: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/plan?cloud_provider=${cloud_provider}&task_name=${task_name}`
    );
  }

  addPlan(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/plan`, payload);
  }

  updatePlan(name: string, payload: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}dashUI/update?name=${name}`,
      payload
    );
  }

  deletePlan(
    plan_id: number,
    delete_code: boolean,
    modified_by: string
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/plan?plan_id=${plan_id}&delete_code=${delete_code}&modified_by=${modified_by}`
    );
  }

  getCode(cloud_provider: string, task_name: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/code?cloud_provider=${cloud_provider}&task_name=${task_name}`
    );
  }

  updateCode(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/code`, payload);
  }

  deleteCode(code_id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/code?code_id=${code_id}&modified_by=${modified_by}`
    );
  }
}
