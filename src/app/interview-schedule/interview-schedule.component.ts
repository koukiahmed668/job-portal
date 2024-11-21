import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';

interface Interview {
  title: string;
  date: string;
  candidateName: string;
  position: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.component.html',
  styleUrls: ['./interview-schedule.component.css']
})
export class InterviewScheduleComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.openNewInterviewModal.bind(this),
    eventClick: this.viewInterviewDetails.bind(this),
  };

  calendarEvents: EventInput[] = [
    {
      title: 'Frontend Developer Interview',
      start: '2024-11-02',
      extendedProps: {
        candidateName: 'John Doe',
        position: 'Frontend Developer',
        status: 'Scheduled'
      }
    },
    {
      title: 'Backend Developer Interview',
      start: '2024-11-03',
      extendedProps: {
        candidateName: 'Jane Smith',
        position: 'Backend Developer',
        status: 'Scheduled'
      }
    }
  ];

  newInterview: Interview = { title: '', date: '', candidateName: '', position: '', status: 'Scheduled' };

  constructor() {
    this.calendarOptions.events = this.calendarEvents;
  }

  openNewInterviewModal(event: any) {
    this.newInterview.date = event.dateStr;
    const modal = new bootstrap.Modal(document.getElementById('addInterviewModal')!);
    modal.show();
  }

  addInterview() {
    const newEvent: EventInput = {
      title: `${this.newInterview.position} Interview`,
      start: this.newInterview.date,
      extendedProps: { 
        candidateName: this.newInterview.candidateName,
        position: this.newInterview.position,
        status: this.newInterview.status
      }
    };
    
    this.calendarEvents = [...this.calendarEvents, newEvent];
    this.calendarOptions.events = this.calendarEvents;
    this.newInterview = { title: '', date: '', candidateName: '', position: '', status: 'Scheduled' };
    const modal = bootstrap.Modal.getInstance(document.getElementById('addInterviewModal')!);
    modal?.hide();
  }

  viewInterviewDetails(event: any) {
    const { title, extendedProps } = event.event;
    alert(`Interview for ${title} with ${extendedProps.candidateName}`);
  }
}
