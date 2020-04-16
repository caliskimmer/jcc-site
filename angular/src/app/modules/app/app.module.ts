import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaV3Module,
} from 'ng-recaptcha';

import { AppComponent } from '@components/app/app.component';
import { BookApptComponent } from '@components/book-appt/book-appt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ContactComponent } from '@components/contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { HeaderModule } from '@modules/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from '@components/location/location.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appRouter } from '@components/app/app.router';
import { environment } from '@environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LocationComponent,
    ContactComponent,
    BookApptComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatProgressSpinnerModule,
    RecaptchaV3Module,
    HeaderModule,
    NgbModule,
    appRouter,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha_key,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
