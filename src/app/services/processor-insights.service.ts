import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProcessorInsightsService {
  private apiUrl: string = `${environment.apiUrl}latest/`;

  constructor(private http: HttpClient) {}

  getProcessorInsights(starttime: string, endtime: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}dashUI/processor_insights?starttime=${starttime}&endtime=${endtime}`
    );
  }
}
