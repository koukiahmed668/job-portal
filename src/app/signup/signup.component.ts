import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corrected to 'styleUrls'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  websiteURL: string = '';
  state: string = '';
  password: string = '';
  confirmPassword: string = '';

  states = [
    'Ariana', 'Beja', 'BenArous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan',
    'Kasserine', 'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul',
    'Sfax', 'SidiBouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];
  constructor(private http: HttpClient, private router: Router) {}

  signup() {
    const companyData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      websiteURL: this.websiteURL,
      state: this.state,
      passwordHash: this.password // Assuming you will hash this on the backend
    };

    this.http.post('http://localhost:5164/api/company/create', companyData)
      .subscribe(
        response => {
          // Handle success
          console.log('Company created', response);
          this.router.navigate(['/login']); // Optionally navigate after successful signup
        },
        error => {
          // Handle error
          console.error('Error creating company', error);
        }
      );
  }
}
