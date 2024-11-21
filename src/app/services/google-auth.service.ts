import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = '834394576559-u7scs4qmq2g965t6j5ejls1090asm4hk.apps.googleusercontent.com';

  constructor(private http: HttpClient) {}

  initializeGoogleSignIn(callback: (response: any) => void): void {
    (window as any).google.accounts.id.initialize({
      client_id: this.clientId,
      callback: callback,
    });
    (window as any).google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      { theme: 'outline', size: 'large' }
    );
  }

  sendGoogleTokenToBackend(token: string) {
    return this.http.post('http://localhost:5277/api/Auth/externallogin', {
      provider: 'google',
      token: token
    });
  }
}
