import { Component, Renderer2, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailComponent } from '../job-detail/job-detail.component';
interface Job {
  title: string;
  company: string;
  location: string;
  salary: number;
  category: string;
}

interface Category {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css']
})
export class JobFilterComponent {

  constructor(private renderer: Renderer2, private el: ElementRef, private dialog: MatDialog) {}

  lastScrollTop: number = 0;


  jobCategories: Category[] = [
    { name: 'Software Development', selected: false },
    { name: 'Design', selected: false },
    { name: 'Marketing', selected: false },
    { name: 'Sales', selected: false },
    { name: 'Human Resources', selected: false },
    { name: 'Finance', selected: false },
    { name: 'Operations', selected: false },
    { name: 'Customer Support', selected: false }
  ];

  locations = ['New York', 'San Francisco', 'Remote', 'Los Angeles'];
  selectedLocation: string = '';
  minSalary: number = 30000; // Minimum starting point for salary
  maxSalary: number = 150000; // Default max range
  
  jobs: Job[] = [
    { title: 'Frontend Developer', company: 'Tech Co', location: 'New York', salary: 60000, category: 'Software Development' },
    { title: 'Product Designer', company: 'Creative Inc', location: 'San Francisco', salary: 75000, category: 'Design' },
    { title: 'Digital Marketer', company: 'Market Now', location: 'Remote', salary: 50000, category: 'Marketing' },
    { title: 'Sales Executive', company: 'SellWell', location: 'Los Angeles', salary: 70000, category: 'Sales' },
    { title: 'HR Specialist', company: 'PeopleFirst', location: 'Remote', salary: 55000, category: 'Human Resources' },
    { title: 'Financial Analyst', company: 'FinCorp', location: 'New York', salary: 90000, category: 'Finance' },
    { title: 'Operations Manager', company: 'OpsPros', location: 'San Francisco', salary: 85000, category: 'Operations' },
    { title: 'Customer Support Rep', company: 'HelpDesk', location: 'Los Angeles', salary: 45000, category: 'Customer Support' }
  ];

  filteredJobs: Job[] = [...this.jobs];

  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesCategory = this.jobCategories.some(category => category.selected && job.category === category.name);
      const matchesLocation = this.selectedLocation ? job.location === this.selectedLocation : true;
      const matchesSalary = job.salary >= this.minSalary && job.salary <= this.maxSalary;
      return (matchesCategory || !this.jobCategories.some(c => c.selected)) && matchesLocation && matchesSalary;
    });
  }



  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyTopElement = this.el.nativeElement.querySelector('.sticky-top');
    const currentScrollTop = window.pageYOffset;

    if (currentScrollTop > this.lastScrollTop) {
      // Scrolling down
      this.renderer.setStyle(stickyTopElement, 'top', '-100px'); // Move navbar up out of view
    } else {
      // Scrolling up
      this.renderer.setStyle(stickyTopElement, 'top', '0'); // Move navbar down into view
    }

    // Update the last scroll position
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }

  openJobDetailModal(): void {
    this.dialog.open(JobDetailComponent, {
      width: '700px',  // Adjust the width as needed
      disableClose: false // Ensure this is set to allow closing on outside clicks

    });
  }

}
