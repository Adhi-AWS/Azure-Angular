import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManageQueueService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getQueueProviderMappings(
    page_no: number = 1,
    per_page: number = 5
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/queues_provider_mappings?page_no=${page_no}&per_page=${per_page}`
    );
  }

  addUpdateQueue(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/queues`, payload);
  }

  deleteQueue(queue_id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/queues?queue_id=${queue_id}`
    );
  }

  mapQueueProviderMappings(payload: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}dashUI/queues_provider_mappings`,
      payload
    );
  }

  getAdapters(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/adapter?page_no=${1}&per_page=${100}`
    );
  }
}
