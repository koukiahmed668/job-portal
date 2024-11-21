import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:5164/api/company'; // Adjust the base URL to match your backend


  constructor(private httpClient: HttpClient) { }

  getCompanyById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  updateCompany(id: number, updatedCompany: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, updatedCompany); // Sends a PUT request to the API to update the company
  }
}
