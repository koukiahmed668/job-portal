import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms'; // To handle ngModel bindings

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpTestingController: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding HTTP requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate states list', () => {
    expect(component.states.length).toBeGreaterThan(0);
    expect(component.states).toContain('Tunis');
  });

  it('should submit form data and navigate to login on success', () => {
    // Arrange: Populate the form data
    component.name = 'Test Company';
    component.email = 'test@example.com';
    component.phone = '123456789';
    component.websiteURL = 'https://example.com';
    component.state = 'Tunis';
    component.password = 'password123';
    component.confirmPassword = 'password123';

    // Act: Trigger the signup
    component.signup();

    const req = httpTestingController.expectOne('http://localhost:5164/api/company/create');
    expect(req.request.method).toBe('POST');

    // Assert: Check the request payload
    expect(req.request.body).toEqual({
      name: 'Test Company',
      email: 'test@example.com',
      phone: '123456789',
      websiteURL: 'https://example.com',
      state: 'Tunis',
      passwordHash: 'password123'
    });

    // Simulate a successful response
    req.flush({ message: 'Company created successfully' });

    // Assert: Check that navigation occurred
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should log an error on failed signup', () => {
    spyOn(console, 'error'); // Spy on console.error

    // Arrange: Populate the form data
    component.name = 'Test Company';
    component.email = 'test@example.com';
    component.phone = '123456789';
    component.websiteURL = 'https://example.com';
    component.state = 'Tunis';
    component.password = 'password123';
    component.confirmPassword = 'password123';

    // Act: Trigger the signup
    component.signup();

    const req = httpTestingController.expectOne('http://localhost:5164/api/company/create');
    expect(req.request.method).toBe('POST');

    // Simulate an error response
    req.flush({ message: 'Error creating company' }, { status: 400, statusText: 'Bad Request' });

    // Assert: Check that the error was logged
    expect(console.error).toHaveBeenCalledWith('Error creating company', jasmine.any(Object));
    expect(mockRouter.navigate).not.toHaveBeenCalled(); // Ensure no navigation occurred
  });
});
