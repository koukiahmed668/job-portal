import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent], // Export NavbarComponent to use it in other modules
  imports: [CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
