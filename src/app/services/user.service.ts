import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) { }

  getUserDetail(userName:any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/user?user_name=${userName}`
    );
  }
  updateUserDetail(payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/user`, payload);
  }
  changePassword(payload:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/user`, payload);
  }
}