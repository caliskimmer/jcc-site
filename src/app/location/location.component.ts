import { Component, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { BookingService } from '../booking-service/booking-service.service';

import { animations } from './location.animations';
import * as L from 'mapbox.js';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  animations: animations
})
export class LocationComponent implements AfterViewInit {
  contactState = '';
  bookingState = '';
  @ViewChild('map') map: ElementRef;

  constructor(private bookingService: BookingService) { }

  ngAfterViewInit() {
    const LONGITUDE = 33.955113;
    const LATITUDE = -118.396457;
    const ZOOM = 15;
    L.mapbox.accessToken = 'temp'; // environment.mapbox.access_token;
    const jccMap: any = L.mapbox.map(this.map.nativeElement, 'mapbox.streets').setView([LONGITUDE, LATITUDE], ZOOM);
    L.marker([LONGITUDE, LATITUDE]).addTo(jccMap);
  }

  toggleBookingForm() {
    this.bookingState = this.bookingService.toggleBookingForm();
  }

  toggleContactForm() {
    this.contactState = this.bookingService.toggleContactForm();
  }
}
