import { Component, OnInit, Renderer2 } from '@angular/core';
import { animations } from './main.animations';
import { BookingService } from '../booking-service/booking-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: animations
})
export class MainComponent implements OnInit {
  contactState = '';
  bookingState = '';
  main: MainComponent = this;

  constructor(private renderer: Renderer2, private bookingService: BookingService) { 
    this.bookingService.renderer = renderer;
  }

  ngOnInit() {
  }

  toggleBookingForm() {
    this.bookingState = this.bookingService.toggleBookingForm();
  }

  toggleContactForm() {
    this.contactState = this.bookingService.toggleContactForm();
  }
}
