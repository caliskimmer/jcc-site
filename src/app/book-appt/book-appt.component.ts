import { Component, Input, Output, EventEmitter, Renderer2, OnChanges } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../booking-service/booking-service.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

@Component({
    selector: 'app-book-appt',
    templateUrl: './book-appt.component.html',
    styleUrls: ['./book-appt.component.scss']
})
export class BookApptComponent implements OnChanges {
    @Output() modalChanged: EventEmitter<any> = new EventEmitter();
    @Input() isClosed: boolean;
    errors: string[] = [];
    faCalendar: any = faCalendar;
    sentForm = false;
    isSubmitted = false;
    bookingForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        patientType: ['New Patient', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, this.phoneValidator]],
        preferredDate: ['', [Validators.required]],
        preferredTime: ['Prefer Morning', [Validators.required]],
        message: ['', Validators.required],
        captcha: ['', Validators.required]
    });

    constructor(private bookingService: BookingService,
                private fb: FormBuilder,
                private renderer: Renderer2) {}

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
        formBody['date'] = `${date['month']}-${date['day']}-${date['year']}`;

        this.bookingService.sendForm('booking', formBody).subscribe((response: any) => {
            if (response.errors) {
                this.errors = response.errors;
                this.bookingForm.get('captcha').reset();
                this.isSubmitted = false;
                return;
            }

            this.sentForm = true;
            this.isSubmitted = false;
            this.errors = [];
        }), err => {
            throw err;
        };

        this.isSubmitted = true;
    }

    private phoneValidator(control: FormControl) {
        const invalid = {'invalidPhone': true};

        if (!control.value) {
            return invalid;
        }

        const parsedNumber = parsePhoneNumberFromString(control.value.toString(), 'US');
        if (!parsedNumber) {
            return invalid;
        }

        return parsedNumber.isValid() ? null : invalid;
    }
}
