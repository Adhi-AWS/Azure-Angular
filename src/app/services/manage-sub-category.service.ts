import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageSubCategoryService {
  private apiUrl: string = `${environment.apiUrl}latest/`;
  constructor(private http:HttpClient) { }
  getSubCategory( 
    cloud_provider: string,
    product_subcategory_id: string,
    page_no: number = 1,
    per_page: number = 10
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}dashUI/subcategory?product_category_id=${product_subcategory_id}&cloud_provider=${cloud_provider}&page_no=${page_no}&per_page=${per_page}`);
  }

  addEditSubCategory(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/subcategory`, payload);
  }

  deleteSubCategory(product_subcategory_id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/subcategory?product_subcategory_id=${product_subcategory_id}&modified_by=${modified_by}`
    );
  }
}
