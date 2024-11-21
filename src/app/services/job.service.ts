import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5164/api/Job'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  createJob(job: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, job);
  }

  getJobsByCompanyId(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-company/${companyId}`);
  }
}
