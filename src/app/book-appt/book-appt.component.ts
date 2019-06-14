import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../booking-service/booking-service.service';

@Component({
  selector: 'app-book-appt',
  templateUrl: './book-appt.component.html',
  styleUrls: ['./book-appt.component.scss']
})
export class BookApptComponent implements OnInit {
  faCalendar: any = faCalendar;
  @Output() modalChanged: EventEmitter<any> = new EventEmitter();

  constructor(private bookingService: BookingService, private renderer: Renderer2) {}

  ngOnInit() {
  }

  close() {
    const bookingState = this.bookingService.toggleBookingForm();
    this.modalChanged.emit(bookingState);
  }
}
