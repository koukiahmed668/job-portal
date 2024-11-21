import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'] // Corrected from styleUrl to styleUrls
})
export class SpinnerComponent {
  @Input() loading: boolean = false; // Add an input property
}
