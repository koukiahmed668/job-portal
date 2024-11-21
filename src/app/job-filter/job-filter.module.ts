import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobFilterRoutingModule } from './job-filter-routing.module';
import { JobFilterComponent } from './job-filter.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JobFilterComponent
  ],
  imports: [
    CommonModule,
    JobFilterRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class JobFilterModule { }
