import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GoogleAuthService } from '../services/google-auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockGoogleAuthService = {
    initializeGoogleSignIn: jasmine.createSpy('initializeGoogleSignIn').and.callFake((callback: any) => {
      // Mock Google sign-in initialization
      callback({ credential: 'mock-google-token' });
    }),
    sendGoogleTokenToBackend: jasmine.createSpy('sendGoogleTokenToBackend').and.returnValue(of({ token: 'mock-jwt-token' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatSnackBarModule
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: { returnUrl: '/test-return-url' } // Mocked queryParams
            }
          }
        },
        {
          provide: GoogleAuthService,
          useValue: mockGoogleAuthService // Use mocked GoogleAuthService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set returnUrl from queryParams', () => {
    expect(component.returnUrl).toBe('/test-return-url');
  });

  it('should initialize Google sign-in on ngOnInit', () => {
    expect(mockGoogleAuthService.initializeGoogleSignIn).toHaveBeenCalled();
  });
});
