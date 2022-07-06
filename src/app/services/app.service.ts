import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  cloud_providers_list = new BehaviorSubject([]);
  productCategoryList = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getAdapters(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/adapter?page_no=${1}&per_page=${10000}`
    );
  }
  getProducts(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}dashUI/products`
    );
  }
  setCloudProviderList(data: any): void {
    this.cloud_providers_list.next(data);
  }
  setproductCategoryList(data: any): void {
    this.productCategoryList.next(data);
  }
}
