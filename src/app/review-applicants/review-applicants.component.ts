import { Component } from '@angular/core';

interface Applicant {
  name: string;
  position: string;
  experience: number;
  status: 'approved' | 'pending' | 'rejected';
}

@Component({
  selector: 'app-review-applicants',
  templateUrl: './review-applicants.component.html',
  styleUrls: ['./review-applicants.component.css']
})
export class ReviewApplicantsComponent {
  searchTerm: string = '';
  applicants: Applicant[] = [
    { name: 'John Doe', position: 'Software Developer', experience: 5, status: 'pending' },
    { name: 'Jane Smith', position: 'UI/UX Designer', experience: 3, status: 'approved' },
    { name: 'Alice Johnson', position: 'Product Manager', experience: 7, status: 'rejected' },
    // Add more applicant data here
  ];
  filteredApplicants: Applicant[] = [...this.applicants];

  applyFilter() {
    this.filteredApplicants = this.applicants.filter(applicant =>
      applicant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getStatusClass(status: string) {
    return {
      'approved': 'badge approved',
      'pending': 'badge pending',
      'rejected': 'badge rejected',
    }[status];
  }

  viewDetails(applicant: Applicant) {
    alert(`Viewing details for ${applicant.name}`);
  }

  approveApplicant(applicant: Applicant) {
    applicant.status = 'approved';
    this.applyFilter();
  }

  rejectApplicant(applicant: Applicant) {
    applicant.status = 'rejected';
    this.applyFilter();
  }
}
