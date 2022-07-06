import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  apiReqCountSubject$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  setApiReqCount(value: number): void {
    this.apiReqCountSubject$.next(value);
  }

  getTransactionDetails(task_id: string, name: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}dashUI/details?task_id=${task_id}&name=${name}`
    );
  }

  getTransactionDetailsThroughPostRequest(
    filterPayload: any,
    page: number = 1,
    per_page: number = 5
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}dashUI/search?page=${page}&per_page=${per_page}`,
      filterPayload
    );
  }

  getStateDetails(task_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}dashUI/states?task_id=${task_id}`);
  }

  getResponseDetails(task_id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}orchestrator/response?task_id=${task_id}`
    );
  }

  getCostDetails(task_id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}infracost/infracost?task_id=${task_id}`
    );
  }

  retryTransaction(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}orchestrator/task`, payload);
  }

  rollbackTransaction(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}orchestrator/rollback`, payload);
  }
}
