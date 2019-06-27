import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {RECAPTCHA_SETTINGS, RECAPTCHA_NONCE, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { MainComponent } from './main/main.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import { AddBackgroundOnScrollDirective } from './directives/add-background-on-scroll.directive';
import { FooterComponent } from './footer/footer.component';
import { PopoverComponent } from './popover/popover.component';
import { LocationComponent } from './location/location.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DetailComponent } from './detail/detail.component';
import { AboutComponent } from './about/about.component';
import { FaqsComponent } from './faqs/faqs.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { ContactComponent } from './contact/contact.component';
import { BookApptComponent } from './book-appt/book-appt.component';
import { AuthGuardService } from './auth-services/auth-guard.service';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import {environment} from '../environments/environment.prod';

const appRoutes: Routes = [
    { path: 'admin/login', component: AdminLoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'faqs', component: FaqsComponent },
    { path: 'services/:service', component: DetailComponent },
    { path: 'conditions-treated/:condition', component: DetailComponent },
    { path: 'about-us/meet-the-team', component: AboutComponent},
    { path: 'about-us/philosophy', component: DetailComponent},
    { path: 'new-patient-center/:patient-info', component: DetailComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        QuoteComponent,
        MainComponent,
        ServiceComponent,
        HeaderComponent,
        AddBackgroundOnScrollDirective,
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
        EscapeHtmlPipe
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
        NgbModule.forRoot(),
        RouterModule.forRoot(
            appRoutes
        ),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('token')
            }
        })
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
                siteKey: environment.recaptcha_key,
            } as RecaptchaSettings
        },
        {
            provide: RECAPTCHA_NONCE,
            useValue: environment.recaptcha_nonce
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
