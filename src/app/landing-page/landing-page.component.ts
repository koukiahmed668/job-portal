import { Component, OnInit, AfterViewInit, HostListener, Renderer2, ElementRef } from '@angular/core';

declare var $: any;
declare var WOW: any; // Declare WOW variable
declare var Waypoint: any; // Declare Waypoint variable

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  lastScrollTop: number = 0; // Track the last scroll position

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);
  }

  ngAfterViewInit(): void {
   
    // Initialize WOW.js
    const wow = new WOW({ live: false });
    wow.init();

    // Initialize Waypoints for animations
    try {
      new Waypoint({
        element: this.el.nativeElement.querySelector('.fadeIn'), // Target your element
        handler: (direction: 'up' | 'down') => {
          // Trigger animations or effects
          if (direction === 'down') {
            $(this.el.nativeElement.querySelector('.fadeIn')).addClass('animated fadeIn'); // Add class for animation
          }
        },
        offset: '75%' // Trigger when the element is 75% visible
      });
      console.log("Waypoint initialized successfully.");
    } catch (error) {
      console.error("Error initializing Waypoint:", error);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyTopElement = this.el.nativeElement.querySelector('.sticky-top');
    const currentScrollTop = window.pageYOffset;

    if (currentScrollTop > this.lastScrollTop) {
      // Scrolling down
      this.renderer.setStyle(stickyTopElement, 'top', '-100px'); // Move navbar up out of view
    } else {
      // Scrolling up
      this.renderer.setStyle(stickyTopElement, 'top', '0'); // Move navbar down into view
    }

    // Update the last scroll position
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }
}
