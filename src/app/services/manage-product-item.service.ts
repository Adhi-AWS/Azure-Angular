import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageProductItemService {
  private apiUrl: string = `${environment.apiUrl}latest/`;
  constructor(private http : HttpClient) { }

  getProductItem(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}dashUI/productitem?id=11`);
  }
  getProductAll( 
    cloud_provider: string,
    product_subcategory_id:any
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}dashUI/productitems?product_subcategory_id=${product_subcategory_id}&cloud_provider=${cloud_provider}`);
  }

  addEditProductItem(payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}dashUI/productitem`, payload);
  }
  
  deleteCategory(product_item_id: number, modified_by: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}dashUI/productitem?product_item_id=${product_item_id}&modified_by=${modified_by}`
    );
  }
}