import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManageCredentialsService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getCredentials(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}dashUI/credentials`);
  }

  addUpdateCredential(cred_payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/credentials`, cred_payload);
  }

  deleteCredential(cred_id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/credentials?cred_id=${cred_id}&modified_by=${modified_by}`
    );
  }
}
