import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InterviewScheduleRoutingModule } from './interview-schedule-routing.module';
import { InterviewScheduleComponent } from './interview-schedule.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    InterviewScheduleComponent
  ],
  imports: [
    CommonModule,
    InterviewScheduleRoutingModule,
    FullCalendarModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,// Add this line to avoid Angular schema errors
  bootstrap: [InterviewScheduleComponent]


})
export class InterviewScheduleModule { }
