import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'landing-page',component:LandingPageComponent},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) , canActivate: [authGuard]},
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'postnewjob', loadChildren: () => import('./post-a-new-job/post-a-new-job.module').then(m => m.PostANewJobModule) },
  { path: 'interviewschedule', loadChildren: () => import('./interview-schedule/interview-schedule.module').then(m => m.InterviewScheduleModule) },
  { path: 'reviewapplicants', loadChildren: () => import('./review-applicants/review-applicants.module').then(m => m.ReviewApplicantsModule) },
  { path: 'job-filter', loadChildren: () => import('./job-filter/job-filter.module').then(m => m.JobFilterModule) },
  { path: 'job-detail', loadChildren: () => import('./job-detail/job-detail.module').then(m => m.JobDetailModule) },
  { path: 'myprofil', loadChildren: () => import('./myprofile/myprofile.module').then(m => m.MyprofileModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
