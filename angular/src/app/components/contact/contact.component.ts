import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { BookingService } from '../booking-service/booking-service.service';
import { MainComponent } from '../main/main.component';
import { Observable } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnChanges {
  @Input() main: MainComponent;
  @Input() isClosed: boolean;
  errors: string[] = [];
  sentForm = false;
  isSubmitted = false;

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, this.phoneValidator]],
    message: ['', Validators.required],
  });

  constructor(
    private recaptchaService: ReCaptchaV3Service,
    private fb: FormBuilder,
    private bookingService: BookingService,
  ) {}

  ngOnChanges() {
    if (this.isClosed) {
      this.sentForm = false;
    }
  }

  close() {
    this.main.toggleContactForm();
    this.contactForm.reset();
  }

  submitForm() {
    const formBody = {
      firstName: this.contactForm.get('firstName').value,
      lastName: this.contactForm.get('lastName').value,
      email: this.contactForm.get('email').value,
      phone: this.contactForm.get('phoneNumber').value,
      message: this.contactForm.get('message').value,
    };

    this._verifyCaptcha()
      .pipe(
        switchMap((token) => {
          formBody['recaptchaToken'] = token;
          return this.bookingService.sendForm('contact', formBody);
        }),
      )
      .subscribe(
        (response) => {
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

  private phoneValidator(control: FormControl) {
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
