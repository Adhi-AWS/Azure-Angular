import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManageUserService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getUserDetailsByPagination(
    page_no: number = 1,
    per_page: number = 5
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/user?source=All&page_no=${page_no}&per_page=${per_page}`
    );
  }

  addUpdateUser(app_payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/user`, app_payload);
  }

  deleteUser(id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/user?user_id=${id}&modified_by=${modified_by}`
    );
  }

  getUserInRole( page_no: number = 1,
    per_page: number = 5): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/userinrole?userrole_id=All&page_no=${page_no}&per_page=${per_page}`
    );
  }
  
  addUpdateUserInRole(app_payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/userinrole`, app_payload);
  }

  getRole( page_no: number = 1,
    per_page: number = 5): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/role?role_id=All&page_no=${page_no}&per_page=${per_page}`
    );
  }

  deleteUserRole(id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/userinrole?userinrole_id=${id}&modified_by=${modified_by}`
    );
  }

}
