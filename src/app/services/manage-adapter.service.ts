import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManageAdapterService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getAdapters(page_no: number, per_page: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/adapter?page_no=${page_no}&per_page=${per_page}`
    );
  }

  addAdapter(payload: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}dashUI/queues_provider_mappings`,
      payload
    );
  }

  deleteAdapter(resource_adapter_mapping_id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/queues_provider_mappings?resource_adapter_mapping_id=${resource_adapter_mapping_id}`
    );
  }
}
