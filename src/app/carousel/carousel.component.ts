import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    try {
      $('.header-carousel').owlCarousel({
        items: 1, // Number of items to display
        loop: true, // Infinite loop
        nav: false, // Show next/prev buttons
        dots: false, // Hide pagination dots
        autoplay: true, // Enable autoplay
        autoplayTimeout: 3000, // Autoplay interval
        smartSpeed: 1300, // Speed of the transition (in milliseconds)
        autoplayHoverPause: false // Pause on hover
      });
      console.log("Header Owl Carousel initialized successfully.");
    } catch (error) {
      console.error("Error initializing Header Owl Carousel:", error);
    }
  }
}
