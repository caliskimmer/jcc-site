import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { BookingService } from '../booking-service/booking-service.service';
import { Observable } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-appt',
  templateUrl: './book-appt.component.html',
  styleUrls: ['./book-appt.component.scss'],
})
export class BookApptComponent implements OnChanges {
  @Output() modalChanged: EventEmitter<any> = new EventEmitter();
  @Input() isClosed: boolean;
  faCalendar: any = faCalendar;
  errors: string[] = [];
  sentForm = false;
  isSubmitted = false;
  bookingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    patientType: ['New Patient', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, this._phoneValidator]],
    preferredDate: ['', [Validators.required]],
    preferredTime: ['Prefer Morning', [Validators.required]],
    message: ['', Validators.required],
  });

  constructor(
    private recaptchaService: ReCaptchaV3Service,
    private bookingService: BookingService,
    private fb: FormBuilder,
  ) {}

  ngOnChanges() {
    if (this.isClosed) {
      this.sentForm = false;
    }
  }

  close() {
    const bookingState = this.bookingService.toggleBookingForm();
    this.modalChanged.emit(bookingState);
    this.bookingForm.reset();
  }

  submitForm() {
    let formBody = {
      firstName: this.bookingForm.get('firstName').value.trim(),
      lastName: this.bookingForm.get('lastName').value.trim(),
      patientType: this.bookingForm.get('patientType').value,
      email: this.bookingForm.get('email').value,
      phone: this.bookingForm.get('phoneNumber').value,
      preferredTime: this.bookingForm.get('preferredTime').value,
      message: this.bookingForm.get('message').value,
    };

    // parse date
    let date = this.bookingForm.get('preferredDate').value;
    formBody[
      'date'
    ] = `${date['month']}-${date['day']}-${date['year']}`;

    this._verifyCaptcha()
      .pipe(
        switchMap((token) => {
          formBody['recaptchaToken'] = token;
          return this.bookingService.sendForm('contact', formBody);
        }),
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response['errors']) {
            this.errors = response['errors'];
            this.isSubmitted = false;
            return;
          }

          this.sentForm = true;
          this.isSubmitted = false;
          this.errors = [];
        },
        (err) => {
          throw err;
        },
      );

    this.isSubmitted = true;
  }

  private _phoneValidator(control: FormControl) {
    const invalid = { invalidPhone: true };

    if (!control.value) {
      return invalid;
    }

    const parsedNumber = parsePhoneNumberFromString(
      control.value.toString(),
      'US',
    );
    if (!parsedNumber) {
      return invalid;
    }

    return parsedNumber.isValid() ? null : invalid;
  }

  private _verifyCaptcha(): Observable<string> {
    return this.recaptchaService.execute('homepage');
  }
}
