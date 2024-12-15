import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyService } from '../services/company.service';
import { JobService } from '../services/job.service';
import { of } from 'rxjs';

// Mock Services
class MockCompanyService {
  getCompanyById() {
    return of({ id: '1', name: 'Company A' });
  }
}

class MockJobService {
  getJobsByCompanyId() {
    return of([{ id: '1', title: 'Job A' }, { id: '2', title: 'Job B' }]);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: CompanyService, useClass: MockCompanyService },
        { provide: JobService, useClass: MockJobService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load company data correctly', fakeAsync(() => {
    const companyService = TestBed.inject(CompanyService);
    spyOn(companyService, 'getCompanyById').and.callThrough();

    component.getCompanyById();
    tick(); // simulate async passage of time
    fixture.detectChanges();

    expect(companyService.getCompanyById).toHaveBeenCalled();
    expect(component.company.name).toBe('Company A');
  }));

  it('should load jobs data correctly', fakeAsync(() => {
    const jobService = TestBed.inject(JobService);
    spyOn(jobService, 'getJobsByCompanyId').and.callThrough();
  
    component.getJobsByCompanyId();  // Make sure this is being triggered properly
    tick(); // simulate async passage of time
    fixture.detectChanges();
  
    expect(jobService.getJobsByCompanyId).toHaveBeenCalled();
    expect(component.jobs.length).toBe(2);
    expect(component.jobs[0].title).toBe('Job A');
  }));
  
  // Add any other necessary tests, such as mocking chart creation if needed
});
