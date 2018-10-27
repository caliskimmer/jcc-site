import { Component, OnInit, Renderer2 } from '@angular/core';
import { animations } from './main.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: animations
})
export class MainComponent implements OnInit {
  contactState: string = '';
  bookingState: string = '';
  main: MainComponent = this;
  router: any = Router;

  constructor(private renderer:Renderer2) { }

  ngOnInit() {
  }

  toggleBookingForm() {
    this.bookingState = (this.bookingState === 'booking-form-off' || this.bookingState === '') ? 'booking-form-on' : 'booking-form-off';
    this.toggleScrollbar('booking');
  }

  toggleContactForm() {
    this.contactState = (this.contactState === 'contact-form-off' || this.contactState === '') ? 'contact-form-on' : 'contact-form-off';
    this.toggleScrollbar('contact');
  }

  toggleScrollbar(form: string) {
    if (form === 'contact') {
      if (this.contactState === 'contact-form-off') {
        this.renderer.removeClass(document.body, 'hide-scrollbar');
      } else {
        this.renderer.addClass(document.body, 'hide-scrollbar');
      }

      return;
    }

    if (this.bookingState === 'booking-form-off') {
      this.renderer.removeClass(document.body, 'hide-scrollbar');
    } else {
      this.renderer.addClass(document.body, 'hide-scrollbar');
    }
  }
}
