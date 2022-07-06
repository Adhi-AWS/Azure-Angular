import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) { }

  getProductCategory(category_id: string, cloud_provider: string): Observable<any> {
      return this.http.get<any>(
        `${this.apiUrl}dashUI/subcategory?product_category_id=${category_id}&cloud_provider=${cloud_provider}`
      );
    }

  getProductSubcategory(subCategory_id: string, cloud_provider: string): Observable<any> {
      return this.http.get<any>(
        `${this.apiUrl}dashUI/productitems?product_subcategory_id=${subCategory_id}&cloud_provider=${cloud_provider}`
      );
    }
  getConfigData(id:string){
    return this.http.get<any>(
      `${this.apiUrl}dashUI/productitem?id=${id}`
    );
  }
  createTask(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}orchestrator/task`, payload);
  }

}
