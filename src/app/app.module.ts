import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RECAPTCHA_NONCE,
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-services/auth-guard.service';
import { BookApptComponent } from './book-appt/book-appt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { FaqsComponent } from './faqs/faqs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LocationComponent } from './location/location.component';
import { MainComponent } from './main/main.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopoverComponent } from './popover/popover.component';
import { QuoteComponent } from './quote/quote.component';
import { ServiceComponent } from './service/service.component';
import { environment } from './../environments/environment.prod';

const appRoutes: Routes = [
  { path: 'admin/login', component: AdminLoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'services/:service', component: DetailComponent },
  {
    path: 'conditions-treated/:condition',
    component: DetailComponent,
  },
  { path: 'about-us/meet-the-team', component: AboutComponent },
  { path: 'about-us/philosophy', component: DetailComponent },
  {
    path: 'new-patient-center/:patient-info',
    component: DetailComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    MainComponent,
    ServiceComponent,
    HeaderComponent,
    FooterComponent,
    PopoverComponent,
    LocationComponent,
    AdminLoginComponent,
    HomeComponent,
    DetailComponent,
    AboutComponent,
    FaqsComponent,
    MobileMenuComponent,
    ContactComponent,
    BookApptComponent,
    EscapeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatProgressSpinnerModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha_key,
      } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_NONCE,
      useValue: environment.recaptcha_nonce,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
