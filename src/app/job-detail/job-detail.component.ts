import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {

  constructor(public dialogRef: MatDialogRef<JobDetailComponent>) {}


  job = {
    jobTitle: 'Frontend Developer',
    company: { name: 'Tech Co' },
    location: 'New York',
    category: 'Software Development',
    postedDate: new Date('2024-10-31'),
    salary: 70000,
    jobDescription: 'We are looking for a skilled Frontend Developer to join our team.',
    requirements: 'Experience with Angular, TypeScript, and web development best practices.'
  };  onResumeUpload(event: any) {
    const file = event.target.files[0];
    // Handle file upload logic here
  }
  // Method to submit the application
  submitApplication() {
    // Handle job application submission logic here
    alert("Application submitted successfully!");
  }

  close() {
    this.dialogRef.close();
  }
}
