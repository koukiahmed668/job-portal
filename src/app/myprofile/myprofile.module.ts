import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileRoutingModule } from './myprofile-routing.module';
import { MyprofileComponent } from './myprofile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyprofileComponent,
  ],
  imports: [
    CommonModule,
    MyprofileRoutingModule,
    FormsModule
  ]
})
export class MyprofileModule { }
