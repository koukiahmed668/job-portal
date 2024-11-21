import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewApplicantsRoutingModule } from './review-applicants-routing.module';
import { ReviewApplicantsComponent } from './review-applicants.component';


@NgModule({
  declarations: [
    ReviewApplicantsComponent
  ],
  imports: [
    CommonModule,
    ReviewApplicantsRoutingModule,
    FormsModule
  ]
})
export class ReviewApplicantsModule { }
