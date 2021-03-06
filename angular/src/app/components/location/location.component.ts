import * as L from 'mapbox.js';

import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { BookingService } from '@services/booking.service';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements AfterViewInit {
  @ViewChild('map') map: ElementRef;

  constructor(
    private renderer: Renderer2,
    private bookingService: BookingService,
  ) {
    if (!this.bookingService.renderer) {
      this.bookingService.renderer = renderer;
    }
  }

  ngAfterViewInit() {
    const LONGITUDE = 33.955113;
    const LATITUDE = -118.396457;
    const ZOOM = 15;
    L.mapbox.accessToken = environment.mapbox.access_token;
    const jccMap: any = L.mapbox
      .map(this.map.nativeElement, 'mapbox.streets')
      .setView([LONGITUDE, LATITUDE], ZOOM);
    L.marker([LONGITUDE, LATITUDE]).addTo(jccMap);
  }

  toggleBookingForm() {
    this.bookingService.toggleBookingForm();
  }
}
