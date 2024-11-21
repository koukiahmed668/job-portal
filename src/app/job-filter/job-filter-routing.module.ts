import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobFilterComponent } from './job-filter.component';

const routes: Routes = [{ path: '', component: JobFilterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobFilterRoutingModule { }
