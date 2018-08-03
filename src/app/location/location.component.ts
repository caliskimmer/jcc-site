import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';

import * as L from 'mapbox.js';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit {
  @ViewChild('map') map: ElementRef;
  private const LONGITUDE: number = 33.955113;
  private const LATITUDE: number = -118.396457;
  private const ZOOM: number = 15;

  constructor() { }

  ngAfterViewInit() {
    L.mapbox.accessToken = environment.mapbox.access_token;
    let jccMap:any = L.mapbox.map(this.map.nativeElement, 'mapbox.streets').setView([this.LONGITUDE, this.LATITUDE], this.ZOOM);
    L.marker([this.LONGITUDE, this.LATITUDE]).addTo(jccMap);
  }

}
