import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManageApplicationsService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getApplicationDetailsByPagination(
    page_no: number = 1,
    per_page: number = 5
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/application?source=All&page_no=${page_no}&per_page=${per_page}`
    );
  }
  getApplicationDetails(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/application?source=All`
    );
  }

  addUpdateApplication(app_payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/application`, app_payload);
  }

  deleteApplication(id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/application?id=${id}&modified_by=${modified_by}`
    );
  }
}
