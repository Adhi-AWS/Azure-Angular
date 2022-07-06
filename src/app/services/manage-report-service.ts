import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ManageReportService {
    private apiUrl: string = `${environment.apiUrl}latest/`;

    constructor(private http: HttpClient) { }

    getReportDetailsByPagination(
        page_no: number = 1,
        per_page: number = 5
    ): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}reports/report?report_id=All&page_no=${page_no}&per_page=${per_page}`
        );
    }

    addUpdateReport(app_payload: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}reports/report`, app_payload);
    }

    deleteReport(id: number, modified_by: string): Observable<any> {
        return this.http.delete<any>(
            `${this.apiUrl}reports/report?report_id=${id}&modified_by=${modified_by}`
        );
    }
}
