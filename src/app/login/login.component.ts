import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleAuthService } from '../services/google-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed typo
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  returnUrl: string = '/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private googleAuthService: GoogleAuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.googleAuthService.initializeGoogleSignIn((response: any) => this.onGoogleSignIn(response));

  }

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:5164/api/company/login', loginData)
      .subscribe(
        response => {
          // Assuming the response contains a token in response.Token
          localStorage.setItem('loginToken', response.token);
          console.log('Login successful, token saved');

          // Navigate back to returnUrl after successful login
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          // Handle login error
          console.error('Login failed', error);

          this.snackBar.open('Login failed: Incorrect email or password.', 'Close', {
            duration: 3000, // Adjust the duration as needed
            horizontalPosition: 'center',
            verticalPosition  : 'top' ,
            panelClass: ['snackbar-error'], // Add custom CSS class
          });
        }
      );
  }


  onGoogleSignIn(response: any): void {
    const googleToken = response.credential;
    console.log('Google Token:', googleToken);
  
    // Send the token to your backend for verification
    this.googleAuthService.sendGoogleTokenToBackend(googleToken).subscribe({
      next: (result: any) => { // Use 'any' or you can assert the type
        console.log('JWT from backend:', result);
  
        // Use a type assertion to tell TypeScript that result has a 'token' property
        const jwtToken = (result as { token: string }).token;
  
        // Store the JWT token in local storage
        localStorage.setItem('loginToken', jwtToken);
        console.log('Google login successful, token saved');
  
        // Navigate to returnUrl after successful login
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        console.error('External login failed:', err);
      }
    });
  }
  
}
