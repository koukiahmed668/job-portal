import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { PostANewJobComponent } from '../post-a-new-job/post-a-new-job.component';
import { InterviewScheduleComponent } from '../interview-schedule/interview-schedule.component';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { MyprofileComponent } from '../myprofile/myprofile.component';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-dahsboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @Input() loading: boolean = false; // Add an input property
  chart!: Chart;
  company: any = {};
  jobs:any={};
  constructor(
    public dialog: MatDialog,
    public companyService: CompanyService,
    private router: Router,
    private jobService: JobService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getCompanyById();
    this.createChart();
    this.createLineChart();
    this.getJobsByCompanyId();
  }

  getCompanyById(): void {
    const token = localStorage.getItem('loginToken');
    if (token) {
      const decodedToken: any = this.decodeToken(token); // Use manual decoding
      const companyId = decodedToken?.unique_name;

      if (companyId) {
        this.companyService.getCompanyById(companyId).subscribe(
          (data) => {
            console.log('Company Data:', data);
            this.company = data; // Store the company data
          },
          (error) => {
            console.error('Error fetching company data:', error);
          }
        );
      } else {
        console.error('No company ID found in token.');
      }
    } else {
      console.error('No token found in local storage.');
    }
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  openPostJobModal(): void {
    this.dialog.open(PostANewJobComponent, {
      width: '500px',
    });
  }

  openInterviewJobModal(): void {
    this.dialog.open(InterviewScheduleComponent, {
      width: '800px',
    });
  }

  openMyProfileModal(): void {
    this.dialog.open(MyprofileComponent), {
      width: '500px',
      height:'700px'
    };
    }

  createChart(): void {
    this.chart = new Chart('chartCanvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart(): void {
    this.chart = new Chart('lineChartCanvas', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Monthly Sales',
            data: [3, 10, 5, 12, 7, 14, 9],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales'
            }
          }
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('loginToken');
    this.router.navigate(['/landing-page']);
  }

  getJobsByCompanyId(): void{
    const token = localStorage.getItem('loginToken');
    if (token) {
      const decodedToken: any = this.decodeToken(token); // Use manual decoding
      const companyId = decodedToken?.unique_name;

      if (companyId) {
        this.jobService.getJobsByCompanyId(companyId).subscribe(
          (data) => {
            console.log('jobs:', data);
            this.jobs = data; // Store the company data
          },
          (error) => {
            console.error('Error fetching company data:', error);
          },
          () => {
            console.log('Company data fetched successfully.');
          }
        );
      } else {
        console.error('No company ID found in token.');
        }
      }
    }

}
