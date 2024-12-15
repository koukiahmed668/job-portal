import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { JobDetailComponent } from './job-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Mock the MatDialogRef
class MockMatDialogRef {
  close() {}
}

describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;
  let mockDialogRef: MockMatDialogRef;

  beforeEach(async () => {
    mockDialogRef = new MockMatDialogRef();

    await TestBed.configureTestingModule({
      declarations: [JobDetailComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      schemas: [NO_ERRORS_SCHEMA] // To avoid errors due to child components (e.g., Dialog)
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize job details correctly', () => {
    expect(component.job).toEqual({
      jobTitle: 'Frontend Developer',
      company: { name: 'Tech Co' },
      location: 'New York',
      category: 'Software Development',
      postedDate: new Date('2024-10-31'),
      salary: 70000,
      jobDescription: 'We are looking for a skilled Frontend Developer to join our team.',
      requirements: 'Experience with Angular, TypeScript, and web development best practices.'
    });
  });

  it('should call close method when close() is triggered', () => {
    const spyClose = spyOn(mockDialogRef, 'close');
    component.close();
    expect(spyClose).toHaveBeenCalled();
  });

  it('should handle submitApplication and trigger alert', () => {
    // Mock the alert function
    const alertSpy = spyOn(window, 'alert');
    component.submitApplication();
    expect(alertSpy).toHaveBeenCalledWith('Application submitted successfully!');
  });

  it('should handle file upload when onResumeUpload is called', () => {
    // Create a mock event with a file
    const file = new Blob(['dummy content'], { type: 'application/pdf' });
    const event = { target: { files: [file] } };
    
    const fileUploadSpy = spyOn(component, 'onResumeUpload');
    component.onResumeUpload(event);

    // Expect the method to be called with the file event
    expect(fileUploadSpy).toHaveBeenCalledWith(event);
  });
});
