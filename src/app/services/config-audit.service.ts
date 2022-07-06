import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigAuditService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getConfigAudit(
    operation_name: string,
    config_name: string,
    page_no: number = 1,
    per_page: number = 5
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/config_audit?operation_name=${operation_name}&config_name=${config_name}&page_no=${page_no}&per_page=${per_page}`
    );
  }
}
