import { Component } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-post-a-new-job',
  templateUrl: './post-a-new-job.component.html',
  styleUrls: ['./post-a-new-job.component.css']
})
export class PostANewJobComponent {
  categories = [
    { value: 0, name: 'Software Development' },
    { value: 1, name: 'Design' },
    { value: 2, name: 'Marketing' },
    { value: 3, name: 'Sales' },
    { value: 4, name: 'Finance' },
    { value: 5, name: 'Human Resources' },
    { value: 6, name: 'Customer Service' },
    { value: 7, name: 'Education' },
    { value: 8, name: 'Healthcare' },
    { value: 9, name: 'Engineering' },
    { value: 10, name: 'Legal' },
    { value: 11, name: 'Manufacturing' },
    { value: 12, name: 'Real Estate' },
    { value: 13, name: 'Science' },
    { value: 14, name: 'Transportation' },
    { value: 15, name: 'IT Support' },
    { value: 16, name: 'Construction' },
    { value: 17, name: 'Hospitality' },
    { value: 18, name: 'Agriculture' },
    { value: 19, name: 'Arts and Entertainment' },
    { value: 20, name: 'Telecommunications' },
    { value: 21, name: 'Public Relations' },
    { value: 22, name: 'Logistics' },
    { value: 23, name: 'Administration' },
    { value: 24, name: 'Research and Development' }
  ];

  locations = [
    { value: 'Ariana', name: 'Ariana' },
    { value: 'Beja', name: 'Beja' },
    { value: 'BenArous', name: 'Ben Arous' },
    { value: 'Bizerte', name: 'Bizerte' },
    { value: 'Gabes', name: 'Gabes' },
    { value: 'Gafsa', name: 'Gafsa' },
    { value: 'Jendouba', name: 'Jendouba' },
    { value: 'Kairouan', name: 'Kairouan' },
    { value: 'Kasserine', name: 'Kasserine' },
    { value: 'Kebili', name: 'Kebili' },
    { value: 'Kef', name: 'Kef' },
    { value: 'Mahdia', name: 'Mahdia' },
    { value: 'Manouba', name: 'Manouba' },
    { value: 'Medenine', name: 'Medenine' },
    { value: 'Monastir', name: 'Monastir' },
    { value: 'Nabeul', name: 'Nabeul' },
    { value: 'Sfax', name: 'Sfax' },
    { value: 'SidiBouzid', name: 'Sidi Bouzid' },
    { value: 'Siliana', name: 'Siliana' },
    { value: 'Sousse', name: 'Sousse' },
    { value: 'Tataouine', name: 'Tataouine' },
    { value: 'Tozeur', name: 'Tozeur' },
    { value: 'Tunis', name: 'Tunis' },
    { value: 'Zaghouan', name: 'Zaghouan' }
  ];

  job = {
    jobTitle: '',
    jobDescription: '',
    requirements: '',
    salary: null,
    location: '',
    category: null,
    companyId: 6 // Example: Hardcoded company ID
  };

  constructor(private jobService: JobService) {}

  onSubmit(): void {
    if (this.job.jobTitle && this.job.jobDescription && this.job.requirements && this.job.salary && this.job.location && this.job.category) {
      this.jobService.createJob(this.job).subscribe({
        next: (response) => {
          alert('Job posted successfully!');
          this.job = {
            jobTitle: '',
            jobDescription: '',
            requirements: '',
            salary: null,
            location: '',
            category: null,
            companyId: 6
          };
        },
        error: (error) => {
          console.error('Error posting job:', error);
          alert('Failed to post the job. Please try again.');
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
