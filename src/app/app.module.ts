import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { MainComponent } from './main/main.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import { AddBackgroundOnScrollDirective } from './directives/add-background-on-scroll.directive';
import { FooterComponent } from './footer/footer.component';
import { PopoverComponent } from './popover/popover.component';
import { LocationComponent } from './location/location.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services/:service', component: DetailComponent },
  { path: 'conditions-treated/:condition', component: DetailComponent },
  { path: 'about-us/meet-the-team', component: AboutComponent},
  { path: 'about-us/philosophy', component: DetailComponent},
  { path: 'new-patient-center/:info', component: DetailComponent}
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
    AdminBlogComponent,
    AdminLoginComponent,
    HomeComponent,
    DetailComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
