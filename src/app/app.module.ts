import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { MainComponent } from './main/main.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import { AddBackgroundOnScrollDirective } from './directives/add-background-on-scroll.directive';
import { FooterComponent } from './footer/footer.component';
import { PopoverComponent } from './popover/popover.component';
import { LocationComponent } from './location/location.component';

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
    LocationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
