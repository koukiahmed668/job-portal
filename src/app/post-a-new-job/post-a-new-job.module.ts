import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostANewJobRoutingModule } from './post-a-new-job-routing.module';
import { PostANewJobComponent } from './post-a-new-job.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // <-- Import ReactiveFormsModule


@NgModule({
  declarations: [
    PostANewJobComponent
  ],
  imports: [
    CommonModule,
    PostANewJobRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostANewJobModule { }
