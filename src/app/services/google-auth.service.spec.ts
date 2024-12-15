import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoogleAuthService } from './google-auth.service';

describe('GoogleAuthService', () => {
  let service: GoogleAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add this module to provide HttpClient
    });
    service = TestBed.inject(GoogleAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
