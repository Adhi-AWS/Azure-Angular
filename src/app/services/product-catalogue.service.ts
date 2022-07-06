import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCatalogueDetails } from '../models/product-catalogue.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCatalogueService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getProductCatalogueList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}dashUI/workbench`);
  }

  getProductCatalogueDetails(
    cloud_provider: string,
    task_name: string
  ): Observable<ProductCatalogueDetails> {
    return this.http.get<ProductCatalogueDetails>(
      `${this.apiUrl}dashUI/workbench?cloud_provider=${cloud_provider}&task_name=${task_name}`
    );
  }

  addOrUpdateTestPayload(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/workbench`, payload);
  }
}
