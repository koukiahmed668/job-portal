import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostANewJobComponent } from './post-a-new-job.component';

const routes: Routes = [{ path: '', component: PostANewJobComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostANewJobRoutingModule { }
