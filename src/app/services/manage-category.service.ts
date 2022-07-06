import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageCategoryService {
  private apiUrl: string = `${environment.apiUrl}latest/`;
  constructor(private http:HttpClient) { }
  getCategory( 
    cloud_provider: string,
    page_no: number = 1,
    per_page: number = 10
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}dashUI/category?cloud_provider=${cloud_provider}&page_no=${page_no}&per_page=${per_page}`);
  }
  getCategoryAll( 
    cloud_provider: string
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}dashUI/category?cloud_provider=${cloud_provider}`);
  }
  addEditCategory(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/category`, payload);
  }

  deleteCategory(product_category_id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/category?product_category_id=${product_category_id}&modified_by=${modified_by}`
    );
  }
}
