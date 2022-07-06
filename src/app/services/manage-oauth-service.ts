import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ManageOauthService {
    private apiUrl: string = `${environment.apiUrl}latest/`;

    constructor(private http: HttpClient) { }

    getOauthDetailsByPagination(
        page_no: number = 1,
        per_page: number = 5
    ): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}oauth/oauth?oauth_id=All&page_no=${page_no}&per_page=${per_page}`
        );
    }

    addUpdateOauth(app_payload: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}oauth/oauth`, app_payload);
    }

    deleteOauth(id: number, modified_by: string): Observable<any> {
        return this.http.delete<any>(
            `${this.apiUrl}oauth/oauth?oauth_id=${id}&modified_by=${modified_by}`
        );
    }
}
