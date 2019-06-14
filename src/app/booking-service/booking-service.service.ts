import { Injectable, Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  contactState = '';
  bookingState = '';
  emitChangeSource = new Subject<any>();
  changeEmitted = this.emitChangeSource.asObservable();
  renderer: Renderer2;

  constructor(private httpClient: HttpClient) { }

  toggleBookingForm() {
    this.bookingState = (this.bookingState === 'booking-form-off' || this.bookingState === '') ? 'booking-form-on' : 'booking-form-off';
    this.toggleScrollbar('booking');
    this.emitChangeSource.next(this.bookingState);

    return this.bookingState;
  }

  toggleContactForm() {
    this.contactState = (this.contactState === 'contact-form-off' || this.contactState === '') ? 'contact-form-on' : 'contact-form-off';
    this.toggleScrollbar('contact');
    this.emitChangeSource.next(this.contactState);

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
          return this.httpClient.post('http://localhost:8080/api/contact', body);
      }
  }
}
