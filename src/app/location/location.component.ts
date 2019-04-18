import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import * as L from 'mapbox.js';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit {
  @ViewChild('map') map: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    const LONGITUDE = 33.955113;
    const LATITUDE = -118.396457;
    const ZOOM = 15;
    L.mapbox.accessToken = 'temp'; // environment.mapbox.access_token;
    const jccMap: any = L.mapbox.map(this.map.nativeElement, 'mapbox.streets').setView([LONGITUDE, LATITUDE], ZOOM);
    L.marker([LONGITUDE, LATITUDE]).addTo(jccMap);
  }

}
