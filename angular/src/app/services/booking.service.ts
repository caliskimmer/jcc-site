import { Injectable, Renderer2 } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '@environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  contactState = 'contact-form-off';
  bookingState = 'booking-form-off';
  emitChangeSource = new Subject<any>();
  changeEmitted = this.emitChangeSource.asObservable();
  renderer: Renderer2;

  constructor(private httpClient: HttpClient) {}

  toggleBookingForm() {
    this.bookingState =
      this.bookingState === 'booking-form-off' ||
      this.bookingState === ''
        ? 'booking-form-on'
        : 'booking-form-off';
    this.toggleScrollbar('booking');
    this.emitChangeSource.next(this.bookingState);

    return this.bookingState;
  }

  toggleContactForm() {
    this.contactState =
      this.contactState === 'contact-form-off'
        ? 'contact-form-on'
        : 'contact-form-off';
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

  sendForm(type: string, body) {
    if (type === 'contact') {
      return this.httpClient.post(
        `https://${environment.api}/api/contact`,
        body,
      );
    } else if (type === 'booking') {
      return this.httpClient.post(
        `https://${environment.api}/api/booking`,
        body,
      );
    }
  }
}
