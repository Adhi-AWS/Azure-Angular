import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private httpHeader = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) {}

  getAPI(path: string, requestObj?: any, config?: any): Observable<any> {
    let url = config?.externalURL ? path : `${environment.adminApiUrl}${path}`;
    if (Array.isArray(requestObj?.params)) {
      requestObj.params.forEach((urlParam: any) => {
        url += `/${urlParam}`;
      });
    }
    return this.http.get(url).pipe(
      map((data: any) => {
        if (data['responseMessage']['message'] === 'SUCCESS') {
          return data['responseData'];
        }
      }, catchError(this.handleError))
    );
  }

  postAPI(path: string, requestObj?: any, config?: any): Observable<any> {
    const url = config?.externalURL
      ? path
      : `${environment.adminApiUrl}${path}`;

    if (config?.headers) {
      this.httpHeader = new HttpHeaders(config?.headers);
    }

    return this.http
      .post<any>(url, requestObj, {
        headers: this.httpHeader,
        observe: 'response',
      })
      .pipe(
        map((data: any) => {
          if (data['body']['responseMessage']['message'] === 'SUCCESS') {
            return data['body']['responseData'];
          }
        }, catchError(this.handleError))
      );
  }

  putAPI(path: string, requestObj?: any, config?: any): Observable<any> {
    const url = config?.externalURL
      ? path
      : `${environment.adminApiUrl}${path}`;

    if (config?.headers) {
      this.httpHeader = new HttpHeaders(config?.headers);
    }

    return this.http
      .put<any>(url, requestObj, {
        headers: this.httpHeader,
        observe: 'response',
      })
      .pipe(
        map((data) => {
          if (data['body']['responseMessage']['message'] === 'SUCCESS') {
            return data['body']['responseData'];
          }
        }, catchError(this.handleError))
      );
  }

  uploadFile(path: string, formdata: any, config?: any) {
    let url = config?.externalURL ? path : `${environment.adminApiUrl}${path}`;
    return this.http.post<any>(url, formdata).pipe(
      map((data) => {
        if (data['responseMessage']['message'] === 'SUCCESS') {
          return data['responseData'];
        }
      }, catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }
}
