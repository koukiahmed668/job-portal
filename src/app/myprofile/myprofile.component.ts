import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  company : any={}
  updatedCompany: any = {
    Name: '',
    Email: '',
    Phone: '',
    WebsiteURL: '',
    Location: '',
    PasswordHash: ''
  };

  constructor(public companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanyById();
  }

  // Fetch the company data using the company ID from the token
  getCompanyById(): void {
    const token = localStorage.getItem('loginToken');
    if (token) {
      const decodedToken: any = this.decodeToken(token); // Decode the token to get the company ID
      const companyId = decodedToken?.unique_name;

      if (companyId) {
        this.companyService.getCompanyById(companyId).subscribe(
          (data) => {
            console.log('Company Data:', data);
            this.company = data; // Store the company data
          },
          (error) => {
            console.error('Error fetching company data:', error);
          }
        );
      } else {
        console.error('No company ID found in token.');
      }
    } else {
      console.error('No token found in local storage.');
    }
  }

  // Update the company data
  onSubmit(): void {
    const token = localStorage.getItem('loginToken');
    if (token) {
      const decodedToken: any = this.decodeToken(token); // Decode the token to get the company ID
      const companyId = decodedToken?.unique_name;

      if (companyId) {
        this.companyService.updateCompany(companyId, this.updatedCompany).subscribe(
          (response) => {
            console.log('Company updated successfully:', response);
            // Optionally, you can show a success message or redirect to another page
          },
          (error) => {
            console.error('Error updating company data:', error);
          }
        );
      } else {
        console.error('No company ID found in token.');
      }
    } else {
      console.error('No token found in local storage.');
    }
  }

  // Decode the token to get the payload
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
