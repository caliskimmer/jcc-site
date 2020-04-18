import { Component, OnInit, Renderer2 } from '@angular/core';

import { BookingService } from '@services/booking.service';
import { animations } from './main.animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: animations,
})
export class MainComponent {
  contactState = 'contact-form-off';
  contactClosed = true;
  main: MainComponent = this;

  constructor(
    private renderer: Renderer2,
    private bookingService: BookingService,
  ) {
    if (!this.bookingService.renderer) {
      this.bookingService.renderer = renderer;
    }
  }

  toggleBookingForm() {
    this.bookingService.toggleBookingForm();
  }

  toggleContactForm() {
    this.contactState = this.bookingService.toggleContactForm();
  }

  animFinished() {
    this.contactClosed = this.contactState === 'contact-form-off';
  }
}
