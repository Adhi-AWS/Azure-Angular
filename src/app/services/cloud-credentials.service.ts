import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CloudCredentialsService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  cloud_credentials_list = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getCloudCredentials(cloud_provider: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/cloudcred?cloud_provider=${cloud_provider}`
    );
  }
  setCloudCredentialsList(data: any): void {
    this.cloud_credentials_list.next(data);
  }

  addUpdateCloudCredential(cred_payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/cloudcred`, cred_payload);
  }

  deleteCredential(cred_id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/cloudcred?cloud_cred_id=${cred_id}&modified_by=${modified_by}`
    );
  }
}
