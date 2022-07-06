import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  redirectUrlAfterLogin = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  authenticateUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}dashUI/authenticate`, payload);
  }

  authenticateSso(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}sso/login?provider=azure`);
  }

  getLicense(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}orchestrator/license`);
  }

  getLicenseExpiryDays(): string {
    const license_expiry_days = sessionStorage.getItem('license_expiry_days');
    return license_expiry_days ? JSON.parse(license_expiry_days).license_expiry_days : '';
  }

  getUsername(): string {
    const isUserAuthenticated = sessionStorage.getItem('user_authenticated');
    return isUserAuthenticated ? JSON.parse(isUserAuthenticated).user : '';
  }

  isAdmin(): Observable<any> {
    let username  = this.getUsername();
    return this.http.get<any>(`${this.apiUrl}dashUI/isadmin?username=${username}`);
  }

  isAdminPromise() {
    let username  = this.getUsername();
    return this.http
    .get(
        `${this.apiUrl}dashUI/isadmin?username=${username}`
      )
      .toPromise();
  }
  getDisplayname(): string {
    const isUserAuthenticated = sessionStorage.getItem('display_name');
    return isUserAuthenticated ? JSON.parse(isUserAuthenticated).display_name : '';
  }
  clearSession(): void {
    sessionStorage.clear();
  }

  setRedirectUrlAfterLogin(route: string): void {
    this.redirectUrlAfterLogin.next(route);
  }
}
