import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  contactState = '';
  bookingState = '';
  renderer: Renderer2;

  constructor() { }

  toggleBookingForm() {
    this.bookingState = (this.bookingState === 'booking-form-off' || this.bookingState === '') ? 'booking-form-on' : 'booking-form-off';
    this.toggleScrollbar('booking');

    return this.bookingState;
  }

  toggleContactForm() {
    this.contactState = (this.contactState === 'contact-form-off' || this.contactState === '') ? 'contact-form-on' : 'contact-form-off';
    this.toggleScrollbar('contact');

    return this.contactState;
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
