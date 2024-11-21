import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements AfterViewInit {
  
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Initialize Testimonial Owl Carousel
    try {
      $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        autoplayTimeout: 3000,
        center: true,
        margin: 24,
        dots: false,
        loop: true,
        nav: false,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          }
        }
      });
      console.log("Testimonial Owl Carousel initialized successfully.");
    } catch (error) {
      console.error("Error initializing Testimonial Owl Carousel:", error);
    }
  }
}
