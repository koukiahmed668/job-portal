import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewApplicantsComponent } from './review-applicants.component';
const routes: Routes = [{ path: '', component: ReviewApplicantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewApplicantsRoutingModule { }
